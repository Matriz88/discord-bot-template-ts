type EnvMap = {
  DISCORD_TOKEN: string;
  DISCORD_CLIENTID: string;
};

export function getEnv<K extends keyof EnvMap>(key: K): EnvMap[K] {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env var ${key}`);
  return v as EnvMap[K];
}
