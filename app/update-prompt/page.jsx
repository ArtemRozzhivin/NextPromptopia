"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const router = useRouter();

  const [submitting, setIsSubmitting] = useState(false);
  const [prompt, setPrompt] = useState({ text: "", tag: "" });

  useEffect(() => {
    const fetchPromptById = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()

      setPrompt(data)
    }

    fetchPromptById()
  }, [])

  const editPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          text: prompt.text,
          tag: prompt.tag,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      prompt={prompt}
      setPrompt={setPrompt}
      submitting={submitting}
      handleSubmiting={editPrompt}
    />
  );
};

export default EditPrompt;