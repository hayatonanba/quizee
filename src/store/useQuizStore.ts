import { quizSchema } from "@/lib/schema";
import type { CreateChoice } from "@/server/models/choiceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { create } from "zustand";

export type QuizFormData = {
  question: string,
  choices: (CreateChoice & { localId: number })[]
}

export type EditQuizFormData = {
  question: string,
}

type QuizStore = {
  newForm: () => UseFormReturn<QuizFormData>;
  editForm: (initialData: QuizFormData) => UseFormReturn<QuizFormData>;
}

export const useQuizStore = create<QuizStore>(() => ({
  newForm: () =>
    useForm<QuizFormData>({
      resolver: zodResolver(quizSchema),
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: {
        question: "",
        choices: [
          { localId: Date.now(), text: "", isCorrect: true },
          { localId: Date.now() + 1, text: "", isCorrect: false },
        ],
      },
    }),
  editForm: (initalData) =>
    useForm<QuizFormData>({
      resolver: zodResolver(quizSchema),
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: initalData ?? {
        question: "",
        choices: [],
      },
    }),
}));
