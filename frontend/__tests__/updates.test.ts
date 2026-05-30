import { describe, it, expect } from "vitest";
import type { UpdateRecord } from "@/lib/types";

function sortUpdatesByTimestampDesc(updates: UpdateRecord[]): UpdateRecord[] {
  return [...updates].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

describe("updates sort newest-first", () => {
  it("sorts two records newest first", () => {
    const updates: UpdateRecord[] = [
      { id: "1", timestamp: "2025-01-01T10:00:00.000Z", text: "older" },
      { id: "2", timestamp: "2025-01-02T10:00:00.000Z", text: "newer" },
    ];
    const sorted = sortUpdatesByTimestampDesc(updates);
    expect(sorted[0].text).toBe("newer");
    expect(sorted[1].text).toBe("older");
  });

  it("keeps the most recent record at index 0 for three records", () => {
    const updates: UpdateRecord[] = [
      { id: "a", timestamp: "2024-06-15T08:00:00.000Z", text: "oldest" },
      { id: "b", timestamp: "2025-03-20T12:00:00.000Z", text: "newest" },
      { id: "c", timestamp: "2024-12-01T09:00:00.000Z", text: "middle" },
    ];
    const sorted = sortUpdatesByTimestampDesc(updates);
    expect(sorted[0].text).toBe("newest");
    expect(sorted[1].text).toBe("middle");
    expect(sorted[2].text).toBe("oldest");
  });

  it("does not mutate the original array", () => {
    const updates: UpdateRecord[] = [
      { id: "x", timestamp: "2025-01-01T00:00:00.000Z", text: "first" },
      { id: "y", timestamp: "2025-06-01T00:00:00.000Z", text: "second" },
    ];
    const originalFirst = updates[0].text;
    sortUpdatesByTimestampDesc(updates);
    expect(updates[0].text).toBe(originalFirst);
  });

  it("handles a single record without error", () => {
    const updates: UpdateRecord[] = [
      { id: "1", timestamp: "2025-01-01T00:00:00.000Z", text: "only" },
    ];
    const sorted = sortUpdatesByTimestampDesc(updates);
    expect(sorted).toHaveLength(1);
    expect(sorted[0].text).toBe("only");
  });

  it("handles an empty array", () => {
    const sorted = sortUpdatesByTimestampDesc([]);
    expect(sorted).toHaveLength(0);
  });
});
