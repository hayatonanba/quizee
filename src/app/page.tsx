import { auth } from "@/auth";
import TopPageTemplate from "@/components/templates/topPageTemplate/topPageTemplate";
import { redirect } from "next/navigation";

export default async function Page() {

  const session = await auth()

  if(session){
    redirect("/home")
  }

  return (
    <TopPageTemplate />
  );
}
