declare global {
    namespace NodeJS {
      interface ProcessEnv {
        [key: string]: string | undefined;
        PORT: string;
        DATABASE_URL: string;
        CONNECTION_URL: string;
        JWT_SECRET_KEY: string;
        // add more environment variables and their types here
      }
    }
  }