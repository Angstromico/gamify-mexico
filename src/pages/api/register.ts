import type { APIRoute } from 'astro'

const api = import.meta.env.API // Assuming this is your API endpoint

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type')

    let username, email, password, phone

    if (contentType?.includes('application/json')) {
      const jsonData = await request.json()
      ;({
        username,
        email,
        password,
        profile: { phone }, // Use optional destructuring for profile
      } = jsonData)
    } else if (
      contentType?.includes('multipart/form-data') ||
      contentType?.includes('application/x-www-form-urlencoded')
    ) {
      const formData = await request.formData()
      username = formData.get('username')
      email = formData.get('email')
      password = formData.get('password')
      phone = formData.get('phone')
    } else {
      return new Response(
        JSON.stringify({ message: 'Unsupported content type' }),
        { status: 415 }
      )
    }

    // Validate the data
    if (!username || !email || !password || !phone) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      )
    }

    // Log the data being sent for debugging purposes
    console.log('Sending data to API:', { username, email, password, phone })

    // Prepare the request to your external API
    const apiResponse = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        profile: { phone },
      }),
    })

    // Log the full API response for debugging
    console.log('API Response Status:', apiResponse.status)
    console.log('API Response Headers:', apiResponse.headers)

    // Check if the API returned non-JSON data
    const responseText = await apiResponse.text()

    // Log the raw response in case of error
    console.log('Raw API Response:', responseText)

    // Try parsing the response as JSON if content-type is correct
    let apiData
    try {
      apiData = JSON.parse(responseText)
    } catch (error) {
      console.error('Error parsing response as JSON:', error)
      return new Response(
        JSON.stringify({
          message: 'Invalid response from the API',
          details: responseText, // Send raw response back to user
        }),
        { status: 500 }
      )
    }

    // Log the parsed API data
    console.log('Parsed API Response JSON:', apiData)

    // Check for existing user
    if (apiResponse.status === 400 && apiData?.username) {
      // User already exists (specific handling based on response structure)
      return new Response(
        JSON.stringify({
          username: ['Ya existe un usuario con ese nombre.'],
        }),
        { status: 400 }
      )
    }

    // Handle specific 500 case where the user is already registered
    if (apiResponse.status === 500 && apiData?.username) {
      return new Response(
        JSON.stringify({
          username: ['Usuario Registrado.'],
        }),
        { status: 200 } // Return 200 as user already registered
      )
    }

    // Handle successful creation (status 201)
    if (apiResponse.ok) {
      return new Response(
        JSON.stringify({ message: 'User registered successfully!' }),
        { status: 201 }
      )
    }

    // If the response is a 500 error or another unexpected error
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    })
  } catch (error) {
    // Catch any other errors and log them
    console.error('Error while communicating with the API:', error)
    return new Response(
      JSON.stringify({
        message: 'Failed to register user',
        error: String(error),
      }),
      { status: 500 }
    )
  }
}
