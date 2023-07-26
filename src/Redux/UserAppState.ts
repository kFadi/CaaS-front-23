import { LoginResModel } from "../Models/UserModels";

/////////////////////////////////////////////////////
// add  **"strictNullChecks":false** to tsconfig.json
/////////////////////////////////////////////////////

// Step 1 - Create global "AppState" (~user)
export class UserAppState {
    public user: LoginResModel = new LoginResModel();
    public constructor() {
        const usr = localStorage.getItem('user'); 
        try {
            const storedUser = JSON.parse(localStorage.getItem('user') || '');
            if (storedUser) {
                this.user = storedUser;
            }
        }
        catch (err) {
            //!!see logout reducer below!!// this.user = null;
            // console.log(err);
        }
    }
}


// Step 2 - Define all possible "ActionType"s for our "AppState"
export enum UserActionType {
    Login = "Login",
    Logout = "Logout"
}


// Step 3 - Define "Action" interface to describe "ActionType" & "payload" (if needed)
export interface UserAction {
    type: UserActionType;
    payload?: any;  // needed for login
}


// Step 4 - Export "Action Creators" functions - each gets "payload" (if needed) and returns relevant "Action"
export function loginAction(user: LoginResModel): UserAction {
    return { type: UserActionType.Login, payload: user };
}

export function logoutAction(): UserAction {
    return { type: UserActionType.Logout };
}


// Step 5 - "Reducer" function performs the required action
export function userReducer(currentState: UserAppState = new UserAppState(), action: UserAction): UserAppState {

    // const newState = new UserAppState();
    // newState.user = currentState.user;
    const newState = { ...currentState } //Spread Operator
    
    switch (action.type) {
        case UserActionType.Login: // Payload is "logged-in user" (LoginResModel) from backend
            newState.user = action.payload;
            localStorage.setItem("user", JSON.stringify(newState.user)); // Saving in the session storage (won't be deleted)
            break;
        case UserActionType.Logout: // No payload
            newState.user = new LoginResModel(); //!!see CTOR above!!//newState.user = null;
            localStorage.removeItem("user"); 
            break;
    }
    return newState;
}