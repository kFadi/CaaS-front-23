import { Notyf } from "notyf";

export enum SccMsg {
  
  MSG_SENT = "Message - Sent Successfully",
  /////////////////////////////////////
  USER_LOGGED_IN = "Successful Sign-in",
  USER_LOGGED_OUT = "Successful Sign-out",
  /////////////////////////////////////
  //------
  COUPONS_DOWNLOADED = "Coupons - Loaded Successfully",
  PURCHASED_COUPONS_DOWNLOADED = "Purchased Coupons - Loaded Successfully",
  //------
  COUPON_ADDED = "Coupon - Added Successfully",
  COUPON_UPDATED = "Coupon - Updated Successfully",
  COUPON_DELETED = "Coupon - Deleted Successfully",
  COUPON_PURCHASED = "Coupon - Purchased Successfully",
  /////////////////////////////////////
  COMPANIES_DOWNLOADED = "Companies - Loaded Successfully",
  COMPANY_ADDED = "Company - Added Successfully",
  COMPANY_UPDATED = "Company - Updated Successfully",
  COMPANY_DELETED = "Company - Deleted Successfully",
  /////////////////////////////////////
  CUSTOMERS_DOWNLOADED = "Customers - Loaded Successfully",
  CUSTOMER_DETAILS_DOWNLOADED = "Customer Details - Loaded Successfully",
  CUSTOMER_ADDED = "Customer - Added Successfully",
  CUSTOMER_UPDATED = "Customer - Updated Successfully",
  CUSTOMER_DELETED = "Customer - Deleted Successfully"
}

export enum ErrMsg {
  LOGIN_NEEDED = "Please Sign-in first..",  
  ALREADY_LOGGED_IN = "You are already Signed-in.. Sign-out before a new Sign-in..",
  ALREADY_LOGGED_OUT = "You have already been Signed-out..",
  NO_PERMISSION = "Operation Not Authorized!",
  INVALID_PARAM = "Invalid Parameter!"
}

class Notify {
  
  private notification = new Notyf({
    duration: 4000,
    position: { x: "left", y: "top" },
  });

  public success(message: SccMsg) {
    this.notification.success(message);
  }

  public error(err: any) {
    const msg = this.extractMsg(err);
    this.notification.error(msg);
  }

  private extractMsg(err: any): string {
    if (typeof err === "string") {
      return err;
    }

    if (typeof err?.response?.data.value === "string") {
      //Backend exact error  >>>>>>>>>>>>>>>>>>>>>>>>  CaaS custom  <<<<<<<<<<<<<<<<<<<<<<<<
      return err.response.data.value;
    }

    if (typeof err?.response?.data === "string") {
      //Backend exact error
      return err.response.data;
    }

    if (Array.isArray(err?.response?.data)) {
      // Backend exact error list
      return err?.response?.data[0];
    }

    // Must be last
    if (typeof err?.message === "string") {
      return err.message;
    }

    return "An Error Occurred, Please Try Again..";
  }
}
const notify = new Notify();
export default notify;
