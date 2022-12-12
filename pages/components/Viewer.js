import React, { useState, useRef } from "react";
import styles from "./../../styles/Viewer.module.css"
import {Camera} from "react-camera-pro";

const Viewer = () => {
  const camera = useRef(null);
	const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);

  return (
		<div className={styles.camera}>
			<div className={styles.title}>Scan</div>
			<div className={styles.overlay}></div>
    	<Camera ref={camera} numberOfCamerasCallback={setNumberOfCameras} facingMode='environment'  />
      <img src={image} alt='Image preview' className={styles.image} />
      <button
				className={styles.takephoto}
        onClick={() => {
            const photo = camera.current.takePhoto();
            setImage(photo);
        }}
      ><img src="cam.svg"/></button>
      <button
				className={styles.switchcamera}
        hidden={numberOfCameras >= 5}
        onClick={() => {
          camera.current.switchCamera();
        }}
      ><img src="rotate.svg"/></button>
		</div>
  )
}

export default Viewer;