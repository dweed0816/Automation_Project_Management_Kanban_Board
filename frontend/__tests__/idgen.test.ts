import { describe, it, expect } from "vitest";
import { swimlaneId, kanbanCardId, indexToLetter } from "@/lib/idgen";

describe("indexToLetter", () => {
  it("converts 0 to A", () => {
    expect(indexToLetter(0)).toBe("A");
  });

  it("converts 1 to B", () => {
    expect(indexToLetter(1)).toBe("B");
  });

  it("converts 25 to Z", () => {
    expect(indexToLetter(25)).toBe("Z");
  });

  it("converts 26 to AA", () => {
    expect(indexToLetter(26)).toBe("AA");
  });
});

describe("swimlaneId", () => {
  it("generates first swimlane ID with letter A", () => {
    expect(swimlaneId("CUST01", "PROJ01", 0)).toBe("CUST01-PROJ01-A");
  });

  it("generates second swimlane ID with letter B", () => {
    expect(swimlaneId("CUST01", "PROJ01", 1)).toBe("CUST01-PROJ01-B");
  });

  it("generates third swimlane ID with letter C", () => {
    expect(swimlaneId("CUST01", "PROJ01", 2)).toBe("CUST01-PROJ01-C");
  });

  it("uses the correct IIDC and IIDP", () => {
    expect(swimlaneId("CUST02", "PROJ03", 0)).toBe("CUST02-PROJ03-A");
  });
});

describe("kanbanCardId", () => {
  it("generates first card ID with number 1", () => {
    expect(kanbanCardId("CUST01-PROJ01-A", 1)).toBe("CUST01-PROJ01-A-1");
  });

  it("generates second card ID with number 2", () => {
    expect(kanbanCardId("CUST01-PROJ01-A", 2)).toBe("CUST01-PROJ01-A-2");
  });

  it("generates third card ID with number 3", () => {
    expect(kanbanCardId("CUST01-PROJ01-A", 3)).toBe("CUST01-PROJ01-A-3");
  });

  it("never reuses numbers — counter only increments", () => {
    const id4 = kanbanCardId("CUST01-PROJ01-B", 4);
    expect(id4).toBe("CUST01-PROJ01-B-4");
  });
});
