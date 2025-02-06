import { signIn } from "@/auth";
import { Button } from "@/components/atoms/Button";
import SiteTitle from "@/components/organisms/SiteTitle/SiteTitle";

export default function TopPageTemplate() {
  return (
    <div className="grid h-screen place-content-center">
      <div className="mb-[160px]">
        <div className="mb-[15px]">
          <SiteTitle />
        </div>
        <div className="text-center">
          <form action={async () => {
            "use server"
            await signIn("google", { redirectTo: "/home" })
          }}>
            <Button type="submit" size="md">
              ログイン
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
