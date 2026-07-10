/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IPFS_BUILD: string;
  readonly VITE_CLUSTER_URL: string;
  readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
