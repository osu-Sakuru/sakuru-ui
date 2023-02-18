/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly API_ENDPOINT: string
    // more env variables...
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}