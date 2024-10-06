/*
 * format template string
 * functionality similar to python format function for strings
 *
 * Replaces words wrapped in {} based on the values param
 *
 * Example:
 * const template = "Hello, {user}! Welcome to {place}.";
 * const formattedString = format(template, { user: "Me", place: "TypeScript" });
 */
export function format(
  template: string,
  values: { [key: string]: string | undefined },
): string {
  return template.replace(/{(\w+)}/g, (_, key) => {
    const value = values[key];
    return typeof value === "string" ? value : "";
  });
}
