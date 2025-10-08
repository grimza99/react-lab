const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      return tag(props, ...children);
    }
    const el = {
      tag,
      props,
      children,
    };
    return el;
  },
};
export default React;
