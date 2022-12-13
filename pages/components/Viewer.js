import React, { useState, useRef } from "react";
import styles from "./../../styles/Viewer.module.css"
import PlasticInfo from "./PlasticInfo";
import {Camera} from "react-camera-pro";

const Viewer = () => {
  const camera = useRef(null);
	const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);
	const [scanning, setScanning] = useState(false);
	const [loading, setLoading] = useState(false);
	const [recyclable, setRecyclable] = useState(false);
	const [next, setNext] = useState(false);
	const [plastic, setPlastic] = useState(1);
	const inputRef = useRef(null);

	const handleUploadClick = () => {
    inputRef.current?.click();
  };

	const handleReturn = () => {
		setScanning(false);
		setLoading(false);
		setNext(false);
	}

	const handleFileChange = (event) => {
    if (!event.target.files) {
      return;
    }

    setImage(URL.createObjectURL(event.target.files[0]));
		scan();
  };

	const scan = () => {
		setScanning(true);
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setNext(true);
			if (Math.floor(Math.random()*2) === 0) {
				setPlastic(Math.floor(Math.random() * 3)+3);
				setRecyclable(false);
			} else {
				setPlastic(1);
				setRecyclable(true);
			}
		}, 5000);
	}

	const takePhoto = () => {
		const photo = camera.current.takePhoto();
    setImage(photo);
		scan();
	}

  return (
		<div className={styles.camera}>
			{!next &&
				<div className={styles.title}>Scan</div>
			}
			{scanning &&
				<img className={styles.preview} src={image}/>
			}
			{next && 
			<img className={styles.goback} src="close.svg" onClick={() => handleReturn(true)}/>
			}
			<div className={styles.overlay}></div>
			{
				loading &&
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
					hidden={numberOfCameras <= 1}
					onClick={() => {
						camera.current.switchCamera();
					}}
				>
					<img src="rotate.svg"/>
				</button>
			}
			{!scanning &&
				<img src="upload.svg" className={styles.upload} onClick={handleUploadClick}/>
			}
			<input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
			<div className={next ? styles.full : loading ? styles.scanning : styles.off}>
				{loading &&
					<span><img className={styles.rotate} src="scan.svg"/> Scanning...</span>
				}
				{recyclable && next && 
					<span className={styles.scanrecyclable}><img src="smile.svg"/> Awesome, it's recyclable!</span>
				}
				{
				!recyclable && next &&
					<span className={styles.scannotrecyclable}><img src="frown.svg"/> Oh no, it’s not recyclable</span>
				}
				{next &&
					<PlasticInfo type={plastic} handleReturn={handleReturn} />
				}
			</div>
		</div>
  )
}

export default Viewer;