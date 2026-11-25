/**
 * Turns an uploaded cover into a small data URL (max 1280 wide, WebP) so it can be kept in
 * localStorage and survives reloads. Prototype only: a real app would upload the file.
 * Falls back to an object URL (lost on reload) if the browser can't decode or encode it.
 */
const MAX_WIDTH = 1280;

export async function coverToDataUrl(file: File): Promise<string> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_WIDTH / bitmap.width);
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const url = canvas.toDataURL('image/webp', 0.82);
    return url.startsWith('data:image/webp') ? url : canvas.toDataURL('image/jpeg', 0.85);
  } catch {
    return URL.createObjectURL(file);
  }
}
