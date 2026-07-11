import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "@heroicons/react/outline";
import useEscapeKey from "../../hooks/useEscapeKey";

interface FortunaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  maxWidth?: string;
  children: ReactNode;
}

export const FortunaModal = ({ isOpen, onClose, title, maxWidth = "420px", children }: FortunaModalProps) => {
  useEscapeKey(onClose, isOpen);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="fortuna-card flex w-full max-h-[85vh] flex-col p-[clamp(28px,6vw,40px)]"
        style={{ maxWidth }}
      >
        <div className="flex shrink-0 items-center justify-between">
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

        <div className="mt-6 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body
  );
};
