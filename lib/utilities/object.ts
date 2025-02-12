export function getPartial(
  object: Record<string, any>,
  key: string,
): any | undefined {
  for (const i in object) {
    if (
      object.hasOwnProperty(i) &&
      i.toLowerCase().includes(key.toLowerCase())
    ) {
      return object[i];
    }
  }
  return undefined;
}
