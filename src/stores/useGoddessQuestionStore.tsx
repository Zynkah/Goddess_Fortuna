import create, { State } from "zustand";

interface GoddessQuestionStore extends State {
  question: string;
  setQuestion: (question: string) => void;
}

const useGoddessQuestionStore = create<GoddessQuestionStore>((set, _get) => ({
  question: "",
  setQuestion: (question) =>
    set({
      question,
    }),
}));

export default useGoddessQuestionStore;
