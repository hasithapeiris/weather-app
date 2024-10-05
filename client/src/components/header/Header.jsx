import React from "react";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.leftSide}>
          <a href="/">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                cursor: "pointer",
              }}
            >
              <img src="/logo.svg" alt="Weatherly" style={{ width: 30 }} />
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#404040",
                }}
              >
                Weatherly
              </span>
            </div>
          </a>
        </div>
        <div className={styles.rightSide}>Logout</div>
      </div>
    </div>
  );
};

export default Header;
