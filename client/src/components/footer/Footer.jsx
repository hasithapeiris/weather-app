import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.leftSide}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              cursor: "pointer",
            }}
          >
            <img src="/logo.svg" alt="Weatherly" style={{ width: 30 }} />
            <span style={{ fontSize: 24, fontWeight: 700, color: "#404040" }}>
              Weatherly
            </span>
          </div>
        </div>
        <div className={styles.rightSide}>
          © 2024 Weatherly. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
