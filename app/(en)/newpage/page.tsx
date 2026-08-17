import { redirect } from "next/navigation";

/* /newpage was the pre-launch preview of what is now the homepage.
   Keep the URL working by sending it to /. */
export default function NewPageRedirect() {
  redirect("/");
}
