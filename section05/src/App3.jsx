import "./App.css";
import { useState } from "react";

const Bulb = ({ light }) => {
  console.log(light);
  return (
    <div>
      {light === "on" ? (
        <h1 style={{ backgroundColor: "yellow" }}>on</h1>
      ) : (
        <h1 style={{ backgroundColor: "black", color: "white" }}>off</h1>
      )}
    </div>
  );
};

const Lighter = () => {
  const [light, setLight] = useState("off");
  return (
    <div>
      <Bulb light={light} />
      <button
        onClick={() => {
          setLight(light === "off" ? "on" : "off");
        }}
      >
        전원을 {light === "off" ? "on" : "off"}하려면 눌러
      </button>
    </div>
  );
};

const Couter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        눌+러
      </button>
    </div>
  );
};

const App3 = () => {
  return (
    <>
      <Lighter />
      <Couter />
    </>
  );
};

export default App3;
