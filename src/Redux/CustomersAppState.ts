import { CustomerModel } from "../Models/CustomerModels";

// Step 1 - Create global "AppState" (~tasks collection)
export class CustomersAppState {
    public customers: CustomerModel[] = [];
}

// Step 2 - Define all possible "ActionType"s for our "AppState"
export enum CustomersActionType {
    CustomersDownloaded = "CustomersDownloaded",
    CustomerAdded = "CustomerAdded",
    CustomerUpdated = "CustomerUpdated",
    CustomerDeleted = "CustomerDeleted",
    CustomersClear = "CustomersClear"
}

// Step 3 - Define "Action" interface to describe "ActionType" & "payload" (if needed)
export interface CustomersAction {
    type: CustomersActionType;
    payload?: any;
}

// Step 4 - Export "Action Creators" functions - each gets "payload" (if needed) and returns relevant "Action"
export function customersDownloadedAction(customers: CustomerModel[]): CustomersAction {
    return { type: CustomersActionType.CustomersDownloaded, payload: customers };
}

export function customerAddedAction(customer: CustomerModel): CustomersAction {
    return { type: CustomersActionType.CustomerAdded, payload: customer };
}

export function customerUpdatedAction(customer: CustomerModel): CustomersAction {
    return { type: CustomersActionType.CustomerUpdated, payload: customer };
}

export function customerDeletedAction(id: number): CustomersAction {
    return { type: CustomersActionType.CustomerDeleted, payload: id };
}

export function customersClearAction(): CustomersAction {
    return { type: CustomersActionType.CustomersClear };
}


// Step 5 - "Reducer" function performs the required action
export function customersReducer(currentState: CustomersAppState = new CustomersAppState(), action: CustomersAction): CustomersAppState {

    const newState = { ...currentState } //Spread Operator

    switch (action.type) {
        case CustomersActionType.CustomersDownloaded:
            newState.customers = action.payload;
            break;
        case CustomersActionType.CustomerAdded:
            newState.customers.push(action.payload);
            break;
        case CustomersActionType.CustomerUpdated:
            const idx = newState.customers.findIndex(c => c.id === action.payload.id);
            newState.customers[idx] = action.payload;
            break;
        case CustomersActionType.CustomerDeleted:
            newState.customers = newState.customers.filter(c => c.id !== action.payload);
            break;
        case CustomersActionType.CustomersClear:
            newState.customers = [];
            break;
    }
    return newState;
}