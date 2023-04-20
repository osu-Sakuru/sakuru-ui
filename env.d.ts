/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_STAGE: 'DEV' | 'PROD'

    readonly VITE_APP_TITLE: string
    readonly VITE_APP_DOMAIN: string

    readonly VITE_BACKEND_ENDPOINT: string
    readonly VITE_BANCHO_ENDPOINT: string
    readonly VITE_BANCHO_API: string

    readonly VITE_WEBSOCKET_ENDPOINT: string

    readonly VITE_RECAPTCHA_V3_SITE_KEY: string
    // more env variables...
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}