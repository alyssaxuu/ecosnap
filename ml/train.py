import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
from tensorflow.keras.preprocessing import image_dataset_from_directory
import os

data_directory = "ml/seven_plastics/"

IMG_SIZE = (224, 224)
IMG_SHAPE = IMG_SIZE + (3,)
BATCH_SIZE = 12
AUTOTUNE = tf.data.AUTOTUNE

def prep_image(image_url):

    img = tf.keras.utils.load_img(image_url, target_size=IMG_SHAPE)
    img_array = tf.keras.utils.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)  # Create a batch

    return img_array


img_array_1 = prep_image("ml/test/31c34d7a-f53c-40a5-bb84-bdee7554471b_1.jpg")
img_array_2 = prep_image("ml/test/10cf4367-184f-4a61-bfcd-77a75b2b95d0_2.jpg")
img_array_3 = prep_image("ml/test/v-plastic-recycling-symbol-pvc-v-3_fa88284651_3.jpg")
img_array_4 = prep_image("ml/test/pe-ld-low-density-polyethylene-4.jpg")
img_array_5 = prep_image("ml/test/pp-plastic_5.jpeg")
img_array_6 = prep_image("ml/test/2fc8a970-8215-4627-b17a-7ca71d2eb73f_6.jpg")
img_array_7 = prep_image("ml/test/WRAQ6784.jpg")

train_dataset = image_dataset_from_directory(
    data_directory,
    validation_split=0.2,
    subset="training",
    seed=321,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
)

validation_dataset = image_dataset_from_directory(
    data_directory,
    validation_split=0.2,
    subset="validation",
    seed=321,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
)


class_names = train_dataset.class_names

rescale = tf.keras.Sequential([tf.keras.layers.Rescaling(1.0 / 255.0)])

data_augmentation = tf.keras.Sequential(
    [
        tf.keras.layers.experimental.preprocessing.RandomRotation(0.1),
        tf.keras.layers.experimental.preprocessing.RandomContrast(0.1),
        tf.keras.layers.experimental.preprocessing.RandomZoom(0.1),
    ]
)


def prepare(ds, rescale=False, augment=False):
    # Resize and rescale all datasets.

    if rescale:
        ds = ds.map(
            lambda x, y: (rescale(x, training=True), y), num_parallel_calls=AUTOTUNE
        )

    # Use data augmentation only on the training set.
    if augment:
        ds = ds.map(
            tf.autograph.experimental.do_not_convert(
                lambda x, y: (data_augmentation(x, training=True), y)
            ),
            num_parallel_calls=AUTOTUNE,
        )

    # Use buffered prefetching on all datasets.
    return ds.prefetch(buffer_size=AUTOTUNE)


base_model_name_list = ["efficient_net", "mobile_net", "xception", "inception"]
predictions_dict = {}


def base_model(
    model_type, img_shape, train_dataset, validation_dataset, augment_bool=False
):

    if model_type == "mobile_net":
        model_init = tf.keras.applications.MobileNetV3Large(
            input_shape=img_shape,
            alpha=1.0,
            minimalistic=False,
            include_top=False,
            weights="imagenet",
            pooling=None,
            dropout_rate=0.2,
            classifier_activation="softmax",
            include_preprocessing=True,
        )

        train_dataset = prepare(train_dataset, augment=augment_bool)
        validation_dataset = prepare(validation_dataset)

    elif model_type == "xception":
        model_init = tf.keras.applications.Xception(
            weights="imagenet", input_shape=img_shape, include_top=False
        )

        train_dataset = prepare(train_dataset, augment=augment_bool)
        validation_dataset = prepare(validation_dataset)

    elif model_type == "inception":
        model_init = tf.keras.applications.InceptionV3(
            weights="imagenet", input_shape=img_shape, include_top=False
        )

        train_dataset = prepare(train_dataset, augment=augment_bool)
        validation_dataset = prepare(validation_dataset)

    elif model_type == "efficient_net":
        model_init = tf.keras.applications.EfficientNetV2B0(
            weights="imagenet", input_shape=img_shape, include_top=False
        )

        train_dataset = prepare(train_dataset, augment=augment_bool)
        validation_dataset = prepare(validation_dataset)

    return model_init, train_dataset, validation_dataset


