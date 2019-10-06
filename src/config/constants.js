import dotenv from 'dotenv';

dotenv.config();

export const config = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'test': {
      return {
        PORT: process.env.TEST_PORT,
        DATABASE_URL: process.env.TEST_DATABASE_URL,
        SALT_ROUNDS: process.env.SALT_ROUNDS,
        SECRET: process.env.SECRET,
        EXPIRATION_DURATION: process.env.EXPIRATION_DURATION,
        HOST_URL: process.env.HOST_URL
      };
    }
    case 'production': {
      return {
        PORT: process.env.PROD_PORT,
        DATABASE_URL: process.env.PROD_DATABASE_URL,
        SALT_ROUNDS: process.env.SALT_ROUNDS,
        SECRET: process.env.SECRET,
        EXPIRATION_DURATION: process.env.EXPIRATION_DURATION,
        HOST_URL: process.env.HOST_URL
      };
    }
    default: {
      return {
        PORT: process.env.DEV_PORT,
        DATABASE_URL: process.env.DEV_DATABASE_URL,
        SALT_ROUNDS: process.env.SALT_ROUNDS,
        SECRET: process.env.SECRET,
        EXPIRATION_DURATION: process.env.EXPIRATION_DURATION,
        HOST_URL: process.env.HOST_URL
      };
    }
  }
};