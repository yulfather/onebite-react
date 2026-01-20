import { useRef, useState } from "react";

function App() {
  let normal = 0;
  const ref = useRef(0);
  const [, setRender] = useState(0);

  const click = () => {
    normal++;
    ref.current++;
    setRender((prev) => prev + 1);
    console.log(normal, ref.current);
  };

  return (
    <button onClick={click}>
      눌러 {normal} vs {ref.current}
    </button>
  );
}

export default App;
