export default function toRgba(value) {
  const rgbaArray = value.split(" ").map(parseFloat);

  // Destructure the array into separate red, green, blue, and alpha values
  const [red, green, blue, alpha] = rgbaArray;

  // Create a style object with the converted color values
  const rgba = `rgba(${Math.round(red * 255)}, ${Math.round(
    green * 255
  )}, ${Math.round(blue * 255)}, ${alpha})`;
  return rgba;
}
