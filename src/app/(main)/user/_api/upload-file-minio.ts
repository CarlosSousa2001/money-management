export async function uploadEasyupload(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:9002/files/upload", {
    method: "POST",
    body: formData,
  });

  return await response.json();
}
