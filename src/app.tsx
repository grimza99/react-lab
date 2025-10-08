import React from "./core/react.js";
import { useState } from "./hooks/useState.js";

/** 어플리케이션 */
export const App = () => {
  const [name, setName] = useState("react");
  const [count, setCount] = useState(0);
  return (
    <div draggable>
      <h2>Hello {name}!</h2>
      <p>I am a grimza99</p>
      <input
        type="text"
        value={name}
        onchange={(e) => setName(e.target.value)}
      />
      <h2> 카운터 값: {count}</h2>
      <button onclick={() => setCount(count + 1)}>+1</button>
      <button onclick={() => setCount(count - 1)}>-1</button>
    </div>
  );
};
