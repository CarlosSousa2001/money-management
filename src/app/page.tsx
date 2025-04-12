import { isAuthenticated } from "@/auth/auth"
import { redirect } from "next/navigation"

export default async function Page() {
  const authenticated = await isAuthenticated()

  // if (authenticated) {
  //   redirect("/home")
  // }

  return null
}
