import styles from "../style/Popup.module.css";
export const Popup = ({ setShow, children, popupTopMargin }) => {
  return (
    <div
      className={styles.popup}
      onClick={() => {
        setShow();
      }}
      style={{ marginTop: popupTopMargin }}
    >
      {children}
    </div>
  );
};
