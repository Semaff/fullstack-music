declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: "DEVELOPMENT" | "TEST";
      PORT: string;

      POSTGRES_DB: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: number;
      POSTGRES_USERNAME: string;
      POSTGRES_PASSWORD: string;

      SECRET_KEY: string;
    }
  }
}

export {};
