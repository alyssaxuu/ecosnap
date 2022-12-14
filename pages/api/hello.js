// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const tf = require('@tensorflow/tfjs-node');

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

// https://github.com/tensorflow/tfjs-examples/blob/master/firebase-object-detection-node/functions/index.js



let Model;

async function loadModel() {
  // Warm up the model
  if (!Model) {
    // Load the TensorFlow SavedModel through tfjs-node API. You can find more
    // details in the API documentation:
    // https://js.tensorflow.org/api_node/1.3.1/#node.loadSavedModel
    Model = await tf.node.loadSavedModel(
      './ml/ecosnap/2', ['serve'], 'serving_default');
  }
  const b = Buffer.from(base64str, 'base64')
// get the tensor
  const input = tf.node.decodeImage(b)
  Model.predict(input);
}


