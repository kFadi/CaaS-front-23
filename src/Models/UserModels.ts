///////////////////////////////////////
///////////////////////////////////////

export class UserContactModel {
  public email?: string;
  public name?: string;
  public message?: string;

  public constructor(email?: string, name?: string, message?: string) {
    this.email = email;
    this.name = name;
    this.message = message;
  }
}

///////////////////////////////////////
///////////////////////////////////////

export enum ClientType {
    ADMIN = "ADMIN",
    COMPANY = "COMPANY",
    CUSTOMER = "CUSTOMER",
    NONE = "NONE"
}

//////////////////////////////////////

export class LoginReqModel {
  public type?: ClientType;
  public email?: string;
  public password?: string;

  public constructor(type?: ClientType, email?: string, password?: string) {
    this.type = type;
    this.email = email;
    this.password = password;
  }
}

export class LoginResModel {
  public token?: string;
  public type?: ClientType;
  public email?: string;
  //-----------------
  public id?: number;
  public name?: string;

  public constructor(token?: string, type?: ClientType, email?: string, id?: number, name?: string) {
    this.token = token;
    this.type = type;
    this.email = email;
    this.id = id;
    this.name = name;
  }
}

//////////////////////////////////////
