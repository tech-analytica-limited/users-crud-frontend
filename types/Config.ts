export interface Config {
  apiUrl: string;

  makeApiUrl: (path: string, base?: string) => string; // updated for multiple url support
}

// const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://192.168.68.107:3005";

// development api url
const apiUrl = "http://localhost:3001";

const config: Config = {
  apiUrl,
  makeApiUrl: (path: string, base: string = apiUrl) => {
    return base + path;
  },
};

export default config;
