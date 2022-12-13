import React, { useState, useRef } from "react";
import styles from "./../../styles/Viewer.module.css"
import {Camera} from "react-camera-pro";

const Viewer = () => {
  const camera = useRef(null);
	const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);
	const [scanning, setScanning] = useState(false);
	const [recyclable, setRecyclable] = useState(false);

	const takePhoto = () => {
		const photo = camera.current.takePhoto();
    setImage(photo);
		setScanning(true);
		setTimeout(() => {
			setRecyclable(true);
		}, 5000);
	}

  return (
		<div className={styles.camera}>
			<div className={styles.title}>Scan</div>
			<div className={styles.overlay}></div>
			{
				(scanning && !recyclable) &&
				<div className={styles.scanline}></div>
			}
			<img className={styles.scanarea} src="scanarea.svg"/>
    	<Camera ref={camera} numberOfCamerasCallback={setNumberOfCameras} facingMode='environment'  />
      <img src={image} alt='Image preview' className={styles.image} />
			{!scanning &&
				<button
					className={styles.takephoto}
					onClick={takePhoto}
				>
					<img src="cam.svg"/>
				</button>
			}
			{!scanning &&
				<button
					className={styles.switchcamera}
					hidden={numberOfCameras >= 5}
					onClick={() => {
						camera.current.switchCamera();
					}}
				>
					<img src="rotate.svg"/>
				</button>
			}
			<div className={recyclable ? styles.full : scanning ? styles.scanning : styles.off}>
				{!recyclable &&
				<span><img className={styles.rotate} src="scan.svg"/> Scanning...</span>
				}
				{recyclable && 
				<span className={styles.scanrecyclable}><img src="smile.svg"/> Awesome, it's recyclable!</span>}
			</div>
		</div>
  )
}

export default Viewer;