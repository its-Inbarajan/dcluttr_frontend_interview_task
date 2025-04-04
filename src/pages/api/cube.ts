// pages/api/cube.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    const cubeResponse = await fetch(process.env.CUBE_API_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CUBE_API_TOKEN as string}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await cubeResponse.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Cube.js proxy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
