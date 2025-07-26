"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../ui/button";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function LogoutButton() {

  const [isLoading, setIsLoading] = useState(false)

  const logOut = async () => {
    try {
      setIsLoading(true)
      await signOut({ redirectTo: "/" })
    }catch{
      alert("エラーが起きたよ")
    }
  }

  return (
    <Button
      variant="ghost"
      type="submit"
      size="lg"
      className="flex w-full items-center gap-2"
      onClick={logOut}
      disabled={isLoading}
    >
      <FontAwesomeIcon icon={faSignOut} className="size-[20px]" />ログアウト
    </Button>
  );
}
