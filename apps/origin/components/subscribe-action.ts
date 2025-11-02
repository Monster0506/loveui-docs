"use server"

import { z } from "zod"

type EmailOctopusError = {
  code?: string
  detail?: string
  title?: string
}

const subscribeSchema = z.object({
  email: z.email("Please enter a valid email address"),
})

type SubscribeResult = { success: true } | { success: false; error: string }

export async function subscribe(email: string): Promise<SubscribeResult> {
  // Check environment variables and return error instead of throwing
  if (!process.env.EMAIL_OCTOPUS_API_KEY) {
    console.error("Missing EMAIL_OCTOPUS_API_KEY environment variable")
    return {
      success: false,
      error: "Service configuration error. Please try again later.",
    }
  }

  if (!process.env.EMAIL_OCTOPUS_LIST_ID) {
    console.error("Missing EMAIL_OCTOPUS_LIST_ID environment variable")
    return {
      success: false,
      error: "Service configuration error. Please try again later.",
    }
  }

  const result = subscribeSchema.safeParse({ email: email.trim() })
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || "Invalid email format.",
    }
  }

  try {
    console.log("Attempting to subscribe email:", result.data.email)

    const response = await fetch(
      `https://api.emailoctopus.com/lists/${process.env.EMAIL_OCTOPUS_LIST_ID}/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.EMAIL_OCTOPUS_API_KEY}`,
        },
        body: JSON.stringify({
          email_address: result.data.email,
          status: "subscribed",
          fields: {},
          tags: [],
        }),
      }
    )

    const data = (await response.json()) as EmailOctopusError

    // Always log API errors for debugging
    if (!response.ok) {
      console.error("EmailOctopus API Error:", {
        status: response.status,
        statusText: response.statusText,
        data,
        email: result.data.email,
      })
    }

    if (!response.ok) {
      if (response.status === 429) {
        return {
          success: false,
          error: "Too many attempts. Please try again later.",
        }
      }

      // Provide more specific error messages based on status codes
      if (response.status === 400) {
        return {
          success: false,
          error: data.detail || data.title || "Invalid email address.",
        }
      }

      if (response.status === 401) {
        console.error("EmailOctopus API authentication failed")
        return {
          success: false,
          error: "Service configuration error. Please try again later.",
        }
      }

      return {
        success: false,
        error:
          data.detail || data.title || "Failed to subscribe. Please try again.",
      }
    }

    console.log("Successfully subscribed email:", result.data.email)
    return { success: true }
  } catch (error) {
    console.error("Unexpected error during subscription:", {
      error: error instanceof Error ? error.message : String(error),
      email: result.data.email,
      stack: error instanceof Error ? error.stack : undefined,
    })

    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    }
  }
}
