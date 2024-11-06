if (
  !process.env.POSTGRES_DB ||
  !process.env.POSTGRES_USER ||
  !process.env.POSTGRES_PASSWORD ||
  !process.env.POSTGRES_HOST
) {
  throw new Error("Missing required environment variables");
}

export const dbConfig = {
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  dialect: "postgres",
};
