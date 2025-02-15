export function getPartial(
  object: Record<string, any>,
  key: string,
  fallbackIdx?: number,
): any {
  for (const i in object) {
    if (
      object.hasOwnProperty(i) &&
      i.toLowerCase().includes(key.toLowerCase())
    ) {
      return object[i];
    }
  }
  return object[String(fallbackIdx)];
}
