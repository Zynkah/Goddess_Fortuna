import useGoddessQuestionStore, { FortunaMode } from "../../stores/useGoddessQuestionStore";
import {
  FORTUNA_PILL_BUTTON_ACTIVE_CLASS,
  FORTUNA_PILL_BUTTON_CLASS,
  FORTUNA_PILL_BUTTON_INACTIVE_CLASS,
} from "../../styles/buttonStyles";

const MODES: { id: FortunaMode; title: string }[] = [
  { id: "coin", title: "The Coin" },
  { id: "wheel", title: "The Wheel" },
  { id: "oracle", title: "The Oracle" },
];

export const ModeSelectButtons = () => {
  const { mode, setMode } = useGoddessQuestionStore();

  return (
    <div className="mx-auto mt-4 flex max-w-[360px] gap-2">
      {MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          aria-pressed={mode === m.id}
          onClick={() => setMode(m.id)}
          className={`${FORTUNA_PILL_BUTTON_CLASS} flex-1 py-2.5 ${
            mode === m.id ? FORTUNA_PILL_BUTTON_ACTIVE_CLASS : FORTUNA_PILL_BUTTON_INACTIVE_CLASS
          }`}
        >
          {m.title.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
