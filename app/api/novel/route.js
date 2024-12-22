// http://localhost:3000/api/novel

import { connect } from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/jwt";
import Novel from "@/models/Novel";

export async function POST(req) {
  await connect();

  const accessToken = req.headers.get("authorization");

  const token = accessToken.split(" ")[1];
  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ error: "Unauthorized (Wrong Or Expired)" }),
      {
        status: 403,
      }
    );
  }

  try {
    const body = await req.json();
    const newnovel = await Novel.create(body);
    return NextResponse.json(newnovel, { status: 201 });
  } catch (error) {
    console.error("Error creating novel:", error);
    return NextResponse.json({ message: "POST error (create blog)" });
  }
}

// Get Api


export async function GET(req) {
  await connect();

  try {
    const novels = await Novel.find({})
    .populate({
      path: "authorId",
      select: "-password",

    })
    .sort({
      createdAt: -1
    });
    return NextResponse.json(novels);
  } catch (error) {
    return NextResponse.json(
      {message: "GET error"},
    {
      status:500,
    }
    )
  }
}
