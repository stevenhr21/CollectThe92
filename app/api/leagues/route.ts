import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/api-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

async function generateUniqueCode(): Promise<string> {
  const admin = getSupabaseAdmin();
  for (let attempt = 0; attempt < 10; attempt++) {
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
    }
    const { data } = await admin
      .from("leagues")
      .select("id")
      .eq("code", code)
      .maybeSingle();
    if (!data) return code;
  }
  throw new Error("Failed to generate unique invite code");
}

export async function GET(request: Request) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = getSupabaseAdmin();

  const { data: memberships, error: memberError } = await admin
    .from("league_members")
    .select("league_id")
    .eq("user_id", user.id);

  if (memberError) {
    return NextResponse.json({ error: "Failed to load leagues" }, { status: 500 });
  }

  if (!memberships || memberships.length === 0) {
    return NextResponse.json({ leagues: [] });
  }

  const leagueIds = memberships.map((m) => m.league_id);

  const { data: leagues, error: leagueError } = await admin
    .from("leagues")
    .select("id, name, code, created_by")
    .in("id", leagueIds);

  if (leagueError) {
    return NextResponse.json({ error: "Failed to load leagues" }, { status: 500 });
  }

  const { data: counts } = await admin
    .from("league_members")
    .select("league_id")
    .in("league_id", leagueIds);

  const countMap: Record<string, number> = {};
  for (const row of counts ?? []) {
    countMap[row.league_id] = (countMap[row.league_id] ?? 0) + 1;
  }

  const result = (leagues ?? []).map((l) => ({
    id: l.id,
    name: l.name,
    code: l.code,
    memberCount: countMap[l.id] ?? 0,
    createdBy: l.created_by,
  }));

  return NextResponse.json({ leagues: result });
}

export async function POST(request: Request) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const name = body?.name?.trim();

  if (!name || typeof name !== "string" || name.length < 1 || name.length > 40) {
    return NextResponse.json(
      { error: "League name must be between 1 and 40 characters" },
      { status: 400 }
    );
  }

  const admin = getSupabaseAdmin();
  const code = await generateUniqueCode();
  const displayName = user.email?.split("@")[0] ?? "Unknown";

  const { data: league, error: insertError } = await admin
    .from("leagues")
    .insert({ name, code, created_by: user.id })
    .select("id, name, code")
    .single();

  if (insertError || !league) {
    return NextResponse.json({ error: "Failed to create league" }, { status: 500 });
  }

  const { error: memberError } = await admin
    .from("league_members")
    .insert({ league_id: league.id, user_id: user.id, display_name: displayName });

  if (memberError) {
    await admin.from("leagues").delete().eq("id", league.id);
    return NextResponse.json({ error: "Failed to create league" }, { status: 500 });
  }

  return NextResponse.json({ league });
}
