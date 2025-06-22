import { auth } from "@/auth";
import CreateQuizTemplate from "@/components/templates/createQuizTemplate/createQuizTemplate";

export default async function Page() {

  const session = await auth()

  if (!session) {
    return <div>認証してください。</div>
  }

  return (
    <CreateQuizTemplate />
  );
}
