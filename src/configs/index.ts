import env from 'react-native-config';

const config = {
  BASE_URL: env.BASE_URL,
  PRODUCTION: env.PRODUCTION === 'true',
};

export default config;
