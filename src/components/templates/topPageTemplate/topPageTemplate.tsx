import SiteTitle from "@/components/organisms/SiteTitle/SiteTitle";
import LoginButton from "@/components/others/LoginButton";

export default function TopPageTemplate() {

  return (
    <div className="grid min-h-[calc(100vh-60px)] place-content-center">
      <div className="container mx-auto px-5">
        <div className="mb-[100px]">
          <div className="mb-[15px]">
            <SiteTitle />
          </div>
          <div className="mb-8 text-center">
            <LoginButton />
          </div>
          <p className="text-sm">
            ログイン前に、本サイトの
            <a target="_blank"
              rel="noreferrer"
              href="https://flawless-blue-360.notion.site/20b1bdc7ca9080be81f7eee5769d4bd4" className="border-black border-b">規約とポリシー</a>
            を必ずお読みください
          </p>
        </div>
      </div>
    </div>
  );
}
