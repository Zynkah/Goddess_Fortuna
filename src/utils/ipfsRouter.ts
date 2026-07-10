// IPFS Router Utility
// Handles client-side routing for IPFS deployments using hash-based routing

// Check if we're running on IPFS at runtime or built for IPFS
export const checkIsIPFS = () => {
  if (import.meta.env.VITE_IPFS_BUILD === "true") return true;

  if (typeof window === "undefined") return false;

  return (
    window.location.hostname.endsWith(".ipfs.dweb.link") ||
    window.location.hostname.endsWith(".ipfs.cf-ipfs.com") ||
    window.location.pathname.startsWith("/ipfs/") ||
    window.location.hostname === "ipfs.io"
  );
};

export const isIPFS = checkIsIPFS();

export const getIPFSBasePath = () => {
  if (typeof window === "undefined") return "";

  const pathname = window.location.pathname;
  // Extract IPFS hash from URLs like /ipfs/Qm.../
  const ipfsMatch = pathname.match(/^(\/ipfs\/[^\/]+)/);
  return ipfsMatch ? ipfsMatch[1] : "";
};

export const navigateIPFS = (path: string) => {
  if (typeof window === "undefined") return;

  if (isIPFS) {
    const basePath = getIPFSBasePath();
    const fullPath = path === "/" ? basePath + "/" : basePath + path + "/";
    window.history.pushState(null, "", fullPath);

    // Trigger a custom event to notify components of navigation
    window.dispatchEvent(
      new CustomEvent("ipfs-navigate", { detail: { path } })
    );
  } else {
    // Standard browser routing
    window.history.pushState(null, "", path);
  }
};

export const getCurrentIPFSPath = () => {
  if (typeof window === "undefined") return "/";

  const pathname = window.location.pathname;

  if (isIPFS) {
    const basePath = getIPFSBasePath();

    if (basePath && pathname.startsWith(basePath)) {
      let relativePath = pathname.substring(basePath.length);
      // Remove leading slash if present
      relativePath = relativePath.startsWith("/")
        ? relativePath.substring(1)
        : relativePath;
      // If empty or just a slash, return '/'
      if (!relativePath || relativePath === "/") return "/";
      // Ensure it starts with slash for routing
      return "/" + relativePath.replace(/\/$/, ""); // Remove trailing slash
    }

    // If we can't parse the IPFS path, default to home
    return "/";
  }

  return pathname;
};
