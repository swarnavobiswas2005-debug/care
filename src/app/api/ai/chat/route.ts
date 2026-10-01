import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, context, selectedText } = await req.json();
    
    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const apiKey = process.env.AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server missing API key configuration." }, { status: 500 });
    }

    // Build the system instructions
    const systemInstruction = `You are CARE AI, a warm, helpful, calm, human, encouraging, and non-judgmental writing companion. 
You help users write romantic experiences (letters, apologies, proposals, birthdays, anniversaries) for their loved ones.
Do NOT use excessive emojis, repetitive "Of course!", overly enthusiastic language, generic motivation, or long explanations.
Be concise. Provide natural, heartfelt suggestions.
Context:
Experience Type: ${context?.type || 'unknown'}
Recipient Name: ${context?.recipient || 'Someone special'}
Sender Name: ${context?.sender || 'The user'}
Current Letter Draft: """${context?.message || ''}"""
${selectedText ? `The user has explicitly highlighted this text: """${selectedText}"""` : ''}`;

    // Call Gemini API directly via fetch
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [{
          role: "user",
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
        }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("AI API Error:", err);
      return NextResponse.json({ error: "AI generation failed." }, { status: 500 });
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble thinking of something right now.";

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error("AI Chat Route Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
