import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { checkIsIPFS, getCurrentIPFSPath } from "../utils/ipfsRouter";

// Dynamic view loader component
const ViewLoader: FC<{ viewName: string }> = ({ viewName }) => {
  const [ViewComponent, setViewComponent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadView = async () => {
      try {
        console.log(`Loading ${viewName}...`);

        // Use dynamic import for all builds (require not available in browser for IPFS)
        try {
          const viewsModule = await import("../views");
          const Component = (viewsModule as any)[viewName];
          if (Component) {
            const buildType = checkIsIPFS() ? "IPFS" : "regular";
            console.log(`${viewName} loaded successfully (${buildType} build)`);
            setViewComponent(() => Component);
          } else {
            throw new Error(`View ${viewName} not found`);
          }
        } catch (importError) {
          console.error("Dynamic import failed:", importError);
          throw new Error(`Failed to import view ${viewName}`);
        }
      } catch (err) {
        console.error(`Failed to load ${viewName}:`, err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadView();
  }, [viewName]);

  if (loading) {
    console.log(`${viewName} loading component rendered`);
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading {viewName}</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!ViewComponent) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">View Not Found</h1>
          <p>{viewName} could not be loaded</p>
        </div>
      </div>
    );
  }

  return <ViewComponent />;
};

interface IPFSRouterProps {
  children?: React.ReactNode;
}

export const IPFSRouter: FC<IPFSRouterProps> = ({ children }) => {
  const location = useLocation();
  const isIPFSMode = checkIsIPFS();
  const [currentPath, setCurrentPath] = useState(
    isIPFSMode ? getCurrentIPFSPath() : location.pathname + location.search
  );

  // Debug logging
  useEffect(() => {
    console.log("IPFSRouter Debug:", {
      isIPFSMode,
      currentPath,
      hostname:
        typeof window !== "undefined" ? window.location.hostname : "undefined",
      pathname:
        typeof window !== "undefined" ? window.location.pathname : "undefined",
      locationPath: location.pathname + location.search,
    });
  }, [currentPath, location.pathname, location.search, isIPFSMode]);

  useEffect(() => {
    // Listen for IPFS navigation events
    const handleIPFSNavigate = (e: CustomEvent) => {
      setCurrentPath(e.detail.path);
    };

    // Listen for browser back/forward
    const handlePopState = () => {
      if (isIPFSMode) {
        setCurrentPath(getCurrentIPFSPath());
      }
    };

    if (isIPFSMode) {
      window.addEventListener(
        "ipfs-navigate",
        handleIPFSNavigate as EventListener
      );
      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener(
          "ipfs-navigate",
          handleIPFSNavigate as EventListener
        );
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [isIPFSMode]);

  useEffect(() => {
    if (!isIPFSMode) {
      setCurrentPath(location.pathname + location.search);
    }
  }, [location.pathname, location.search, isIPFSMode]);

  // If not IPFS, render children as normal
  if (!isIPFSMode) {
    return <>{children}</>;
  }

  // IPFS routing logic
  const renderPage = () => {
    // Remove trailing slash and get clean path
    const path = currentPath.replace(/\/$/, "") || "/";

    console.log("IPFSRouter renderPage:", { path, currentPath, isIPFSMode });

    switch (path) {
      case "/fortune":
        console.log("Rendering FortuneView");
        return <ViewLoader viewName="FortuneView" />;
      case "/":
      default:
        console.log("Rendering default FortuneView");
        return <ViewLoader viewName="FortuneView" />;
    }
  };

  if (!isIPFSMode) {
    console.log("Not IPFS, rendering children");
    return <>{children}</>;
  }

  console.log("IPFS mode, rendering page");

  try {
    return <>{renderPage()}</>;
  } catch (error) {
    console.error("IPFSRouter render error:", error);
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p>
            If this persists, there may be an issue with the IPFS deployment.
          </p>
        </div>
      </div>
    );
  }
};
