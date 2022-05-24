const useDebounce = (fn, ms) => {
  let timeout = null;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(args), ms);
  };
};

export { useDebounce };
