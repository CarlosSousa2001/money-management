import { http } from "@/lib/http";


export async function downloadReport() {
    const blob = await http.get('report/generate', {
    }).blob();

    const url = URL.createObjectURL(blob);
    return url;
}