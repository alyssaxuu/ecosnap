# EcoSnap

![Preview](preview.gif)
<br>
<br>
Recycle better with Artificial Inteligence 🔥

EcoSnap tells you what, how and where to recycle your items from a simple picture.

👉 Get it now [EcoSnap](ecosnap.vercel.app)

> You can support this project (and many others) through [GitHub Sponsors](https://github.com/sponsors/alyssaxuu)! ❤️

Made by [Alyssa X](https://twitter.com/alyssaxuu) & [Leo](https://www.linkedin.com/in/leonorfurtado/)

## Table of contents

- [Features](#features)
- [The AI model](#the-ai-model)
	- [Dataset](#dataset)
	- [Training your own model](#training)
	- [Prediction](#prediction)
    - [The feedback loop](#feedback)
- [Libraries used](#libraries-used)

## Features

🗄 Snap a picture of a plastic code<br>  🔍 Search for specific item<br>  🔮 Learn how to recycle effectively <br> 🧩 Keep track of how many plastic items you've recycled<br>⚙️ Change your location for specific advice<br> 🌙...and much more to come - all for free & no sign in needed!

## The AI Model

### Data

The model was trained on image examples of the 7 different resin codes, the data for this can be found in `ml/seven_plastics`. It is a combination of the following [Kaggle Dataset](https://www.kaggle.com/datasets/piaoya/plastic-recycling-codes) and images collected by the authors and contributors.

### Training

The final model was trained using [TensorFlow's EfficientNet](https://www.tensorflow.org/api_docs/python/tf/keras/applications/efficientnet_v2/EfficientNetV2B0) implementation, the model weights were frozen for transfer learning, so the model could learn the resin codes faster! The model was trained in `Python` on a GPU-powered machine, for faster training! You can find the training script in `ml/train.py` and try it for yourself, there you will see that different meta architectures and parameters were experimented with before arriving at the final model.

### Prediction

To predict the plastic resin code, the model had to be integrated with the front end app for real-time results, to do this we had to convert the model in a way that was compatible with `Node.js`, this is when [TensorFlow.js](https://www.tensorflow.org/js) came to the rescue.

The app passes the image Tensor onto the model that then gives a probability for each of the plastic resin codes, the one with the highest probability gets shown to the user, *along with bespoke advice*!

### The feedback loop

Training a specific model is hard, the model always gets things wrong. So if it does, we give the user an opportunity to tell us what the right code was! This benefits in several ways:

1. The user gets the information they need on how to recycle their item
2. We can see how the model is performing in production
3. We get new data ( if the user lets us) to train the model with and improve it for everyone

## Aknowlegments


Feel free to suggest improvements by [making an issue](https://github.com/alyssaxuu/econap/issues/new).


## Libraries used

- [Tensorflow](https://www.tensorflow.org/) - for anything model related, the AI

#

Feel free to reach out to me through us at hi@alyssax.com or to [Alyssa](https://twitter.com/alyssaxuu) or [Leo](https://www.linkedin.com/in/leonorfurtado/) directly if you have any questions or feedback! Hope you find this useful 💜
