export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public mobileNo: string,
    public email: string,
    public enable: boolean,
    private _token: string,
    private tokenExpirationDate: Date
  ) { }

  get token() {
    if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
      return null;
    }
    return this._token;
  }

  get tokenDuration() {
    if (!this.token) {
      return 0;
    }
    // return 5000 ;
    return this.tokenExpirationDate.getTime() - new Date().getTime();
  }

}
