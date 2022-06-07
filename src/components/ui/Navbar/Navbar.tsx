import { useContext } from "react";
import { UIContext } from "../../../context";

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <div>
      <h1>Navbar</h1>
    </div>
  );
};
