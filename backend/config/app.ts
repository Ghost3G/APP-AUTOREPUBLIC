const appConfig = {
  name: 'AUTO REPUBLIC MANAGER',
  appKey: process.env.APP_KEY || 'auto_republic_app_key',
  http: {
    cookie: {
      sameSite: 'lax',
    },
  },
};

export default appConfig;
