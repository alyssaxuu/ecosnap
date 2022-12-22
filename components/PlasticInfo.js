import React, { useEffect, useState } from "react";
import styles from "./../styles/PlasticInfo.module.css"

const PlasticInfo = (props) => {
	const [info, setInfo] = useState({
		title:"How to recycle",
		subtitle:"From londonrecycles.co.uk",
		steps: [
			"Empty and rinse the container",
			"Leave labels, lids, and tops on",
			"Squash to save space",
			"Recycle with a clear recycling sack or a communal wheeled bin"
		],
		no: true,
		nolist: [
			"Plastic bottles containing chemicals (e.g. antifreeze)",
			"Make-up packaging",
			"Plastic bags and film"
		]
	});

	useEffect(() => {
		if (props.type === 1 || props.type === 2 || props.type === 5) {
			if (props.region === 1) {
				setInfo({
					title:"How to recycle",
					subtitle:"From londonrecycles.co.uk",
					steps: [
						"Empty and rinse the container",
						"Leave labels, lids, and tops on",
						"Squash to save space",
						"Recycle with a clear recycling sack or communal wheeled bin"
					],
					no: true,
					nolist: [
						"Plastic bottles containing chemicals (e.g. antifreeze)",
						"Make-up packaging",
						"Plastic bags and film"
					]
				})
			} else {
				setInfo({
					title:"How to recycle",
					subtitle:"From recyclenow.com",
					steps: [
						"Empty and rinse the container",
						"Leave labels, lids, and tops on",
						"Squash to save space",
						"Recycle according to your council’s guidance"
					],
					no: true,
					nolist: [
						"Plastic bottles containing chemicals (e.g. antifreeze)",
						"Make-up packaging",
						"Plastic bags and film"
					]
				})
			}
		} else if (props.type === 3) {
			if (props.region === 3) {
				setInfo({
					title:"What to do",
					subtitle:"From londonrecycles.co.uk",
					steps: [
						"Put smaller items, like medicine blister packs in the bin",
						"Larger things, like gutters can go to your local tip or reuse and recycling centre"
					],
					no: false,
					nolist: [
						
					]
				})
			} else {
				setInfo({
					title:"What to do",
					subtitle:"From recyclenow.com",
					steps: [
						"Put smaller items, like medicine blister packs in the bin",
						"Larger things, like gutters and window sills can go to your local tip or reuse and recycling centre"
					],
					no: false,
					nolist: [
						
					]
				})
			}
		}	else if (props.type === 4) {
			if (props.region === 1) {
				setInfo({
					title:"What to do",
					subtitle:"From londonrecycles.co.uk",
					steps: [
						"Check out TerraCycle for hard-to-recycle items",
						"Things like plastic bags, bread bags, films and frozen veg bags can be taken to supermarket plastic bag recycling points"
					],
					no: false,
					nolist: [
						
					]
				})
			} else {
				setInfo({
					title:"What to do",
					subtitle:"From recyclenow.com",
					steps: [
						"Check out TerraCycle for hard-to-recycle items",
						"Things like plastic bags, bread bags, films and frozen veg bags can be taken to supermarket plastic bag recycling points"
					],
					no: false,
					nolist: [
						
					]
				})
			}
		} else if (props.type === 6) {
			if (props.region === 6) {
				setInfo({
					title:"What to do",
					subtitle:"From londonrecycles.co.uk",
					steps: [
						"Polystyrene can’t be recycled and should go in your rubbish bin",
						"Avoid it if possible or try and reuse it"
					],
					no: false,
					nolist: [
						
					]
				})
			} else {
				setInfo({
					title:"What to do",
					subtitle:"From recyclenow.com",
					steps: [
						"Polystyrene can’t be recycled and should go in your rubbish bin",
						"Avoid it if possible or try and reuse it"
					],
					no: false,
					nolist: [
						
					]
				})
			}
		} else if (props.type === 7) {
			if (props.region === 7) {
				setInfo({
					title:"What to do",
					subtitle:"From londonrecycles.co.uk",
					steps: [
						"If you have things like DVDs and sunglasses you no longer need, donate them to a charity shop if they’re in good condition",
						"Check out TerraCycle for hard-to-recycle items."
					],
					no: false,
					nolist: [
						
					]
				})
			} else {
				setInfo({
					title:"What to do",
					subtitle:"From recyclenow.com",
					steps: [
						"If you have things like DVDs and sunglasses you no longer need, donate them to a charity shop if they’re in good condition",
						"Check out TerraCycle for hard-to-recycle items."
					],
					no: false,
					nolist: [
						
					]
				})
			}
		} else if (props.type === 8) {
			setInfo({
				title:"What to do",
				subtitle:"Resolve the issue",
				steps: [
					"Find the plastic resin code on your item. It should have a triangle shape with arrows and a number within",
					"Make sure to keep the code in the center of your picture and as focused as possible",
					"If your item does not have a resin code, search for your item in the Home page"
				],
				no: false,
				nolist: [
					
				]
			})
		}
	}, []); 
	return (
		<div className={styles.recycleinfo}>
			<div className={styles.header}>
				{info.title}
			</div>
			<div className={styles.subheader}>
				{info.subtitle}
			</div>
			<div className={styles.steps}>
				{info.steps.map((item, i) => 
					<div key={i} className={styles.step}>
						<div className={styles.number}>
							{i+1}
						</div>
						<div className={styles.text}>
							{item}
						</div>
				</div>
				)}
			</div>
			{info.no &&
			<div className={styles.last}>
				<div className={styles.header}>
					What can't be recycled? 
				</div>
				<div className={styles.subheader}>
				For more information search for your item in the Home page
				</div>
				<div className={styles.steps}>
					{info.nolist.map((item, i) => 
						<div key={i} className={styles.step}>
							<div className={styles.cross}>
							<img src="cross.svg"/>
							</div>
							<div className={styles.text}>
								{item}
							</div>
					</div>
					)}
				</div>
			</div>
			}
			<div className={styles.buttons}>
				{props.type === 8 ?
				<a href="mailto:hi@alyssax.com" target="_blank" className={styles.more}>
					Support
				</a>
				:
				<a href={props.region === 1 ? "https://londonrecycles.co.uk/recycling-101/seven-types-of-plastic/" : "https://www.recyclenow.com/recycling-locator"} target="_blank" className={styles.more}>
					Learn more
				</a>
				}
				<div className={styles.scan} onClick={() => props.handleReturn(true)}>
					<img src="scanmore.svg"/>
					Scan more
				</div>
			</div>
		</div>
	)
}

export default PlasticInfo;