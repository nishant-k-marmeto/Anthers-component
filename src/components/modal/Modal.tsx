import React, { useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  showCloseButton = true,
  isFullscreen = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Base classes for different parts of the modal
  const overlayClasses = "fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]";
  const modalClasses = twMerge(
    "fixed inset-0 flex items-center justify-center overflow-y-auto z-99999",
    className
  );
  const contentClasses = twMerge(
    "relative w-full",
    isFullscreen ? "w-full h-full" : "rounded-3xl bg-white"
  );
  const closeButtonClasses = "absolute right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 sm:right-6 sm:top-6 sm:h-11 sm:w-11";

  const CloseIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div className={modalClasses}>
      {!isFullscreen && <div className={overlayClasses} onClick={onClose} />}
      <div ref={modalRef} className={contentClasses} onClick={(e) => e.stopPropagation()}>
        {showCloseButton && (
          <button onClick={onClose} className={closeButtonClasses}>
            <CloseIcon />
          </button>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal; 