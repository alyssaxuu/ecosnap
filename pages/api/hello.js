import loadTf from 'tfjs-node-lambda';
import { Readable } from 'stream';
import axios from 'axios';


// https://github.com/tensorflow/tfjs-examples/blob/master/firebase-object-detection-node/functions/index.js
export default async function handler(req, res) {
	//const loadTf = require('tensorflow-lambda')
	//const tf = require('@tensorflow/tfjs-node')
	//const tf = await loadTf()

	const response = await axios.get(
		'https://github.com/jlarmstrongiv/tfjs-node-lambda/releases/download/v2.0.10/nodejs12.x-tf2.8.6.br',
		{ responseType: 'arraybuffer' },
	);
	
	const readStream = Readable.from(response.data);
	//const tf: typeof import('@tensorflow/tfjs') = await loadTf(readStream);
	const tf = await loadTf(readStream);

	let Model;

	function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

	
	if (!Model) {
    // Load the TensorFlow SavedModel through tfjs-node API. You can find more
    // details in the API documentation:
    // https://js.tensorflow.org/api_node/1.3.1/#node.loadSavedModel
    //Model = await tf.node.loadSavedModel(
    //  './ml/ecosnap/4', ['serve'], 'serving_default');

		Model = await tf.loadGraphModel('https://ecosnap2.vercel.app/model.json');
  }
	
	const b = Buffer.from(req.body.image.replace(/^data:image\/(png|jpeg);base64,/,""), 'base64')
	// get the tensor
		const input = await tf.node.decodeImage(b);

		
		console.log(input);
		console.log("YO")


		const result = await Model.predict(tf.expandDims(input.cast('float32'), 0));
		const index = await result.data()
		const predict = await result.data();

  res.status(200).json({ number: indexOfMax(index)+1})
}