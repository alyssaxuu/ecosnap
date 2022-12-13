import React, { useState, useRef } from "react";
import styles from "./../../styles/Viewer.module.css"
import {Camera} from "react-camera-pro";

const Viewer = () => {
  const camera = useRef(null);
	const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);
	const [scanning, setScanning] = useState(false);

	const takePhoto = () => {
		const photo = camera.current.takePhoto();
    setImage(photo);
		setScanning(true);
		setTimeout(() => {
			setScanning(false);
		}, 5000);
	}

  return (
		<div className={styles.camera}>
			<div className={styles.title}>Scan</div>
			<div className={styles.overlay}></div>
			{
				scanning &&
				<div className={styles.scanline}></div>
			}
			<img className={styles.scanarea} src="scanarea.svg"/>
    	<Camera ref={camera} numberOfCamerasCallback={setNumberOfCameras} facingMode='environment'  />
      <img src={image} alt='Image preview' className={styles.image} />
      <button
				className={styles.takephoto}
        onClick={takePhoto}
      >
				<img src="cam.svg"/>
			</button>
      <button
				className={styles.switchcamera}
        hidden={numberOfCameras >= 5}
        onClick={() => {
          camera.current.switchCamera();
        }}
      >
				<img src="rotate.svg"/>
			</button>
			<div className={scanning ? styles.scanning : styles.off}>
				<img src="scan.svg"/>
				Scanning...
			</div>
		</div>
  )
}

export default Viewer;