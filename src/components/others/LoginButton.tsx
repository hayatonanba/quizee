"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginButton() {

  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signIn("google", { redirectTo: "/home" })
    } catch {
      alert("エラーが起きたよ")
    }
  }

  return (
    <Button
      onClick={signInWithGoogle}
      type="button"
      variant="outline"
      size="lg"
      disabled={isLoading}
      className="items-center gap-2 rounded-full"
    >
      {isLoading ?
        <Loader2 className="h-3 w-3 animate-spin" /> :
        <Image src="/google.svg" width={15} height={15} alt="googleのロゴ" />
      }
      Googleでログイン
    </Button>
  );
}
