import create, { State } from "zustand";

export type FortunaMode = "coin" | "wheel" | "oracle";

interface GoddessQuestionStore extends State {
  question: string;
  setQuestion: (question: string) => void;
  mode: FortunaMode;
  setMode: (mode: FortunaMode) => void;
}

const useGoddessQuestionStore = create<GoddessQuestionStore>((set, _get) => ({
  question: "",
  setQuestion: (question) =>
    set({
      question,
    }),
  mode: "coin",
  setMode: (mode) =>
    set({
      mode,
    }),
}));

export default useGoddessQuestionStore;
