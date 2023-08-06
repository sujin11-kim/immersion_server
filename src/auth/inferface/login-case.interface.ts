export interface LoginInterface {
  getTokenByCase(email: string, password: string, loginType, token: string);
}
