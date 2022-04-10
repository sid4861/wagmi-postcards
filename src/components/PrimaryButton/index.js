import React from 'react'
import styles from "./primary-button.module.css";

function PrimaryButton({ text, clickHandler }) {
    return (
        <button onClick={clickHandler} className={styles.btn} >
            {text}
        </button>
    )
}

export default PrimaryButton