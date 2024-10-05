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
function format(template: string, values: { [key: string]: string }): string {
  return template.replace(/{(\w+)}/g, (match, key) => values[key] || match);
}
