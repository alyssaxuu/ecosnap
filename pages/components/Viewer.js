import React, { useState, useRef, useEffect } from "react";
import styles from "./../../styles/Viewer.module.css"
import Overlay from "./Overlay";
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
	const canvas = useRef(null);
	const [backImage, setBackImage] = useState(null);

	const handleUploadClick = () => {
    inputRef.current?.click();
  };

	const handleReturn = () => {
		setScanning(false);
		setLoading(false);
		setNext(false);
	}

	const fetchData = async() => {
		try {
			const res = await fetch("/api/hello", {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({image:image})
			});
			const data = await res.json();
			return data;
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		const run = async() => {
			const data = await fetchData();
			setPlastic(data.number);
			if (plastic === 1 || plastic === 2 || plastic === 5) {
				setRecyclable(true);
			} else {
				setRecyclable(false);
			}
			setLoading(false);
			setNext(true);
		}
		if (image) {
			scan()
			run();
		}
	}, [image]);

	function cropImage(img) {
		setBackImage(img)
    const originalImage = new Image();
		originalImage.src = img;
    const ctx = canvas.current.getContext("2d");
 
    originalImage.addEventListener('load', function() {
			const originalWidth = originalImage.naturalWidth;
			const originalHeight = originalImage.naturalHeight;
			const aspectRatio = originalWidth/originalHeight;
			let newHeight = Math.floor(200/aspectRatio);
			let y = (newHeight/2)-100;
			
			canvas.width = 200;
			canvas.height = 200;
			 
			ctx.drawImage(originalImage, 0, -y, 200, newHeight);
			setImage(canvas.current.toDataURL("image/jpeg"));
    });
}

	const handleFileChange = (event) => {
    if (!event.target.files) {
      return;
    }
		var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]); 
			reader.onloadend = function() {
				var base64data = reader.result;   
				cropImage(base64data);    
			}
  };

	const scan = () => {
		setScanning(true);
		setLoading(true);
	}

	const takePhoto = async () => {
		const photo = camera.current.takePhoto();
		cropImage(photo);
	}

  return (
		<div className={styles.camera}>
			<canvas className={styles.canvas} width={200} height={200} ref={canvas}></canvas>
			{!next &&
				<div className={styles.title}>Scan</div>
			}
			{scanning &&
				<img className={styles.preview} src={backImage}/>
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
			{!scanning &&
    		<Camera ref={camera} numberOfCamerasCallback={setNumberOfCameras} facingMode='environment' />
			}
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
			<Overlay loading={loading} setPlastic={setPlastic} setRecyclable={setRecyclable} scanning={scanning} ready={next} plastic={plastic} recyclable={recyclable} handleReturn={handleReturn} />
			<input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
		</div>
  )
}

export default Viewer;