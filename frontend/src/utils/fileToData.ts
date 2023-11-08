/**
 * Converts a file to base64 string
 *
 * @param file - File to convert to base64
 * @returns  - Promise that resolves to base64 string
 */

export default function fileToBase64 (file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.match(/image\/(jpeg|png)/)) {
      reject(new Error('Invalid file type. Only JPG and PNG files are allowed.'));
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = (error) => reject(error);
  });
}
