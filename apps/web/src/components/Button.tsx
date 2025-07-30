import { createSignal, type Component } from "solid-js";
import styles from "./Button.module.css";
const Button: Component<{}> = (props) => {
  const [count, setCount] = createSignal(0);
  return (
    <button
      class={styles.button}
      onClick={() => {
        setCount(count() + 1);
      }}
    >
      count: {count()}
    </button>
  );
};

export default Button;
