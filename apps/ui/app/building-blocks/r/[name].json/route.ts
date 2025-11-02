import { promises as fs } from "node:fs"
import path from "node:path"

import { NextRequest, NextResponse } from "next/server"

const registryRoot = path.join(process.cwd(), "public", "building-blocks")

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<Record<string, unknown>> }
) {
  const resolvedParams = await params
  const name = typeof resolvedParams.name === "string" ? resolvedParams.name : undefined

  if (!name) {
    return NextResponse.json({ error: "Missing component name" }, { status: 400 })
  }

  const filePath = path.join(registryRoot, `${name}.json`)

  try {
    const file = await fs.readFile(filePath, "utf8")
    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return NextResponse.json({ error: "Component not found" }, { status: 404 })
    }

    console.error(`Failed to read registry file for ${name}:`, error)
    return NextResponse.json({ error: "Unable to load component" }, { status: 500 })
  }
}
