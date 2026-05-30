export function swimlaneId(iidc: string, iidp: string, counter: number): string {
  const letter = indexToLetter(counter);
  return `${iidc}-${iidp}-${letter}`;
}

export function kanbanCardId(swimId: string, counter: number): string {
  return `${swimId}-${counter}`;
}

export function indexToLetter(index: number): string {
  let result = "";
  let n = index;
  do {
    result = String.fromCharCode(65 + (n % 26)) + result;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return result;
}

export function nextIidc(counter: number): string {
  return `CUST${String(counter).padStart(2, "0")}`;
}

export function nextIidp(counter: number): string {
  return `PROJ${String(counter).padStart(2, "0")}`;
}
