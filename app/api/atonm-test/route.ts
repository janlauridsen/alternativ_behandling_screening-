import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  return NextResponse.json({
    reply:
      "ATONM-test stub.\n\nInput modtaget:\n" +
      message +
      "\n\n(ATONM-runtime kobles på senere)",
  });
}
