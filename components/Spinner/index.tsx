import styles from "./spinner.module.css";

export const Spinner: React.FC = () => {
  return (
    <div className={styles["lds-ellipsis"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export const LoadingPage: React.FC<{ text?: string }> = ({
  text = "Wait a bit, Tina is loading data...",
}) => (
  <div
    style={{
      position: "fixed",
      width: "100vw",
      height: "100vh",
      zIndex: 40,
      pointerEvents: "none",
      background: "rgba(255,255, 255, .85)",
    }}
  >
    <div
      style={{
        position: "fixed",
        top: "50%",
        bottom: "50%",
        textAlign: "center",
        width: "100vw",
        height: "100vh",
        zIndex: 50,
        color: "black",
      }}
    >
      {text}
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Spinner />
      </div>
    </div>
  </div>
);
