import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  let name, email, message

  const contentType = request.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    const jsonData = await request.json()
    ;({ name, email, message } = jsonData)
  } else if (
    contentType?.includes('multipart/form-data') ||
    contentType?.includes('application/x-www-form-urlencoded')
  ) {
    const formData = await request.formData()
    name = formData.get('name')
    email = formData.get('email')
    message = formData.get('message')
  } else {
    return new Response(
      JSON.stringify({ message: 'Unsupported content type' }),
      { status: 415 }
    )
  }

  // Validate the data
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ message: 'Missing required fields' }),
      { status: 400 }
    )
  }

  // Process the data (replace with your actual logic)
  console.log({ name, email, message })

  return new Response(JSON.stringify({ message: 'Success!' }), { status: 200 })
}
