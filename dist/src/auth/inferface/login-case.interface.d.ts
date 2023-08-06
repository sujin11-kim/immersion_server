export interface LoginInterface {
    getTokenByCase(email: string, password: string, loginType: any, token: string): any;
}
