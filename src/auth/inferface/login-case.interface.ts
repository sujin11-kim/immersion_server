export interface LoginInterface {
  getTokenByCase(email: string, password: string, loginType: string, token: string);
}
