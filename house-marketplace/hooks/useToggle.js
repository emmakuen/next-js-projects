import { useState } from "react";

const useToggle = (initialState) => {
  const [state, setState] = useState(Boolean(initialState));
  const toggle = () => {
    setState(!state);
  };

  return [state, toggle];
};

export default useToggle;
