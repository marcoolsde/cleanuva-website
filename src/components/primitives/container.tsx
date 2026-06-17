import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  /** Constrain to the ~68ch reading measure for text blocks. */
  prose?: boolean;
}

export function Container({
  as: Tag = "div",
  prose = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1280px] px-5 md:px-8",
        prose && "measure",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
