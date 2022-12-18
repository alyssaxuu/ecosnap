import { progressBarHelper } from "@tensorflow/tfjs-node/dist/callbacks";
import React, { useState } from "react";
import styles from "./../../styles/Onboarding.module.css"

const Onboarding = (props) => {
	const [step, setStep] = useState(1);

	const handleStep = () => {
		if (step < 3) {
			setStep(step + 1);
		}
	}

	return (
		<div className={styles.onboarding}>
			<div className={styles.skip} onClick={() => props.setDone(true)}>
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
					<img src="2smoke.svg" className={styles.smoke}/>
					<img src="2question.svg" className={styles.question}/>
				</div>
			}
			{ step === 3 &&
				<div className={styles.image}>
					<img src="3trash.svg" className={styles.trash}/>
					<img src="3trees.svg" className={styles.trees}/>
				</div>
			}
			<div className={styles.bottom}>
			<div className={styles.progress}>
				<div onClick={() => setStep(1)} className={step === 1 ? styles.active : styles.inactive}></div>
				<div onClick={() => setStep(2)} className={step === 2 ? styles.active : styles.inactive}></div>
				<div onClick={() => setStep(3)} className={step === 3 ? styles.active : styles.inactive}></div>
			</div>
			{ step === 1 &&
			<div>
				<div className={styles.text}>
					Snap a picture of a plastic resin code
				</div>
				<div className={styles.subtitle}>
				Look for a triangle encircling a number from 1 to 7. Make sure to keep it in the center of the camera frame.
				</div>
			</div>
			}
			{ step === 2 &&
			<div>
				<div className={styles.text}>
					Check to see if the AI recognized the correct code
				</div>
				<div className={styles.subtitle}>
				After taking a picture, a modal will appear with the symbol the AI recognized. If it’s not right you can correct it.
				</div>
			</div>
			}
			{ step === 3 &&
			<div>
				<div className={styles.text}>
				Learn how to recycle your plastic item
				</div>
				<div className={styles.subtitle}>
				You’ll learn whether the item is recyclable or not, and how you should dispose of it. Note that the advice is specific to London.
				</div>
			</div>
			}
			{step < 3 &&
			<div className={styles.next} onClick={() => handleStep()}>
				<img src="arrow.svg"/>
			</div>
			}
			{step === 3 &&
			<div className={styles.button} onClick={() => props.setDone(true)}>
				Start recycling
			</div>
			}
			</div>
		</div>
	)
}

export default Onboarding;