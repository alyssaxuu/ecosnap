import React, { useState } from "react";
import styles from "./../styles/Onboarding.module.css";

const Onboarding = (props) => {
  const [step, setStep] = useState(1);

  const handleStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  return (
    <div className={styles.onboarding}>
      <div
        className={styles.skip}
        onClick={() => {
          props.setDone(true);
          props.setOn(false);
        }}
      >
        Skip
      </div>
      {step === 1 && (
        <div className={styles.image}>
          <img src="1handright.svg" className={styles.handright} />
          <img src="1handleft.svg" className={styles.handleft} />
        </div>
      )}
      {step === 2 && (
        <div className={styles.image}>
          <img src="2robot.svg" className={styles.robot} />
          <img src="2smoke.svg" className={styles.smoke} />
          <img src="2question.svg" className={styles.question} />
        </div>
      )}
      {step === 3 && (
        <div className={styles.image}>
          <img src="3trash.svg" className={styles.trash} />
          <img src="3trees.svg" className={styles.trees} />
        </div>
      )}
      <div className={styles.bottom}>
        <div className={styles.progress}>
          <div
            onClick={() => setStep(1)}
            className={step === 1 ? styles.active : styles.inactive}
          ></div>
          <div
            onClick={() => setStep(2)}
            className={step === 2 ? styles.active : styles.inactive}
          ></div>
          <div
            onClick={() => setStep(3)}
            className={step === 3 ? styles.active : styles.inactive}
          ></div>
        </div>
        {step === 1 && (
          <div>
            <div className={styles.text}>Snap a picture of a plastic code</div>
            <div className={styles.subtitle}>
              Look for a tiny triangle with a number inside it from 1 to 7. Keep
              it in the center of the camera for best results.
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className={styles.text}>Did the AI get it right?</div>
            <div className={styles.subtitle}>
              After taking a picture, we will ask you if the AI recognised your
              code. If it’s not right, you can teach the AI.
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className={styles.text}>
              Learn how to recycle your plastic item
            </div>
            <div className={styles.subtitle}>
              You’ll learn if the item is recyclable or not, and how you should
              dispose of it.
            </div>
          </div>
        )}
        {step < 3 && (
          <div className={styles.next} onClick={() => handleStep()}>
            <img src="arrow.svg" />
          </div>
        )}
        {step === 3 && (
          <div
            className={styles.button}
            onClick={() => {
              props.setDone(true);
              props.setOn(false);
            }}
          >
            Start recycling
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
