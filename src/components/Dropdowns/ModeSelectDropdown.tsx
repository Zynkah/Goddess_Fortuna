import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import useGoddessQuestionStore, { FortunaMode } from "../../stores/useGoddessQuestionStore";
import useEscapeKey from "../../hooks/useEscapeKey";

const MODES: { id: FortunaMode; title: string; description: string }[] = [
  { id: "coin", title: "The Coin", description: "A simple yes or no" },
  { id: "wheel", title: "The Wheel", description: "Fortune in eight faces" },
  { id: "oracle", title: "The Oracle", description: "A cryptic word of counsel" },
];

export const ModeSelectDropdown = () => {
  const { mode, setMode } = useGoddessQuestionStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = MODES.find((m) => m.id === mode) ?? MODES[0];

  useEscapeKey(() => setIsOpen(false), isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative mx-auto mt-4 max-w-[360px]">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex w-full items-center gap-3 border px-3 py-2.5 text-left transition-colors duration-150 ${
          isOpen ? "border-fortuna-gold bg-[rgba(201,162,39,0.08)]" : "border-[rgba(201,162,39,0.3)] hover:border-fortuna-gold-dim"
        }`}
      >
        <div className="flex-1">
          <div className="font-cinzel text-xs tracking-[1px] text-fortuna-gold-light">
            {selected.title.toUpperCase()}
          </div>
          <div className="text-[11px] text-fortuna-gold-dim">{selected.description}</div>
        </div>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-fortuna-gold-dim transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-2 border border-[rgba(201,162,39,0.28)] bg-[#0d0a06] shadow-2xl"
        >
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              role="option"
              aria-selected={mode === m.id}
              onClick={() => {
                setMode(m.id);
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors duration-150 ${
                mode === m.id ? "bg-[rgba(201,162,39,0.1)]" : "hover:bg-[rgba(201,162,39,0.06)]"
              }`}
            >
              <div>
                <div className="font-cinzel text-xs tracking-[1px] text-fortuna-gold-light">
                  {m.title.toUpperCase()}
                </div>
                <div className="text-[11px] text-fortuna-gold-dim">{m.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
