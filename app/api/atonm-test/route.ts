import { NextResponse } from "next/server";
import { loadTreatments } from "./loadTreatments";
import { atonmReducer } from "../../atonm/atonmReducer";
import { narrow } from "../../atonm/narrow";


export async function POST(req: Request) {
  const { state, event } = await req.json();

  const nextState = atonmReducer(state, event);

  if (nextState.done) {
    const treatments = loadTreatments();
    const narrowed = narrow(treatments, nextState.answers);

    return NextResponse.json({
      done: true,
      result: narrowed.map(t => t.id),
    });
  }

  return NextResponse.json({ state: nextState });
}
