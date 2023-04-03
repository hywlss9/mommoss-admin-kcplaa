const isTest = process.env.NODE_ENV !== 'production';

// stg: https://kcplaa-stg.mommoss.com
export const path = isTest
  ? {
      api: 'https://kcplaa-stg.mommoss.com',
    }
  : {
      api: 'https://kcplaa.mommoss.com',
    };
