export function getComplementaryColor(hex: string | undefined) {
  if (!hex) return hex;
  // Remove the leading '#' if present
  hex = hex.replace("#", "");

  // Parse the R, G, B values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Get the complement by subtracting from 255
  const rComplement = (255 - r).toString(16).padStart(2, "0");
  const gComplement = (255 - g).toString(16).padStart(2, "0");
  const bComplement = (255 - b).toString(16).padStart(2, "0");

  // Combine to get the hex complement
  return `#${rComplement}${gComplement}${bComplement}`;
}
