import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/api-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const code = body?.code?.trim()?.toUpperCase();

  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "Please enter an invite code" }, { status: 400 });
  }

  const admin = getSupabaseAdmin();

  const { data: league, error: findError } = await admin
    .from("leagues")
    .select("id, name")
    .eq("code", code)
    .maybeSingle();

  if (findError || !league) {
    return NextResponse.json({ error: "No league found with that code" }, { status: 404 });
  }

  const { data: existing } = await admin
    .from("league_members")
    .select("league_id")
    .eq("league_id", league.id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: "You've already joined this league" }, { status: 409 });
  }

  const displayName = user.email?.split("@")[0] ?? "Unknown";

  const { error: joinError } = await admin
    .from("league_members")
    .insert({ league_id: league.id, user_id: user.id, display_name: displayName });

  if (joinError) {
    return NextResponse.json({ error: "Failed to join league" }, { status: 500 });
  }

  return NextResponse.json({ league: { id: league.id, name: league.name } });
}
