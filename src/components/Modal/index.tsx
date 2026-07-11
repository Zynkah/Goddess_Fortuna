import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "@heroicons/react/outline";

interface FortunaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  maxWidth?: string;
  children: ReactNode;
}

export const FortunaModal = ({ isOpen, onClose, title, maxWidth = "420px", children }: FortunaModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="fortuna-card w-full p-[clamp(28px,6vw,40px)]"
        style={{ maxWidth }}
      >
        <div className="flex items-center justify-between">
          <div className="font-cinzel text-xs uppercase tracking-[3px] text-fortuna-gold-light">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="text-fortuna-gold-faint transition-colors duration-150 hover:text-fortuna-gold-light"
          >
            <span className="sr-only">Close</span>
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6">{children}</div>
      </div>
    </div>,
    document.body
  );
};
