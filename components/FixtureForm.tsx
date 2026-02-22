"use client";

import { useState, useRef, useEffect } from "react";
import type { FixtureInfo } from "@/lib/types";
import { COMPETITIONS } from "@/lib/types";
import { allStadiums } from "@/lib/stadiums";

const allClubNames = allStadiums.map((s) => s.club).sort();

interface FixtureFormProps {
  stadiumClub: string;
  onSave: (fixture: FixtureInfo) => void;
  onCancel: () => void;
}

export default function FixtureForm({ stadiumClub, onSave, onCancel }: FixtureFormProps) {
  const [date, setDate] = useState("");
  const [homeTeam, setHomeTeam] = useState(stadiumClub);
  const [awayTeam, setAwayTeam] = useState("");
  const [competition, setCompetition] = useState<string>(COMPETITIONS[0]);
  const [customCompetition, setCustomCompetition] = useState("");
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [notes, setNotes] = useState("");

  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dateRef.current?.focus();
  }, []);

  const resolvedCompetition = competition === "Other" && customCompetition.trim()
    ? customCompetition.trim()
    : competition;
  const canSave = date && homeTeam.trim() && awayTeam.trim()
    && (competition !== "Other" || customCompetition.trim());

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSave) return;

    const fixture: FixtureInfo = {
      id: crypto.randomUUID(),
      date,
      homeTeam: homeTeam.trim(),
      awayTeam: awayTeam.trim(),
      competition: resolvedCompetition,
      ...(homeScore !== "" && { homeScore: Number(homeScore) }),
      ...(awayScore !== "" && { awayScore: Number(awayScore) }),
      ...(notes.trim() && { notes: notes.trim() }),
    };
    onSave(fixture);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p
        className="text-[10px] uppercase tracking-[0.18em] font-bold"
        style={{ color: "var(--gold)" }}
      >
        Match details
      </p>

      {/* Date */}
      <div>
        <label className="fixture-form-label" htmlFor="fixture-date">Date</label>
        <input
          ref={dateRef}
          id="fixture-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="fixture-form-input"
          required
        />
      </div>

      {/* Competition */}
      <div>
        <label className="fixture-form-label" htmlFor="fixture-comp">Competition</label>
        <select
          id="fixture-comp"
          value={competition}
          onChange={(e) => setCompetition(e.target.value)}
          className="fixture-form-input"
        >
          {COMPETITIONS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {competition === "Other" && (
          <input
            id="fixture-comp-custom"
            type="text"
            value={customCompetition}
            onChange={(e) => setCustomCompetition(e.target.value)}
            className="fixture-form-input mt-1.5"
            placeholder="Enter competition name..."
            maxLength={100}
            autoFocus
            required
          />
        )}
      </div>

      {/* Teams row */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-1.5 items-end">
        <div>
          <label className="fixture-form-label" htmlFor="fixture-home">Home</label>
          <input
            id="fixture-home"
            type="text"
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
            list="club-names"
            className="fixture-form-input"
            placeholder="Home team"
            required
          />
        </div>
        <span className="text-xs text-gray-500 font-bold pb-2.5">v</span>
        <div>
          <label className="fixture-form-label" htmlFor="fixture-away">Away</label>
          <input
            id="fixture-away"
            type="text"
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
            list="club-names"
            className="fixture-form-input"
            placeholder="Away team"
            required
          />
        </div>
      </div>

      {/* Score row (optional) */}
      <div>
        <label className="fixture-form-label">Score (optional)</label>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-1.5 items-center">
          <input
            type="number"
            min="0"
            max="99"
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value)}
            className="fixture-form-input text-center"
            placeholder="–"
          />
          <span className="text-xs text-gray-500 font-bold">–</span>
          <input
            type="number"
            min="0"
            max="99"
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
            className="fixture-form-input text-center"
            placeholder="–"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="fixture-form-label" htmlFor="fixture-notes">Notes (optional)</label>
        <input
          id="fixture-notes"
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="fixture-form-input"
          placeholder="e.g. First ever match, birthday trip..."
          maxLength={200}
        />
      </div>

      {/* Datalist for club autocomplete */}
      <datalist id="club-names">
        {allClubNames.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={!canSave}
          className="premium-button foil shine-sweep flex-1 text-center text-sm"
          style={{ minHeight: "2.2rem", opacity: canSave ? 1 : 0.5 }}
        >
          Save Match
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all
                     hover:brightness-110"
          style={{
            fontFamily: "var(--font-display), Impact, sans-serif",
            background: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          Skip
        </button>
      </div>
    </form>
  );
}
