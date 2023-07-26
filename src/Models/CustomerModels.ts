///////////////////////////////////////
///////////////////////////////////////

import { CouponModel } from "./CouponModels";

export class CustomerModel {
  public id?: number;
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public password?: string;
  public coupons?: CouponModel[];

  public constructor(
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    coupons?: CouponModel[]
  ) {
    this.id = id;
    this.firstName = firstName;
    this.firstName = lastName;
    this.email = email;
    this.password = password;
    this.coupons = coupons;
  }
}

///////////////////////////////////////
///////////////////////////////////////
