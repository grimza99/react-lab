/** 상태 관리용 배열 */
const myAppState = [];
/** 배열에 접근할 커서 */
let myAppStateCursor = 0;
/** 리소스 캐시 */
const resourceCache = {};
/** 사진 URL 생성기 */
const photoURL = (seed) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/200`;

const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      try {
        return tag(props, ...children);
      } catch ({ promise, key, fallback }) {
        promise.then((value) => {
          resourceCache[key] = value;
          reRender();
        });
        return fallback;
      }
    }
    const el = {
      tag,
      props,
      children,
    };
    return el;
  },
};

const render = function (el, container) {
  let domEl;
  // 1. el의 유형을 확인한다.

  if (typeof el === "string" || typeof el === "number") {
    // 문자열인 경우 텍스트 노드처럼 처리해야 함.
    domEl = document.createTextNode(String(el));
    container.appendChild(domEl); // 텍스트에 대한 자식이 없으므로 반환
    return;
  }
  // 2. 먼저 el에 해당하는 문서 노드를 만든다.
  domEl = document.createElement(el.tag);

  // 3. domEl에 props를 설정한다.
  let elProps = el.props ? Object.keys(el.props) : null;
  if (elProps && elProps.length > 0) {
    elProps.forEach(function (prop) {
      return (domEl[prop] = el.props[prop]);
    });
  }
  // 4. 자식을 만든다.
  if (el.children && el.children.length > 0) {
    // child가 렌더링되면 컨테이너는 여기서 생성한 domEl이 된다.
    el.children.forEach(function (node) {
      return render(node, domEl);
    });
  } // 4. DOM 노드를 컨테이너에 추가한다.
  container.appendChild(domEl);
};

const reRender = () => {
  const rootNode = document.getElementById("myapp");
  rootNode.innerHTML = "";
  myAppStateCursor = 0;

  render(<App />, rootNode);
};

const useState = (initialState) => {
  const stateCursor = myAppStateCursor;
  myAppState[stateCursor] = myAppState[stateCursor] || initialState;

  const setState = (newState) => {
    myAppState[stateCursor] = newState;
    reRender();
  };
  myAppStateCursor++;
  return [myAppState[stateCursor], setState];
};

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
const App = () => {
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
render(<App />, document.getElementById("myapp"));
