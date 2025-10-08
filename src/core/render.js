export const render = function (el, container) {
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
