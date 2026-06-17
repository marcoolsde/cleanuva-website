/**
 * Deployment models (build-plan P5). Presented as business options, not infra
 * diagrams — chosen by data ownership and operational needs. Copy + bullet
 * points resolve from the Platform.Deployment.* messages namespace.
 */

export interface DeploymentModel {
  /** Message key under Platform.Deployment.models.* */
  key: string;
  icon: "Cloud" | "Server" | "Combine";
}

export const DEPLOYMENT_MODELS: DeploymentModel[] = [
  { key: "saas", icon: "Cloud" },
  { key: "private", icon: "Server" },
  { key: "hybrid", icon: "Combine" },
];
