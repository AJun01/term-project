"use server";

import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
 

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    const body: { messages: ChatCompletionMessageParam[] } = await request.json(); // <- use correct type here
    console.log("Incoming payload:", body);

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json({ error: "Invalid payload: 'messages' must be an array" }, { status: 400 });
    }

    const messages = body.messages;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const reply = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error in POST /api/ai-api:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
