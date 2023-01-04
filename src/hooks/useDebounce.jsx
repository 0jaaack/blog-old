import { useCallback } from "react";

const debounce = function (func, wait) {
  let reserveInvoke = null;

  return function (event) {
    clearTimeout(reserveInvoke);
    reserveInvoke = setTimeout(func.bind(this, event), wait);
  }
}

function useDebounce(callback, delay) {
  return debounce(useCallback(callback, []), delay);
}

export default useDebounce;