for base_model_name in base_model_name_list:
    for augment in [True, False]:
        base_model_init, train_dataset, validation_dataset = base_model(
            base_model_name,
            IMG_SHAPE,
            train_dataset,
            validation_dataset,
            augment_bool=augment,
        )

        base_model_init.trainable = False

        global_average_layer = tf.keras.layers.GlobalAveragePooling2D()

        prediction_layer = tf.keras.layers.Dense(len(class_names), activation="softmax")

        inputs = tf.keras.Input(shape=IMG_SHAPE)
        if base_model_name in ["xception", "inception"]:
            x = rescale(inputs)
            x = base_model_init(x, training=False)
        else:
            x = base_model_init(inputs, training=False)
        x = global_average_layer(x)
        x = tf.keras.layers.Dropout(0.3)(x)
        outputs = prediction_layer(x)
        model = tf.keras.Model(inputs, outputs)

        model.compile(
            optimizer=tf.keras.optimizers.Adam(),
            loss=tf.keras.losses.SparseCategoricalCrossentropy(),
            metrics=["accuracy"],
        )

        model.summary()
        epochs = 100

        weights_path = rf"ml/models/weights/weights_{base_model_name}.hdf5"
        if not augment:
            weights_path = rf"ml/models/weights/weights_{base_model_name}_no_aug.hdf5"
        early_stopping = EarlyStopping(
            monitor="val_loss",
            min_delta=0,
            patience=20,
            verbose=1,
            mode="auto",
            restore_best_weights=True,
        )
        reduce_lr = ReduceLROnPlateau(
            monitor="val_loss",
            factor=0.1,
            patience=30,
            min_lr=0.000001,
            verbose=1,
            mode="min",
        )
        checkpoint = ModelCheckpoint(
            weights_path,
            monitor="val_loss",
            verbose=1,
            save_best_only=True,
            save_weights_only=True,
        )

        history = model.fit(
            train_dataset,
            epochs=epochs,
            validation_data=validation_dataset,
            callbacks=[
                early_stopping,
                reduce_lr,
                checkpoint,
            ],
        )

        # Fine Tuning

        base_model_init.trainable = True
        model.compile(
            optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
            loss=tf.keras.losses.SparseCategoricalCrossentropy(),
            metrics=["accuracy"],
        )

        model.summary()

        history_fine = model.fit(
            train_dataset,
            epochs=50,
            validation_data=validation_dataset,
            callbacks=[
                early_stopping,
                reduce_lr,
                checkpoint,
            ],
        )

        model.load_weights(weights_path)

        ecosnap_save_path = os.path.join("ml/models", f"{base_model_name}")
        if not augment:
            ecosnap_save_path = os.path.join("ml/models", f"{base_model_name}_no_aug")
        tf.keras.models.save_model(model, rf"{ecosnap_save_path}/keras")
        tf.saved_model.save(model, rf"{ecosnap_save_path}/10")
        model.save(rf"ml/models/{ecosnap_save_path}")

        predictions_1 = model.predict(img_array_1)
        predictions_2 = model.predict(img_array_2)
        predictions_3 = model.predict(img_array_3)
        predictions_4 = model.predict(img_array_4)
        predictions_5 = model.predict(img_array_5)
        predictions_6 = model.predict(img_array_6)
        predictions_7 = model.predict(img_array_7)

        predictions_dict[
            f"{ecosnap_save_path}_1"
        ] = "{} with a {:.2f} percent confidence.".format(
            class_names[np.argmax(predictions_1)], 100 * np.max(predictions_1)
        )
        predictions_dict[
            f"{ecosnap_save_path}_2"
        ] = "{} with a {:.2f} percent confidence.".format(
            class_names[np.argmax(predictions_2)], 100 * np.max(predictions_2)
        )
        predictions_dict[
            f"{ecosnap_save_path}_3"
        ] = "{} with a {:.2f} percent confidence.".format(
            class_names[np.argmax(predictions_3)], 100 * np.max(predictions_3)
        )
        predictions_dict[
            f"{ecosnap_save_path}_4"
        ] = "{} with a {:.2f} percent confidence.".format(
            class_names[np.argmax(predictions_4)], 100 * np.max(predictions_4)
        )

        predictions_dict[
            f"{ecosnap_save_path}_5"
        ] = "{} with a {:.2f} percent confidence.".format(
            class_names[np.argmax(predictions_5)], 100 * np.max(predictions_5)
        )

        predictions_dict[
            f"{ecosnap_save_path}_6"
        ] = "{} with a {:.2f} percent confidence.".format(
            class_names[np.argmax(predictions_6)], 100 * np.max(predictions_6)
        )

        predictions_dict[
            f"{ecosnap_save_path}_7"
        ] = "{} with a {:.2f} percent confidence.".format(
            class_names[np.argmax(predictions_7)], 100 * np.max(predictions_7)
        )

