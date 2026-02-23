import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/api-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import stadiumsJson from "@/data/stadiums.json";
import type { LeagueStanding } from "@/lib/types";

const stadiumLeagueMap: Record<string, string> = {};
for (const s of stadiumsJson as { id: string; league: string }[]) {
  stadiumLeagueMap[s.id] = s.league;
}

function computeCounts(visited: Record<string, boolean>): Omit<LeagueStanding, "userId" | "displayName"> {
  const counts = { pl: 0, ch: 0, l1: 0, l2: 0 };
  for (const [id, v] of Object.entries(visited)) {
    if (!v) continue;
    const league = stadiumLeagueMap[id];
    if (league === "PL") counts.pl++;
    else if (league === "CH") counts.ch++;
    else if (league === "L1") counts.l1++;
    else if (league === "L2") counts.l2++;
  }
  return { ...counts, total: counts.pl + counts.ch + counts.l1 + counts.l2 };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: leagueId } = await params;
  const admin = getSupabaseAdmin();

  const { data: membership } = await admin
    .from("league_members")
    .select("league_id")
    .eq("league_id", leagueId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!membership) {
    return NextResponse.json({ error: "League not found" }, { status: 404 });
  }

  const { data: league } = await admin
    .from("leagues")
    .select("id, name, code, created_by")
    .eq("id", leagueId)
    .single();

  if (!league) {
    return NextResponse.json({ error: "League not found" }, { status: 404 });
  }

  const { data: members } = await admin
    .from("league_members")
    .select("user_id, display_name")
    .eq("league_id", leagueId);

  if (!members || members.length === 0) {
    return NextResponse.json({
      league: { id: league.id, name: league.name, code: league.code, createdBy: league.created_by },
      standings: [],
    });
  }

  const memberIds = members.map((m) => m.user_id);

  const { data: progressRows } = await admin
    .from("user_progress")
    .select("id, visited")
    .in("id", memberIds);

  const progressMap: Record<string, Record<string, boolean>> = {};
  for (const row of progressRows ?? []) {
    progressMap[row.id] = (row.visited as Record<string, boolean>) ?? {};
  }

  const standings: LeagueStanding[] = members
    .map((m) => {
      const visited = progressMap[m.user_id] ?? {};
      const counts = computeCounts(visited);
      return { userId: m.user_id, displayName: m.display_name, ...counts };
    })
    .sort((a, b) => b.total - a.total || a.displayName.localeCompare(b.displayName));

  return NextResponse.json({
    league: { id: league.id, name: league.name, code: league.code, createdBy: league.created_by },
    standings,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: leagueId } = await params;
  const admin = getSupabaseAdmin();

  const { data: membership } = await admin
    .from("league_members")
    .select("league_id")
    .eq("league_id", leagueId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!membership) {
    return NextResponse.json({ error: "League not found" }, { status: 404 });
  }

  const { data: league } = await admin
    .from("leagues")
    .select("created_by")
    .eq("id", leagueId)
    .single();

  const isCreator = league?.created_by === user.id;
  const url = new URL(request.url);
  const destroy = url.searchParams.get("destroy") === "1";

  if (destroy && isCreator) {
    await admin.from("leagues").delete().eq("id", leagueId);
    return NextResponse.json({ success: true, deleted: true });
  }

  await admin
    .from("league_members")
    .delete()
    .eq("league_id", leagueId)
    .eq("user_id", user.id);

  const { count } = await admin
    .from("league_members")
    .select("*", { count: "exact", head: true })
    .eq("league_id", leagueId);

  if (count === 0) {
    await admin.from("leagues").delete().eq("id", leagueId);
  }

  return NextResponse.json({ success: true, deleted: false });
}
