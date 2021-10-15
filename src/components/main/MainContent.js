import styles from "./MainContent.module.css";

const MainContent = (props) => {
  return <main className={styles.main}>{props.children}</main>;
};

export default MainContent;
