import { quizSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { create } from "zustand";

export type QuizFormData = {
  question: string;
  options: {
    id: number;
    text: string;
    isCorrect: boolean;
  }[];
}

type QuizStore = {
  newForm: () => UseFormReturn<QuizFormData>;
  editForm: () => UseFormReturn<QuizFormData>;
  setEditForm: (data: QuizFormData) => void;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  newForm: () =>
    useForm<QuizFormData>({
      resolver: zodResolver(quizSchema),
      defaultValues: {
        question: "",
        options: [
          { id: Date.now(), text: "", isCorrect: true },
          { id: Date.now() + 1, text: "", isCorrect: false },
        ],
      },
    }),
  editForm: () =>
    useForm<QuizFormData>({
      resolver: zodResolver(quizSchema),
      defaultValues: {
        question: "",
        options: [],
      },
    }),
  setEditForm: (data: QuizFormData) => {
    const form = get().editForm(); 
    form.reset(data);
  },
}));
