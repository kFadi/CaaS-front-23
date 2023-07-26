import { CompanyModel } from "../Models/CompanyModels";

// Step 1 - Create global "AppState" (~tasks collection)
export class CompaniesAppState {
    public companies: CompanyModel[] = [];
}

// Step 2 - Define all possible "ActionType"s for our "AppState"
export enum CompaniesActionType {
    CompaniesDownloaded = "CompaniesDownloaded",
    CompanyAdded = "CompanyAdded",
    CompanyUpdated = "CompanyUpdated",
    CompanyDeleted = "CompanyDeleted",
    CompaniesClear = "CompaniesClear"
}

// Step 3 - Define "Action" interface to describe "ActionType" & "payload" (if needed)
export interface CompaniesAction {
    type: CompaniesActionType;
    payload?: any;
}

// Step 4 - Export "Action Creators" functions - each gets "payload" (if needed) and returns relevant "Action"
export function companiesDownloadedAction(companies: CompanyModel[]): CompaniesAction {
    return { type: CompaniesActionType.CompaniesDownloaded, payload: companies };
}

export function companyAddedAction(company: CompanyModel): CompaniesAction {
    return { type: CompaniesActionType.CompanyAdded, payload: company };
}

export function companyUpdatedAction(company: CompanyModel): CompaniesAction {
    return { type: CompaniesActionType.CompanyUpdated, payload: company };
}

export function companyDeletedAction(id: number): CompaniesAction {
    return { type: CompaniesActionType.CompanyDeleted, payload: id };
}

export function companiesClearAction(): CompaniesAction {
    return { type: CompaniesActionType.CompaniesClear };
}


// Step 5 - "Reducer" function performs the required action
export function companiesReducer(currentState: CompaniesAppState = new CompaniesAppState(), action: CompaniesAction): CompaniesAppState {

    const newState = { ...currentState } //Spread Operator

    switch (action.type) {
        case CompaniesActionType.CompaniesDownloaded:
            newState.companies = action.payload;
            break;
        case CompaniesActionType.CompanyAdded:
            newState.companies.push(action.payload);
            break;
        case CompaniesActionType.CompanyUpdated:
            const idx = newState.companies.findIndex(c => c.id === action.payload.id);
            newState.companies[idx] = action.payload;
            break;
        case CompaniesActionType.CompanyDeleted:
            newState.companies = newState.companies.filter(c => c.id !== action.payload);
            break;
        case CompaniesActionType.CompaniesClear:
            newState.companies = [];
            break;
    }
    return newState;
}