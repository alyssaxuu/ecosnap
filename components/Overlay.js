import React, { useEffect, useState } from "react";
import styles from "./../styles/Overlay.module.css"
import PlasticInfo from "./PlasticInfo";
import saveImage from "./Firebase";

const Overlay = (props) => {
	const [feedback, setFeedback] = useState(false);
	const [wrong, setWrong] = useState(false);
	const [noPlastic, setNoPlastic] = useState(false);
	const plasticTypes = ["PET/PETE", "HDPE", "PVC or V", "LDPE", "PP", "PS", "Misc.", "No number"];
	
	const handleCorrect = () => {
		if (props.plastic === 8) {
			handleNone();
		} else {
			setNoPlastic(false);
			if (props.plastic === 1 || props.plastic === 2 || props.plastic === 5) {
				props.setRecyclable(true);
				localStorage.setItem("num", props.num + 1);
				props.setNum(props.num + 1);
			} else {
				props.setRecyclable(false);
			}
			setFeedback(true);
		}
		//saveImage(props.tensor, props.pred, props.plastic);
	}

	const handleFalse = () => {
		setWrong(true);
	}

	const newNumber = (number) => {
		props.setPlastic(number);
		if (number === 1 || number === 2 || number === 5) {
			props.setRecyclable(true);
			localStorage.setItem("num", props.num + 1);
			props.setNum(props.num + 1);
		} else {
			props.setRecyclable(false);
		}
		setNoPlastic(false);
		//saveImage(props.tensor, props.pred, number);
		setWrong(false);
		setFeedback(true);
	}

	const handleNone = () => {
		setNoPlastic(true);
		setWrong(false);
		setFeedback(true);
		props.setPlastic(8);
	}

	useEffect(() => {
		if (!props.scanning) {
			setFeedback(false);
		}
	}, [props.scanning])

	return (
	<div className={wrong ? styles.mid : feedback ? styles.full : props.scanning ? styles.scanning : styles.off}>
		{props.loading &&
			<span><img className={styles.rotate} src="scan.svg"/> Scanning...</span>
		}
		{props.ready && !wrong && !feedback &&
			<div className={styles.feedback}>
				<img src={"num"+props.plastic+".svg"} className={styles.plastic}/>
				<div className={styles.feedinfo}>
					<span className={styles.feedtitle}>Is this right?</span>
					<span className={styles.feeddesc}>{plasticTypes[props.plastic-1]}</span>
				</div>
				<div className={styles.buttons}>
					<img alt="Yes" src="check.svg" onClick={() => handleCorrect()} className={styles.check}/>
					<img alt="No" src="no.svg" onClick={() => handleFalse()} className={styles.cross}/>
				</div>
			</div>
		}
		{wrong &&
			<div className={styles.wrong}>
				<span className={styles.question}>Which number was it?</span>
				<div className={styles.numbers}>
					<div className={styles.button} onClick={() => newNumber(1)}>1</div>
					<div className={styles.button} onClick={() => newNumber(2)}>2</div>
					<div className={styles.button} onClick={() => newNumber(3)}>3</div>
					<div className={styles.button} onClick={() => newNumber(4)}>4</div>
					<div className={styles.button} onClick={() => newNumber(5)}>5</div>
					<div className={styles.button} onClick={() => newNumber(6)}>6</div>
					<div className={styles.button} onClick={() => newNumber(7)}>7</div>
				</div>
				<span className={styles.other} onClick={() => handleNone()}>None of these</span>
			</div>
		}
		{feedback && !wrong && !noPlastic && props.recyclable && props.ready && 
			<span className={styles.scanrecyclable}><img src="smile.svg"/> Awesome, it's recyclable!</span>
		}
		{
		!props.recyclable && !wrong && !noPlastic && props.ready && feedback &&
			<span className={styles.scannotrecyclable}><img src="frown.svg"/> Oh no, it’s not easily recyclable</span>
		}
		{
		!wrong && noPlastic && props.ready && feedback &&
			<span className={styles.notfound}><img src="notfound.svg"/> We can’t find the resin number</span>
		}
		{props.ready && !wrong && feedback &&
			<PlasticInfo region={props.region} type={props.plastic} handleReturn={props.handleReturn} />
		}

	</div>
	)
}

export default Overlay;