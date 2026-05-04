import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type AnimatedLogoProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function AnimatedLogo({
  size = 14,
  className,
  ...props
}: AnimatedLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("ctey-logo-motion", className)}
      aria-hidden="true"
      {...props}
    >
      <path
        className="ctey-logo-line ctey-logo-line-left"
        pathLength="1"
        d="m2 16 4-4-4-4"
      />
      <path
        className="ctey-logo-line ctey-logo-line-center"
        pathLength="1"
        d="M10 16h4"
      />
      <path
        className="ctey-logo-line ctey-logo-line-right"
        pathLength="1"
        d="m18 16 4-4-4-4"
      />
    </svg>
  );
}
