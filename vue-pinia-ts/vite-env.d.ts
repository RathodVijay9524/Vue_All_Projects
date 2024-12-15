interface ImportMetaEnv {
  readonly BASE_URL: string // Add your custom env variables here
  readonly VITE_API_URL: string // Example of a Vite env variable
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
