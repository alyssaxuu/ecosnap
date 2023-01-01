import loadTf from "tfjs-node-lambda";
import { Readable } from "stream";
import axios from "axios";

export default async function handler(req, res) {
  const response = await axios.get(
    "https://github.com/jlarmstrongiv/tfjs-node-lambda/releases/download/v2.0.10/nodejs12.x-tf2.8.6.br",
    { responseType: "arraybuffer" }
  );

  const readStream = Readable.from(response.data);
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
    // Make sure to update the MODEL_URL environment variable on Vercel (or .env file) to point to the model.json on /public. Does not work on localhost or with a local file path.
    Model = await tf.loadGraphModel(process.env.MODEL_URL);
  }

  const b = Buffer.from(
    req.body.image.replace(/^data:image\/(png|jpeg);base64,/, ""),
    "base64"
  );
  const input = await tf.node.decodeImage(b);
  const result = await Model.predict(tf.expandDims(input.cast("float32"), 0));
  const index = await result.data();

  res.status(200).json({
    number: indexOfMax(index) + 1,
    tensor: JSON.stringify(input.arraySync()),
  });
}
