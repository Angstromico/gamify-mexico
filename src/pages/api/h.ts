// src/pages/api/fetchQuizData.ts or .js
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params, request }) => {
  const apiLink = import.meta.env.QUIZ_API
  try {
    const response = await fetch(apiLink)
    const data = await response.json()
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
