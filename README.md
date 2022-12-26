# EcoSnap


https://user-images.githubusercontent.com/7581348/208559445-a449cef6-0ae1-4c08-b9a5-c591062c3a3e.mp4


Recycle your plastic better with Artificial Intelligence ♻️

EcoSnap tells you what, how, and where to recycle your items from a simple picture using Artificial Intelligence. You just take a picture of a plastic resin code, and it tells you how and where to recycle the item based on your location. We built this product in a week for [Ben's Bites Hackathon](https://bens-bites.upvoty.com/b/hackathon/ecosnap-recycle-your-plastic-better-with-artificial-intelligence).

👉 [Try it now - it's free with no sign in needed](https://ecosnap.vercel.app)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/alyssaxuu/ecosnap)

> You can support this project (and many others) through [GitHub Sponsors](https://github.com/sponsors/alyssaxuu)! ❤️

Made by [Alyssa X](https://twitter.com/alyssaxuu) & [Leo](https://www.linkedin.com/in/leonorfurtado/). Read more about how we built this [here](https://alyssax.substack.com/p/we-built-an-ai-recycling-app-in-a).

## Table of contents

- [Features](#features)
- [The AI model](#the-ai-model)
	- [Dataset](#data)
	- [Training your own model](#training)
	- [Prediction](#prediction)
    - [The feedback loop](#feedback)
- [Credit](#credit)
- [Libraries used](#libraries-used)
- [What's Next](whats-next)

## Features

📸 Snap a picture of a plastic code<br>  🔍 Search for specific item<br>  ♻️ Learn how to recycle effectively using AI <br> 🥤 Keep track of how many plastic items you've recycled<br>🌍 Change your location for specific advice<br> ✨...and much more to come - all for free & no sign in needed!


## The AI Model

### Data

The model was trained on image examples of the 7 different resin codes, the data for this can be found in `ml/seven_plastics`. It is a combination of the following [Kaggle Dataset](https://www.kaggle.com/datasets/piaoya/plastic-recycling-codes) and images collected by the authors and contributors.

### Training

The final model was trained using [TensorFlow's EfficientNet](https://www.tensorflow.org/api_docs/python/tf/keras/applications/efficientnet_v2/EfficientNetV2B0) implementation, the model weights were frozen for transfer learning, so the model could learn the resin codes faster! The model was trained in `Python` on a GPU-powered machine, for faster training! You can find the training script in `ml/train.py` and try it for yourself, there you will see that different meta architectures and parameters were experimented with before arriving at the final model.

### Prediction

To predict the plastic resin code, the model had to be integrated with the front end app for real-time results, to do this we had to convert the model in a way that was compatible with `Node.js`, this is when [TensorFlow.js](https://www.tensorflow.org/js) came to the rescue.

The app passes the image Tensor onto the model that then gives a probability for each of the plastic resin codes, the one with the highest probability gets shown to the user, *along with bespoke advice*!

### Feedback

Training a specific model is hard, the model always gets things wrong. So if it does, we give the user an opportunity to tell us what the right code was! This benefits in several ways:

1. The user gets the information they need on how to recycle their item
2. We can see how the model is performing in production
3. We get new data ( if the user lets us) to train the model with and improve it for everyone

## Credit

- [Kaggle Dataset](https://www.kaggle.com/datasets/piaoya/plastic-recycling-codes) - for the plastic codes
- [Collletttivo](http://collletttivo.it/) - for the Mattone font
- [Unsplash](https://unsplash.com/) - for the images

## Libraries used
- [Tensorflow](https://www.tensorflow.org/) - for anything model related, the AI
- [React Camera Pro](https://github.com/purple-technology/react-camera-pro) - for the camera
- [Next.js](https://nextjs.org/) - for the frontend

## What's next?

We want to implement a few more ideas after the Hackathon:
1. A map that shows you where your nearest recycling point is
2. Top tips on how to recycle
3. Articles and research about plastic
4. Get the user's permission to use their images for retraining the model


Feel free to reach out to us at hi@alyssax.com, to [Alyssa](https://twitter.com/alyssaxuu) or [Leo](https://www.linkedin.com/in/leonorfurtado/) directly if you have any questions or feedback! Hope you find this useful 💜
