import ky from "ky";
import { getCookie } from "cookies-next";

export const http = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        if (typeof window === "undefined") {
          const headersModule = await import("next/headers");
          const cookieStore = await headersModule.cookies();
          const token = cookieStore.get("token")?.value;
          if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
          }
        } else {
          const token = getCookie("token");
          if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
          }
        }
      },
    ],
  },
});
