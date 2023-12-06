export default function textBackgroundContrast(rgba) {
  // Parse the RGBA values
  const [r, g, b] = rgba.split(" ").map(parseFloat);

  // Calculate the relative luminance using the formula for sRGB
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Check contrast ratio against a predefined threshold (e.g., 4.5)
  const threshold = 0.4; // This can be adjusted as needed

  // Decide text color based on luminance
  return luminance > threshold ? "#000" : "#FFF";
}
