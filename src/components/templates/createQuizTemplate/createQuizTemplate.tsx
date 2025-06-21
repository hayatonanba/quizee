"use client"

import { QuizBuilder } from "@/components/organisms/QuizBuilder";
import QuizBuildHeader from "@/components/organisms/QuizBuilderHeader/QuizBuildHeader";
import { hono } from "@/lib/hono/client";
import { type QuizFormData, useQuizStore } from "@/store/useQuizStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateQuizTemplate() {
  const router = useRouter()
  const Form = useQuizStore().newForm()
  const { handleSubmit } = Form;
  const [ispublished, setIsPublished] = useState(false)
  const handleToggle = () => {
    const newChecked = !ispublished;
    setIsPublished(newChecked);
  };

  const onSubmit = async (data: QuizFormData) => {

    const sanitizedChoices = data.choices.map(({ localId: _localId, ...rest }) => rest);

    try {
      const res = await hono.api.quzzies.$post({
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
      console.error("Failed to submit Quiz:", error);
    }
  }

  return (
    <div>
      <div className="mb-[50px]">
        <QuizBuildHeader
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
