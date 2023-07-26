///////////////////////////////////////
///////////////////////////////////////

import { CouponModel } from "./CouponModels";

export class CompanyModel {
  public id?: number;
  public name?: string;
  public email?: string;
  public password?: string;
  public coupons?: CouponModel[];        
  
  public constructor(
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    coupons?: CouponModel[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.coupons = coupons;
  }
}

///////////////////////////////////////
///////////////////////////////////////