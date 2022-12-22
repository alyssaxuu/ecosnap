import React from "react";
import styles from "./../styles/Settings.module.css";

const Settings = (props) => {
	return (
		<div className={styles.settings}>
			<div className={styles.nav}>
				<img src="arrow-back.svg" onClick={() => props.setSettings(false)}/>
				<span className={styles.header}>Settings</span>
			</div>
			<div className={styles.all}>
				<div className={styles.item} onClick={() => props.setReset(true)}><span>Update region</span> <img src="enter.svg"/></div>
				<div className={styles.item} onClick={() => props.setOn(true)}><span>View onboarding</span> <img src="enter.svg"/></div>
				<div className={styles.space}></div>
				<a href="https://github.com/alyssaxuu/ecosnap" target="_blank" className={styles.item}><span>About this app</span> <img src="enter.svg"/></a>
				<a href="https://github.com/alyssaxuu/ecosnap#credit" target="_blank" className={styles.item}><span>Acknowledgements</span> <img src="enter.svg"/></a>
				<div className={styles.space}></div>
				<a href="https://londonrecycles.co.uk" target="_blank" className={styles.item}><span>London Recycles</span> <img src="enter.svg"/></a>
				<a href="https://recyclenow.com" target="_blank" className={styles.item}><span>Recycle Now</span> <img src="enter.svg"/></a>
				<div className={styles.space}></div>
				<a href="mailto:hi@alyssax.com" target="_blank" className={styles.item}><span>Contact us</span> <img src="enter.svg"/></a>
				<div className={styles.credit}>Made by <a href="https://www.linkedin.com/in/leonorfurtado" target="_blank">Leo</a> & <a href="https://twitter.com/alyssaxuu" target="_blank">Alyssa X</a></div>
			</div>
		</div>
	)
}

export default Settings;