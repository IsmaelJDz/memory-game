import { FC, useEffect } from "react";
import { HiX } from "react-icons/hi";

import { Portal } from "@/components/ui/Portal";

import styles from "./Modal.module.css";

type Size = "xs" | "md" | "lg" | "xl" | "none" | "pictures";

export type ModalProps = {
  show: boolean;
  timer?: number;
  onClose?: () => void;
  size?: Size;
  escClose?: boolean;
  children: React.ReactNode | React.ReactNode[];
};
export const Modal: FC<ModalProps> = ({
  children,
  show,
  timer,
  onClose = () => {},
  size = "xs",
  escClose = true,
}) => {
  const handleClickEsc = (event: { keyCode: number }) => {
    if (event.keyCode === 27 && escClose) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleClickEsc);
    return () => {
      document.removeEventListener("keydown", handleClickEsc);
    };
  }, []);

  useEffect(() => {
    if (show && timer) {
      setTimeout(function () {
        onClose();
      }, timer);
    }

    if (show) {
      window.document.body.style.overflow = "hidden";
      return;
    }

    window.document.body.style.overflow = "auto";
  }, [show]);

  if (!show) return null;

  return (
    <Portal>
      <div className={styles.modalWrapper}>
        <div className={size === "md" ? styles.md : styles.xs}>
          <div className={styles.modalContainer}>
            <button onClick={onClose} className={styles.modalClose}>
              <HiX className={styles.modalIcon} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};
