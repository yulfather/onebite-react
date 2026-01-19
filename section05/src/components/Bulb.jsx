import { useState } from "react";

const Bulb = () => {
  const [light, setLight] = useState("off");
  console.log(light);

  return (
    <div>
      {light === "on" ? (
        <h1 style={{ backgroundColor: "orange" }}>on</h1>
      ) : (
        <h1 style={{ backgroundColor: "gray" }}>off</h1>
      )}
      <button
        onClick={() => {
          setLight(light === "off" ? "on" : "off");
        }}
      >
        전원{light === "off" ? "on" : "off"}
      </button>
    </div>
  );
};

export default Bulb;
