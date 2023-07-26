import { CouponModel } from "../Models/CouponModels";

// Step 1 - Create global "AppState" (~tasks collection)
export class CouponsAppState {
    public coupons: CouponModel[] = [];
}

// Step 2 - Define all possible "ActionType"s for our "AppState"
export enum CouponsActionType {
    CouponsDownloaded = "CouponsDownloaded",
    CouponAdded = "CouponAdded",
    CouponUpdated = "CouponUpdated",
    CouponDeleted = "CouponDeleted",
    CouponsClear = "CouponsClear",
}

// Step 3 - Define "Action" interface to describe "ActionType" & "payload" (if needed)
export interface CouponsAction {
    type: CouponsActionType;
    payload?: any;
}

// Step 4 - Export "Action Creators" functions - each gets "payload" (if needed) and returns relevant "Action"
export function couponsDownloadedAction(coupons: CouponModel[]): CouponsAction {
    return { type: CouponsActionType.CouponsDownloaded, payload: coupons };
}

export function couponAddedAction(coupon: CouponModel): CouponsAction {
    return { type: CouponsActionType.CouponAdded, payload: coupon };
}

export function couponUpdatedAction(coupon: CouponModel): CouponsAction {
    return { type: CouponsActionType.CouponUpdated, payload: coupon };
}

export function couponDeletedAction(id: number): CouponsAction {
    return { type: CouponsActionType.CouponDeleted, payload: id };
}

export function couponsClearAction(): CouponsAction {
    return { type: CouponsActionType.CouponsClear };
}

// Step 5 - "Reducer" function performs the required action
export function couponsReducer(currentState: CouponsAppState = new CouponsAppState(), action: CouponsAction): CouponsAppState {

    const newState = { ...currentState } //Spread Operator

    switch (action.type) {
        case CouponsActionType.CouponsDownloaded:
            newState.coupons = action.payload;
            break;
        case CouponsActionType.CouponAdded:
            newState.coupons.push(action.payload);
            break;
        case CouponsActionType.CouponUpdated:
            const idx = newState.coupons.findIndex(c => c.id === action.payload.id);
            newState.coupons[idx] = action.payload;
            break;
        case CouponsActionType.CouponDeleted:
            newState.coupons = newState.coupons.filter(c => c.id !== action.payload);
            break;
        case CouponsActionType.CouponsClear:
            newState.coupons = [];
            break;
    }
    return newState;
}