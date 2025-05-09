import type { ReactNode } from "react";

type Props = {
  children: ReactNode
}

export default function SettingText({children}: Props) {
    return (
        <div>
          {children}
        </div>
    );
}
