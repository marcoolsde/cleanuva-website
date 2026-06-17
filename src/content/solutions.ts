/**
 * Solutions by role (build-plan homepage [07]). Self-segmentation tiles — each
 * opens with an outcome, not a feature. Titles + outcome lines resolve from the
 * Solutions.* messages namespace; icons are lucide names resolved in the section.
 */

export interface SolutionRole {
  /** Message key under Solutions.roles.* */
  key: string;
  href: string;
  /** lucide-react icon name. */
  icon: "TrendingUp" | "Factory" | "FileSearch" | "HardHat" | "Wrench";
}

// Hrefs are anchors on the /solutions index (no detailed role pages in v1.1-C);
// shared by the homepage self-segmentation tiles and the footer. Ordered to lead
// with the Tier-1 personas (self-operated owners, independent O&M).
export const SOLUTION_ROLES: SolutionRole[] = [
  { key: "owners", href: "/solutions#owners", icon: "TrendingUp" },
  { key: "om", href: "/solutions#om", icon: "Wrench" },
  { key: "ipps", href: "/solutions#ipps", icon: "Factory" },
  { key: "epc", href: "/solutions#epc", icon: "HardHat" },
  { key: "auditor", href: "/solutions#auditor", icon: "FileSearch" },
];
