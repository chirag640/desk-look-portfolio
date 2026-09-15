/**
 * Asset path resolution helper.
 * Ensures static assets (3D models, wasm binaries, PDFs, images) resolve
 * correctly in both local development and subpath deployments (e.g. GitHub Pages /repo-name/).
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
