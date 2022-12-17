import React, { useState } from "react";
import styles from "./../../styles/Onboarding.module.css"

const Onboarding = () => {
	const [step, setStep] = useState(1);

	const handleStep = () => {
		if (step < 3) {
			setStep(step + 1);
		}
	}

	return (
		<div className={styles.onboarding}>
			<div className={styles.skip}>
				Skip
			</div>
			{ step === 1 &&
				<div className={styles.image}>
					<img src="1handright.svg" className={styles.handright}/>
					<img src="1handleft.svg" className={styles.handleft}/>
				</div>
			}
			{ step === 2 &&
				<div className={styles.image}>
					<img src="2robot.svg" className={styles.robot}/>
					<img src="2question.svg" className={styles.question}/>
				</div>
			}
			{ step === 3 &&
				<div className={styles.image}>
					<img src="1handright.svg" className={styles.handright}/>
					<img src="1handleft.svg" className={styles.handleft}/>
				</div>
			}
			<div className={styles.progress}>
				<div className={styles.active}></div>
				<div className={styles.inactive}></div>
				<div className={styles.inactive}></div>
			</div>
			<div className={styles.text}>
				Snap a picture of a plastic resin code
			</div>
			<div className={styles.next} onClick={() => {handleStep()}}>
				<img src="arrow.svg"/>
			</div>
		</div>
	)
}

export default Onboarding;