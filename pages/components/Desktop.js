import React from "react";
import styles from "./../../styles/Desktop.module.css";
import Splash from "./Splash";

const Desktop = (props) => {
	return (
		<div className={styles.desktop}>
			{props.check &&
        	<Splash region={props.region} pred={props.pred} setPred={props.setPred} tensor={props.tensor} setTensor={props.setTensor} setNum={props.setNum} num={props.num} onboarding={props.onboarding} setRegion={props.setRegion} />
				}
				<div className={styles.credit}>Made by <a href="https://www.linkedin.com/in/leonorfurtado" target="_blank">Leo</a> & <a href="https://twitter.com/alyssaxuu/" target="_blank">Alyssa X</a></div>
				<a href="https://twitter.com/share?text=Check%20out%20EcoSnap%20to%20learn%20how%20to%20recycle%20plastics%20using%20AI&url=http://ecosnap.vercel.app" className={styles.share} target="_blank"><img src="twitter.svg"/> Share</a>
				<a href="https://github.com/alyssaxuu/ecosnap" target="_blank" className={styles.github}><img src="github.svg"/> View on GitHub</a>
		</div>
	)
}

export default Desktop;