import { useCallback } from "react";

const debounce = function (func, wait) {
  let reserveInvoke = null;

  return function (...agrs) {
    clearTimeout(reserveInvoke);
    reserveInvoke = setTimeout(func.bind(this, ...agrs), wait);
  }
}

function useDebounce(callback, delay) {
  return debounce(useCallback(callback, []), delay);
}

export default useDebounce;
