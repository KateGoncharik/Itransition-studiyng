export const convertFileToBase64 = async (
  filePath: string,
): Promise<string> => {
  const response = await fetch(filePath);
  const blob = await response.blob();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("File could not be read."));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
