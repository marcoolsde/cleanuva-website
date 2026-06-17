import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation APIs. Use these instead of next/link & next/navigation
// so the active locale prefix is preserved across the app.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
