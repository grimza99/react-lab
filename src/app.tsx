import React from "./core/react.js";
import { useState } from "./hooks/useState.js";


/** 리소스 캐시 */
const resourceCache = {};
/** 사진 URL 생성기 */
const photoURL = (seed) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/200`;

const createResource = (asyncTask, key, fallback) => {
  if (resourceCache[key]) return resourceCache[key];
  const promise = asyncTask();
  throw { promise, key, fallback };
};
const getMyAwesomePic = (seed) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(photoURL(seed)), 1500);
  });
};

const Suspense = (props, children) => {
  const { fallback, key, task } = props;
  createResource(task, key, fallback);
  return children;
};
/** 어플리케이션 */
export const App = () => {
  const [name, setName] = useState("react");
  const [count, setCount] = useState(0);
  const photo1 = resourceCache["photo1"];
  const photo2 = resourceCache["photo2"];

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
      <h2>저희 사진 앨범</h2>
      <Suspense
        fallback={<h2>사진1 로딩중...</h2>}
        task={() => getMyAwesomePic("photo1")}
        key={"photo1"}
      >
        <img src={photo1} alt="사진1" />
      </Suspense>
      <Suspense
        fallback={<h2>사진2 로딩중...</h2>}
        task={() => getMyAwesomePic("photo2")}
        key={"photo2"}
      >
        <img src={photo2} alt="사진2" />
      </Suspense>
    </div>
  );
};
