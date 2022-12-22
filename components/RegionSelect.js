import React, { useEffect, useState } from "react";
import styles from "./../styles/RegionSelect.module.css";

const RegionSelect = (props) => {
	const [option, setOption] = useState(props.region);

	const handleContinue = () => {
		props.handleRegion(option);
	}

	return (
		<div className={styles.regionselect}>
			<div className={styles.title}>Select your region</div>
			<div className={styles.subtitle}>We’ll give you recycling advice tailored to your location. We currently only support the UK.</div>
			<div className={styles.options}>
				<div className={option === 1 ? styles.optioncheck : styles.option} onClick={() => setOption(1)}>
					<div className={styles.info}>
					<img src={option === 1 ? "checked.svg" : "unchecked.svg"}/>
						<div className={styles.name}>💂‍♂ London</div>
						<div className={styles.desc}>Specific plastic recycling advice</div>
					</div>
				</div>
				<div className={option === 2 ? styles.optioncheck : styles.option} onClick={() => setOption(2)}>
				<div className={styles.info}>
						<img src={option === 2 ? "checked.svg" : "unchecked.svg"}/>
						<div className={styles.name}>🇬🇧 United Kingdom</div>
						<div className={styles.desc}>General advice</div>
					</div>
				</div>
			</div>
			<div className={option === 0 ? styles.disabled : styles.button} onClick={() => handleContinue()}>Continue</div>
		</div>
	)
}

export default RegionSelect;