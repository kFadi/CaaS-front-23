import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientType } from "../../../Models/UserModels";
import { companiesClearAction } from "../../../Redux/CompaniesAppState";
import { couponsClearAction } from "../../../Redux/CouponsAppState";
import { customersClearAction } from "../../../Redux/CustomersAppState";
import { purchasedCouponsClearAction } from "../../../Redux/PurchasedCouponsAppState";
import store from "../../../Redux/Store";
import { logoutAction } from "../../../Redux/UserAppState";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import YesNo from "../../SharedArea/YesNo/YesNo";
import "./Logout.css";

////////////////////////////////////////////////
////////////////////////////////////////////////
export const performLogout = () => {

    const type=store.getState().userReducer.user.type;
    
    store.dispatch(couponsClearAction());
    
    if(type===ClientType.CUSTOMER){
        store.dispatch(purchasedCouponsClearAction());
    }

    if(type===ClientType.ADMIN){
        store.dispatch(companiesClearAction());
        store.dispatch(customersClearAction());
    }
    
    store.dispatch(logoutAction());
    
    notify.success(SccMsg.USER_LOGGED_OUT);
}
////////////////////////////////////////////////
////////////////////////////////////////////////



function Logout(): JSX.Element {

    //--------------------------------------------------
    const navigate = useNavigate();
    //--------------------------------------------------
    const [email, setEmail] = useState<string>(store.getState().userReducer.user.email);
    //--------------------------------------------------
    useEffect(() => {
        
        //-- verify is logged-in
        
        // if (store.getState().userReducer.user?.token?.length === 0) {
        if (!store.getState().userReducer.user.token) {
            notify.error(ErrMsg.ALREADY_LOGGED_OUT);
            navigate("/home");
            return;
        }

        setEmail(store.getState().userReducer.user.email);

    },[]);
    //--------------------------------------------------
    
    const no = () => {
        navigate(-1);
    }

    const yes = () => {
        performLogout();
        navigate("/user/login");
    }


    return (
        
        <div className="Logout flex flx-col flx-start">
            
            <YesNo title="Sign-out" yes={yes} no={no}>
                <div >
                    <span className="txt-xl txt-blu">{email}</span>
                    <span className="txt-xl txt-wht"> ,</span>
                </div>
                <div >
                    <span className="txt-xl txt-wht">Are you sure you want to </span>
                    <span className="txt-xl txt-red">Sign out</span>
                    <span className="txt-xl txt-wht"> ?</span>
                </div>
            </YesNo>

        </div>
    );
}

export default Logout;