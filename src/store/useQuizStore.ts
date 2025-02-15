import { quizSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { create } from "zustand";

export type QuizFormData = {
  question: string;
  options: {
    localId: number;
    id?: number;
    text: string;
    isCorrect: boolean;
  }[];
}

type QuizStore = {
  newForm: () => UseFormReturn<QuizFormData>;
  editForm: (initialData: QuizFormData) => UseFormReturn<QuizFormData>;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  newForm: () =>
    useForm<QuizFormData>({
      resolver: zodResolver(quizSchema),
      defaultValues: {
        question: "",
        options: [
          { localId: Date.now(), text: "", isCorrect: true },
          { localId: Date.now() + 1, text: "", isCorrect: false },
        ],
      },
    }),
  editForm: (initalData) =>
    useForm<QuizFormData>({
      resolver: zodResolver(quizSchema),
      defaultValues: initalData ?? {
        question: "",
        options: [],
      },
    }),
}));
