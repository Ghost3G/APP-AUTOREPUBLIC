declare module '@ioc:Adonis/Core/Auth' {
  export type AuthConfig = any;
  const Auth: any;
  export default Auth;
}

declare module 'App/Models/User' {
  const User: any;
  export default User;
}
