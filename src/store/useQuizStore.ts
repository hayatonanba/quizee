// src/store/useQuizStore.ts
import { quizSchema } from "@/lib/schema";
import type { CreateChoice } from "@/server/models/choiceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { create } from "zustand";

export type QuizFormData = {
  question: string;
  choices: (CreateChoice & { localId: number })[];
};

type QuizStore = {
  useNewForm: () => UseFormReturn<QuizFormData>;
  useEditForm: (initialData?: QuizFormData) => UseFormReturn<QuizFormData>;
};

export const useQuizStore = create<QuizStore>(() => ({
  // カスタム Hook 名は必ず use で始まる
  useNewForm: () =>
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

  useEditForm: (initialData) =>
    useForm<QuizFormData>({
      resolver: zodResolver(quizSchema),
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues:
        initialData ?? {
          question: "",
          choices: [],
        },
    }),
}));
