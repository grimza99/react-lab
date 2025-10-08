import { reRender } from "./rerender.js";
import { resourceCache } from "./suspense.js";

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
export default React;
