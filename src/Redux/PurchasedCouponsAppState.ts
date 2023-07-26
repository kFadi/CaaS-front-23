import { CouponModel } from "../Models/CouponModels";

// Step 1 - Create global "AppState" (~tasks collection)
export class PurchasedCouponsAppState {
    public purchasedCoupons: CouponModel[] = [];
}

// Step 2 - Define all possible "ActionType"s for our "AppState"
export enum PurchasedCouponsActionType {
    PurchasedCouponsDownloaded = "PurchasedCouponsDownloaded",
    PurchasedCouponAdded = "PurchasedCouponAdded",
    PurchasedCouponsClear = "PurchasedCouponsClear",
}

// Step 3 - Define "Action" interface to describe "ActionType" & "payload" (if needed)
export interface PurchasedCouponsAction {
    type: PurchasedCouponsActionType;
    payload?: any;
}

// Step 4 - Export "Action Creators" functions - each gets "payload" (if needed) and returns relevant "Action"
export function purchasedCouponsDownloadedAction(purchasedCoupons: CouponModel[]): PurchasedCouponsAction {
    return { type: PurchasedCouponsActionType.PurchasedCouponsDownloaded, payload: purchasedCoupons };
}

export function purchasedCouponAddedAction(purchasedCoupon: CouponModel): PurchasedCouponsAction {
    return { type: PurchasedCouponsActionType.PurchasedCouponAdded, payload: purchasedCoupon };
}

export function purchasedCouponsClearAction(): PurchasedCouponsAction {
    return { type: PurchasedCouponsActionType.PurchasedCouponsClear };
}

// Step 5 - "Reducer" function performs the required action
export function purchasedCouponsReducer(currentState: PurchasedCouponsAppState = new PurchasedCouponsAppState(), action: PurchasedCouponsAction): PurchasedCouponsAppState {

    const newState = { ...currentState } //Spread Operator

    switch (action.type) {
        case PurchasedCouponsActionType.PurchasedCouponsDownloaded:
            newState.purchasedCoupons = action.payload;
            break;
        case PurchasedCouponsActionType.PurchasedCouponAdded:
            newState.purchasedCoupons.push(action.payload);
            break;
        case PurchasedCouponsActionType.PurchasedCouponsClear:
            newState.purchasedCoupons = [];
            break;
    }
    return newState;
}