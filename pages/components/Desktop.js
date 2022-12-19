import React from "react";
import styles from "./../../styles/Desktop.module.css";
import Splash from "./Splash";

const Desktop = (props) => {
	return (
		<div className={styles.desktop}>
			{props.check &&
        	<Splash region={props.region} setNum={props.setNum} num={props.num} onboarding={props.onboarding} setRegion={props.setRegion} />
				}
		</div>
	)
}

export default Desktop;