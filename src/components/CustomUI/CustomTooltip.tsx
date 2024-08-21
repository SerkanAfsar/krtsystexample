import { cn } from "@/utils";
import { useState } from "react";

export default function CustomToolTip({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <div className="relative block h-full w-full cursor-pointer  ">
      <div
        onClick={(e) => setIsActive(true)}
        onMouseLeave={(e) => setIsActive(false)}
        className="z-1 block  h-full w-full rounded-md  font-medium underline"
      >
        {text}
      </div>
      <div
        className={cn(
          "absolute bottom-[30px] left-1/4 z-0 block -translate-x-1/2 whitespace-nowrap rounded bg-black px-4.5 py-1.5 text-sm font-medium text-white opacity-100",
          isActive ? "block" : "hidden",
        )}
      >
        <span className="absolute bottom-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black"></span>
        {children}
      </div>
    </div>
  );
}
