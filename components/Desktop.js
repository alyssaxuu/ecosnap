import React from "react";
import styles from "./../styles/Desktop.module.css";
import Splash from "./Splash";

const Desktop = (props) => {
  return (
    <div className={styles.desktop}>
      {props.check && (
        <Splash
          region={props.region}
          pred={props.pred}
          setPred={props.setPred}
          tensor={props.tensor}
          setTensor={props.setTensor}
          setNum={props.setNum}
          num={props.num}
          onboarding={props.onboarding}
          setRegion={props.setRegion}
        />
      )}
      <a
        href="https://alyssax.substack.com/p/we-built-an-ai-recycling-app-in-a"
        target="_blank"
        className={styles.awards}
      >
        <img className={styles.award1} src="./award1.svg" />
        <img className={styles.award2} src="./award2.svg" />
      </a>
      <div className={styles.badge}>
        <img src="logo-with-back.svg" />
        <div className={styles.badgewrap}>
          <div className={styles.name}>EcoSnap</div>
          <div className={styles.credit}>
            Made by{" "}
            <a href="https://www.linkedin.com/in/leonorfurtado" target="_blank">
              Leo
            </a>{" "}
            &{" "}
            <a href="https://twitter.com/alyssaxuu/" target="_blank">
              Alyssa X
            </a>
          </div>
        </div>
      </div>
      <a
        href="https://twitter.com/intent/tweet?text=Check%20out%20EcoSnap%20to%20learn%20how%20to%20recycle%20your%20plastic%20better%20with%20AI&url=http%3A%2F%2Fecosnap.vercel.app"
        className={styles.share}
        target="_blank"
      >
        <img src="twitter.svg" /> Share
      </a>
      <a
        href="https://github.com/alyssaxuu/ecosnap"
        target="_blank"
        className={styles.github}
      >
        <img src="github.svg" /> View on GitHub
      </a>
      <div className={styles.qrcode}>
        <img src="qrcode.png" />
        <span>Open on your phone ✨</span>
      </div>
    </div>
  );
};

export default Desktop;
