// http://localhost:3000/api/novel


import { connect } from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/jwt";
import Novel from "@/models/Novel";

export async function POST(req) {
  await connect();

  const accessToken = req.headers.get("authorization");
  const token = accessToken.split(" ")[1];
  const decodeToken = verifyJwtToken(token);

  if (!accessToken || !decodeToken) {
    return new Response(
      JSON.stringify({ error: "unauthorized (wrong or expired token)" }),
      {status: 403}
    );
  }

  try {
    const body = await req.json();
    const newnovel = await Novel.create(body);
    return NextResponse.json(newnovel, {status: 201})
  } catch (error) {
    return NextResponse.json({message: "POST error(create blog)"})
  }
}