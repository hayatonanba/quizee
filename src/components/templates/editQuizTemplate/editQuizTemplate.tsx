
"use client"

import { QuizBuilder } from "@/components/organisms/QuizBuilder";
import QuizBuildHeader from "@/components/organisms/QuizBuilderHeader/QuizBuildHeader";
import { hono } from "@/lib/hono/client";
import { type QuizFormData, useQuizStore } from "@/store/useQuizStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Choice = {
  localId: number;
  id: number;
  text: string,
  isCorrect: boolean
}

export default function EditQuizTemplate({ id, question, choices, isPublic }: { id: number, question: string, choices: Choice[], isPublic: boolean }) {

  const router = useRouter()
  const Form = useQuizStore().useEditForm({
    question: question,
    choices: choices
  })
  const { handleSubmit,
    formState: { isSubmitting }
  } = Form;
  const [ispublished, setIsPublished] = useState(isPublic)
  const handleToggle = () => {
    const newChecked = !ispublished;
    setIsPublished(newChecked);
  };

  const onSubmit = async (data: QuizFormData) => {

    const sanitizedChoices = data.choices.map(({ localId, ...rest }) => rest);

    try {
      const res = await hono.api.quzzies[":quizId"].$put({
        param: {
          quizId: String(id)
        },
        json: {
          question: data.question,
          choices: sanitizedChoices,
          isPublic: ispublished,
        }
      })

      if (res.ok) {
        router.push("/home");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to submit blog:", error);
    }
  }


  return (
    <div className="min-h-[calc(100vh-60px)]">
      <div className="mb-[50px]">
        <QuizBuildHeader
          isSubmmitting={isSubmitting}
          onClickFn={handleSubmit(onSubmit)}
          isChecked={ispublished}
          handleToggle={handleToggle}
        />
      </div>
      <div className="mx-auto max-w-[700px] px-3">
        <QuizBuilder Form={Form} />
      </div>
    </div>
  );
}
