"use client"

import Form from '@components/Form'
import React, { useState } from 'react'

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState({
    text: '',
    tag: ''
  })


  return (
    <Form type="Create" prompt={prompt} handlePrompt={setPrompt} submitting={submitting} handleSubmiting={setSubmitting}/>
  )
}

export default CreatePrompt