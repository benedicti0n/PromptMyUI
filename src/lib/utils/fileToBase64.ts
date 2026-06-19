export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

export function getMimeType(file: File): string {
  return file.type;
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  const maxSize = 8 * 1024 * 1024; // 8MB

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Please upload PNG, JPG, JPEG, or WEBP.",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: "File too large. Maximum size is 8MB.",
    };
  }

  return { valid: true };
}
