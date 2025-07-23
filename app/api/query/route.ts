import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import   { GoogleGenerativeAI }  from "@google/generative-ai";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GOOGLE_API_KEY || "AIzaSyCm-_oseO2HwlI_RUiCFHVDHUGcEA_maK0";

  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const query = body.query;
    const url = process.env.PUBLIC_BASE_URL;
    console.log(url);
    const queryResponse = await axios.post(`${url}/api/query`, { query });

    const results = queryResponse.data.results; // <-- Corrected here
    if (!results) {
      return NextResponse.json({ error: "Insufficient context results" }, { status: 400 });
    }

   const prompt = `Context:
1. ${results[0].content}
2. ${results[1].content}
3. ${results[2].content}

Question:
${query}

Answer in plain text. Do not use bullet points, markdown, bold, or any special formatting. Provide a clear and concise explanation.
`;


    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ answer: responseText }, { status: 200 });

  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


