import React from "react";
import cn from "classnames";
import styles from "./Code.module.sass";
import Loader from "../../../components/Loader";

const Code = () => {
  return (
    <div className={styles.code}>
      <div className={styles.body}>
        <div className={styles.info}>
          We just send you a verify code. Check your inbox to get them.
        </div>
       
          <div className={styles.field}>
            <input
              className={styles.input}
              name="newPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              required
            />

            
          </div>

          <div className={styles.field2}>
            

            <input
              className={styles.input}
              name="reenterPassword"
              type="password"
              autoComplete="reenter-password"
              placeholder="Re-enter Password"
              required
            />
          </div>
         
        
        <div className={styles.errorNote}>
          The code you entered is incorrect.
        </div>
        <button className={cn("button", styles.button)}>
          <Loader className={styles.loader} white />
          <span>Continue</span>
        </button>
        <div className={styles.note}>
          This site is protected by reCAPTCHA and the Google Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default Code;
