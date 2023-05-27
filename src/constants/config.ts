type Mode = "auto" | "development" | "production";

export const CONFIG = {
  MODE: process.env.NEXT_PUBLIC_MODE as Mode,
};
