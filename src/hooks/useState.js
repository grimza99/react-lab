import { reRender } from "../core/rerender.js";

/** 상태 관리용 배열 */
const myAppState = [];
/** 상태 관리용 배열 커서 */
let myAppStateCursor = 0;

export const useState = (initialState) => {
  const stateCursor = myAppStateCursor;
  myAppState[stateCursor] = myAppState[stateCursor] || initialState;

  const setState = (newState) => {
    myAppState[stateCursor] = newState;
    myAppStateCursor = 0;
    reRender();
  };
  myAppStateCursor++;
  return [myAppState[stateCursor], setState];
};
