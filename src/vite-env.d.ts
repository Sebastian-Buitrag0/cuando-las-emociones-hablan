/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEEPSEEK_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent;
  export default component;
}
