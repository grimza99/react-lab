/** 리소스 캐시 */
export const resourceCache = {};

const createResource = (asyncTask, key, fallback) => {
  if (resourceCache[key]) return resourceCache[key];
  const promise = asyncTask();
  throw { promise, key, fallback };
};

export const Suspense = (props, children) => {
  const { fallback, key, task } = props;
  createResource(task, key, fallback);
  return children;
};
