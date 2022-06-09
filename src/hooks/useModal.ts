import { useState } from "react";

const useModal = () => {
  const [show, setShow] = useState<boolean>(false);

  const close = () => {
    setShow(false);
  };

  const toggle = () => {
    setShow((prevState) => !prevState);
  };

  return { show, close, toggle };
};

export default useModal;
