import matplotlib.pyplot as plt
import numpy as np
import pandas as pd 
import tensorflow as tf
from tensorflow.keras.preprocessing import image_dataset_from_directory
from  tf.keras.applications import MobileNetV3
tf.__version__

data_directory = "ml/seven_plastics/"

IMG_SIZE = (200, 200)
IMG_SHAPE = IMG_SIZE + (3,)

train_dataset, validation_dataset = image_dataset_from_directory(
  data_directory,
  validation_split=0.15,
  subset="both",
  seed=123,
  image_size=IMG_SIZE,
  batch_size=16)


class_names = train_dataset.class_names
print(class_names)
train_dataset = train_dataset.prefetch(buffer_size=tf.data.AUTOTUNE)

resize_and_rescale = tf.keras.Sequential([
  tf.keras.layers.Resizing(IMG_SIZE, IMG_SIZE),
  tf.keras.layers.Rescaling(1./255)
])

data_augmentation = tf.keras.Sequential([
  tf.keras.layers.experimental.preprocessing.RandomFlip('horizontal'),
  tf.keras.layers.experimental.preprocessing.RandomRotation(0.3),
  tf.keras.layers.experimental.preprocessing.RandomContrast(0.3),
  tf.keras.layers.experimental.preprocessing.RandomZoom(0.1),
])

mobile_net = tf.keras.applications.MobileNetV3(
    input_shape=IMG_SHAPE,
    alpha=1.0,
    minimalistic=False,
    include_top=False,
    weights='imagenet',
    classes=8,
    pooling=None,
    dropout_rate=0.2,
    classifier_activation='softmax',
    include_preprocessing=True
)

mobile_net.trainable = False


image_batch, label_batch = next(iter(train_dataset))
feature_batch = mobile_net(image_batch)
print(feature_batch.shape)

global_average_layer = tf.keras.layers.GlobalAveragePooling2D()
feature_batch_average = global_average_layer(feature_batch)


prediction_layer = tf.keras.layers.Dense(len(class_names), 
activation = "softmax"
)


inputs = tf.keras.Input(shape=IMG_SHAPE)
x = data_augmentation(inputs)
x = mobile_net(x, training=False)
x = global_average_layer(x)
x = tf.keras.layers.Dropout(0.2)(x)
outputs = prediction_layer(x)
model = tf.keras.Model(inputs, outputs)

model.compile(optimizer = tf.keras.optimizers.Adam(
                                                    # learning_rate = 0.01
                                                    ),
              loss=tf.keras.losses.SparseCategoricalCrossentropy(
            # from_logits =True
              ),
              metrics=['accuracy'])



model.summary()
epochs = 100

history = model.fit(train_dataset,
                    epochs= epochs,
                    validation_data=validation_dataset)


acc = history.history['accuracy']
val_acc = history.history['val_accuracy']

loss = history.history['loss']
val_loss = history.history['val_loss']

plt.figure(figsize=(8, 8))
plt.subplot(2, 1, 1)
plt.plot(acc, label='Training Accuracy')
plt.plot(val_acc, label='Validation Accuracy')
plt.legend(loc='lower right')
plt.ylabel('Accuracy')
plt.ylim([min(plt.ylim()),1])
plt.title('Training and Validation Accuracy')

plt.subplot(2, 1, 2)
plt.plot(loss, label='Training Loss')
plt.plot(val_loss, label='Validation Loss')
plt.legend(loc='upper right')
plt.ylabel('Cross Entropy')
plt.ylim([0,1.0])
plt.title('Training and Validation Loss')
plt.xlabel('epoch')
plt.show()



# Fine Tuning

mobile_net.trainable = True

# Let's take a look to see how many layers are in the base model
print("Number of layers in the base model: ", len(mobile_net.layers))

# Fine-tune from this layer onwards
fine_tune_at = 150

# Freeze all the layers before the `fine_tune_at` layer
for layer in mobile_net.layers[:fine_tune_at]:
  layer.trainable = False

len(model.trainable_variables)



model.compile(optimizer = tf.keras.optimizers.Adam(learning_rate = 0.00001),
                         loss=tf.keras.losses.SparseCategoricalCrossentropy(
                          # from_logits =True
                          ),
                         metrics=['accuracy'])
model.summary()

history_fine = model.fit(train_dataset,
                         epochs=120,
                         initial_epoch=history.epoch[-1],
                         validation_data=validation_dataset
                         )

import os
ecosnap_save_path = os.path.join('ml', "ecosnap/4/")
tf.saved_model.save(model, ecosnap_save_path)
model.save('ml/models/super_model.h5')

# import tensorflowjs as tfjs
# tfjs.converters.save_keras_model(model, 'ml/models/')

# loaded = tf.saved_model.load("ml/ecosnap/4/saved_model.pb")
# # predictions

# # Retrieve a batch of images from the test set
# image_batch, label_batch = validation_dataset.as_numpy_iterator().next()
# predictions = loaded.predict_on_batch(image_batch).flatten()
# # Apply a sigmoid since our model returns logits
# predictions = tf.nn.softmax(predictions)


def prep_image(image_url):
    img = tf.keras.utils.load_img(
        image_url,
        target_size=(200, 200)
    )
    img_array = tf.keras.utils.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0) # Create a batch
    return img_array


img_array_1 = prep_image('ml/test/plastic-recycling-code-pete-recycle-symbol-isolated-icon-pete-polyethylene-recycling-code-plastic-recycle-symbol-triangle-159234010.jpg')

img_array_5 = prep_image('ml/test/pp-plastic_5.jpeg')

predictions = model.predict(img_array_5)
predictions

print(
    "This image most likely belongs to {} with a {:.2f} percent confidence."
    .format(class_names[np.argmax(predictions)], 100 * np.max(predictions))
)