import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Desktop from "../components/Desktop";

export default function Home() {
  const [region, setRegion] = useState(0);
  const [onboarding, setOnboarding] = useState(false);
  const [check, setCheck] = useState(false);
  const [num, setNum] = useState(0);
  const [tensor, setTensor] = useState("");
  const [pred, setPred] = useState(0);

  // Saved preferences
  useEffect(() => {
    if (typeof window !== "undefined") {
      //localStorage.removeItem("region");
      //localStorage.removeItem("onboarding");

      if (localStorage.getItem("region") != null) {
        setRegion(parseInt(localStorage.getItem("region")));
      }
      if (localStorage.getItem("onboarding") != null) {
        setOnboarding(localStorage.getItem("onboarding"));
      }
      if (localStorage.getItem("num") != null) {
        setNum(parseInt(localStorage.getItem("num")));
      }

      setCheck(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>
          EcoSnap - Recycle your plastic better with Artificial Intelligence
        </title>
        <meta
          name="title"
          content="EcoSnap - Recycle your plastic better with Artificial Intelligence"
        />
        <meta
          name="description"
          content="EcoSnap is an Artificial Intelligence powered app that helps you recycle your plastic effectively. It tells you what, how and where to recycle from a picture."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ecosnap.vercel.app/" />
        <meta
          property="og:title"
          content="EcoSnap - Recycle your plastic better with Artificial Intelligence"
        />
        <meta
          property="og:description"
          content="EcoSnap is an Artificial Intelligence powered app that helps you recycle your plastic effectively. It tells you what, how and where to recycle from a picture."
        />
        <meta
          property="og:image"
          content="https://ecosnap.vercel.app/meta.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ecosnap.vercel.app/" />
        <meta
          property="twitter:title"
          content="EcoSnap - Recycle your plastic better with Artificial Intelligence"
        />
        <meta
          property="twitter:description"
          content="EcoSnap is an Artificial Intelligence powered app that helps you recycle your plastic effectively. It tells you what, how and where to recycle from a picture."
        />
        <meta
          property="twitter:image"
          content="https://ecosnap.vercel.app/meta.png"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Manrope:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="initial-scale=1, viewport-fit=cover, minimal-ui"
        />
      </Head>

      <main className={styles.main}>
        <Desktop
          pred={pred}
          setPred={setPred}
          tensor={tensor}
          setTensor={setTensor}
          region={region}
          setNum={setNum}
          num={num}
          onboarding={onboarding}
          setRegion={setRegion}
          check={check}
        />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
