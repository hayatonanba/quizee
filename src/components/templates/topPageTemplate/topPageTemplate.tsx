import { signIn } from "@/auth";
import { Button } from "@/components/atoms/Button";
import SiteTitle from "@/components/organisms/SiteTitle/SiteTitle";

export default function TopPageTemplate() {
  return (
    <div className="grid h-screen place-content-center">
      <div className="container mx-auto px-5">
        <div className="mb-[160px]">
          <div className="mb-[15px]">
            <SiteTitle />
          </div>
          <div className="text-center">
            <form className="mb-8" action={async () => {
              "use server"
              await signIn("google", { redirectTo: "/home" })
            }}>
              <Button type="submit" size="md">
                ログイン
              </Button>
            </form>
          </div>
          <p className="text-sm">
            ログイン後、本サイトの
            <a target="_blank"
              rel="noreferrer"
              href="https://flawless-blue-360.notion.site/20b1bdc7ca9080be81f7eee5769d4bd4" className="border-black border-b">規約とポリシー</a>
            に同意したものとみなされます。
          </p>
        </div>
      </div>
    </div>
  );
}
