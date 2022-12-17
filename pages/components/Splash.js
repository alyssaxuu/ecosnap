import React, { useState } from "react";
import styles from "./../../styles/Splash.module.css"
import Viewer from './Viewer'
import Onboarding from "./Onboarding";

const Splash = () => {
	const [getStarted, setGetStarted] = useState(false);

	return (
		<div className={styles.container}>
			{getStarted &&
				<Viewer />
			}
			{!getStarted &&
			<div className={styles.splash}>
				<div className={styles.logo}>
					<img src="logo.svg"/>
					Ecosnap
				</div>
				<div className={styles.illustration}>
					<img className={styles.clouds} src="clouds.svg"/>
					<img className={styles.trees} src="trees.svg"/>
					<img className={styles.person} src="person.svg"/>
					<img className={styles.flower} src="flower.svg"/>
					<img className={styles.trash} src="trash.svg"/>
					<img className={styles.ground} src="ground.svg"/>
				</div>
				<div className={styles.title}>Recycle plastics better with Artificial Intelligence</div>
				<div className={styles.subtitle}>Take a picture of a plastic resin code and learn how to recycle the item.</div>
				<div className={styles.button} onClick={() => setGetStarted(true)}>Get started</div>
			</div>
			}
		</div>
	)
}

export default Splash;