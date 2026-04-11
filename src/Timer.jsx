import { useEffect } from "react";


export default function Timer({ counter, setCounter }) {
  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter((prevState) => prevState - 1), 1000);
      if (counter > 60) {
        setCounter(60);
      }
    }
  }, [counter]);

  if (counter < 10) {
    return (
      <span style={{ color: "red" }}>
        0
        {counter >= 0 ? (Math.round(counter)).toFixed(1) : (counter = 0.0)}
      </span>
    );
  } else {
    return (
      <span style={{ color: "Gold" }}>
        {(Math.round(counter)).toFixed(1)}
      </span>
    );
  }
}
