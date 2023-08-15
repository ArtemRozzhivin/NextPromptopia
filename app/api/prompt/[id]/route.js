import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

// GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB()
    const prompt = await Prompt.findById(params.id).populate('creator')

    if(!prompt) return new Response(JSON.stringify(prompt), {statusText: 'Prompt not found!', status: 404})

    return new Response(JSON.stringify(prompt), {statusText: 'Prompt successfully loaded!', status: 200})
    
  } catch (error) {
    return new Response('Failed to fetch prompt', {status: 500})
  }
}

// PATCH
export const PATCH = async (req, { params }) => {
  try {
    await connectToDB()

    const prompt = await Prompt.findById(params.id)

    if(!prompt) return new Response(JSON.stringify(prompt), {statusText: 'Prompt not found!', status: 404})

    const { text, tag } = await req.json()
    prompt.text = text
    prompt.tag = tag

    await prompt.save()

    return new Response(JSON.stringify(prompt), {statusText: 'Prompt successfully changed!', status: 200})

  } catch (error) {
    return new Response('Failed to change prompt', {status: 500})
  }
}


// DELETE
export const DELETE = async (req, { params }) => {
  try {
    connectToDB()

    const prompt = await Prompt.findByIdAndDelete(params.id)

    return new Response(JSON.stringify(prompt), {statusText: 'Prompt successfully deleted!', status: 200})

  } catch (error) {
    return new Response('Failed to delete prompt', {status: 500})
  }
}