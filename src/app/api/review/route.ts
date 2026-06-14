import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("review_templates")
    .select("review_text");

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  const randomReview =
    data[Math.floor(Math.random() * data.length)];

  return NextResponse.json(randomReview);
}