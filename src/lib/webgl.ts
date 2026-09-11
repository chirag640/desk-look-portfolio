export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function isLowPowerDevice(): boolean {
  if (typeof window === "undefined") return false;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const lowCores = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
  return isMobile || lowCores;
}
