import React, { useEffect, useState } from "react";
import styles from "./../../styles/Dashboard.module.css";
import HowTo from "./HowTo";

const Dashboard = (props) => {
	const [support, setSupport] = useState(true);

	const handleShare = () => {
		if (navigator.share) {
			navigator.share({
				url: "https://ecosnap.vercel.app",
				text: "Learn how to recycle plastic with Ecosnap",
				title: "Ecosnap"
			})
			.then(function() {
				console.log('Successful share');
			})
			.catch(function(error) {
				window.open("http://twitter.com/share?text=Check%20out%20EcoSnap%20to%20learn%20how%20to%20recycle%20plastics%20using%20AI&url=http://ecosnap.vercel.app", "_blank");
			});
		} else {
			window.open("http://twitter.com/share?text=Check%20out%20EcoSnap%20to%20learn%20how%20to%20recycle%20plastics%20using%20AI&url=http://ecosnap.vercel.app", "_blank");
		}
	}

	useEffect(() => {
		localStorage.removeItem("support")
		if (typeof window !== 'undefined') {
			if (localStorage.getItem("support") != null) {
				setSupport(false);
			}
		}
	}, []);

	const handleSupport = (e) => {
		e.stopPropagation();
		e.preventDefault();
  	e.nativeEvent.stopImmediatePropagation();
		setSupport(false);
		localStorage.setItem("support", false);
	}

	return (
		<div className={styles.dashboard}>
			{support &&
			<a href="https://github.com/alyssaxuu/ecosnap" target="_blank" className={styles.support}>
				<img src="closesupport.svg" className={styles.closesupport} onClick={handleSupport}/>
				<img src="support.svg" className={styles.supportimg}/>
				<div className={styles.supportinfo}>
					<div className={styles.supporttitle}>Support EcoSnap</div>
					<div className={styles.supportdesc}>We built this product in a week for Ben’s Bites AI Hackathon, we’d love your support!</div>
				</div>
			</a>
			}
			<div className={styles.nav}>
				<div className={styles.header}>Dashboard</div>
				<div className={styles.right}>
					<img src="settings.svg" onClick={() => props.setSettings(true)} className={styles.settings}/>
					 <img onClick={() => handleShare()} className={styles.help} src="share.svg"/>
				</div>
			</div>
			{props.num > 0 ?
			<div className={styles.callout} onClick={() => props.setView(true)}>
				<img src="decoration.svg"/>
				<div className={styles.pretitle}>You recycled</div>
				<div className={styles.title}>{props.num} plastic item{props.num > 1 && "s"}</div>
			</div>
			:
			<div className={styles.callout} onClick={() => props.setView(true)}>
				<img src="decoration.svg"/>
				<div className={styles.pretitle}>Start recycling</div>
				<div className={styles.title}>Scan a plastic item</div>
			</div>
			}
			<HowTo />
			<div className={styles.button} onClick={() => props.setView(true)}>
				<img src="scanmore.svg"/>
				Scan a plastic item
			</div>
		</div>
	)
}

export default Dashboard;