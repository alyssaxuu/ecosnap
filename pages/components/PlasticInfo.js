import React from "react";
import styles from "./../../styles/PlasticInfo.module.css"

const PlasticInfo = () => {
	return (
		<div className={styles.recycleinfo}>
			<div className={styles.header}>
				How to recycle
			</div>
			<div className={styles.subheader}>
				From londonrecycles.co.uk
			</div>
			<div className={styles.steps}>
				<div className={styles.step}>
					<div className={styles.number}>
						1
					</div>
					<div className={styles.text}>
						Empty and rinse the container
					</div>
				</div>
				<div className={styles.step}>
					<div className={styles.number}>
						2
					</div>
					<div className={styles.text}>
						Leave labels, lids, and tops on
					</div>
				</div>
				<div className={styles.step}>
					<div className={styles.number}>
						3
					</div>
					<div className={styles.text}>
						Squash to save space
					</div>
				</div>
				<div className={styles.step}>
					<div className={styles.number}>
						3
					</div>
					<div className={styles.text}>
					Recycle with a clear recycling non-reusable sack or a black and green recycling communal wheeled bin
					</div>
				</div>
			</div>
			<div className={styles.header}>
				What can't be recycled?
			</div>
			<div className={styles.steps}>
				<div className={styles.step}>
					<div className={styles.cross}>
						<img src="cross.svg"/>
					</div>
					<div className={styles.text}>
						Plastic bottles containing chemicals (e.g. antifreeze)
					</div>
				</div>
				<div className={styles.step}>
					<div className={styles.cross}>
						<img src="cross.svg"/>
					</div>
					<div className={styles.text}>
						Make-up packaging (learn more)
					</div>
				</div>
				<div className={styles.step}>
					<div className={styles.cross}>
						<img src="cross.svg"/>
					</div>
					<div className={styles.text}>
						Plastic bags and film (learn more)
					</div>
				</div>
			</div>
			<div className={styles.buttons}>
				<div className={styles.more}>
					Learn more
				</div>
				<div className={styles.scan}>
					<img src="scanmore.svg"/>
					Scan more
				</div>
			</div>
		</div>
	)
}

export default PlasticInfo;