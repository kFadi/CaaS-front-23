import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClientType } from "../../../Models/UserModels";
import { companyDeletedAction } from "../../../Redux/CompaniesAppState";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import { customersDownloadedAction } from "../../../Redux/CustomersAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import YesNo from "../../SharedArea/YesNo/YesNo";
import { performLogout } from "../../UserArea/Logout/Logout";
import "./DeleteCompany.css";

function DeleteCompany(): JSX.Element {

    //--------------------------------------------------
    const navigate = useNavigate();
    //--------------------------------------------------
    const params = useParams();
    const id = +(params.id) || 0; //### const id = +(params.id || '');
    const name = (store.getState().companiesReducer.companies.filter(c => c.id === id)[0])?.name || "";
    //--------------------------------------------------
    //--------------------------------------------------

    useEffect(() => {

        //-- verify is logged-in
        if (!store.getState().userReducer.user.token) {
            notify.error(ErrMsg.LOGIN_NEEDED);
            navigate("/user/login");
            return;
        }

        const type = store.getState().userReducer.user.type;
        
        //-- verify has permission
        if(type!==ClientType.ADMIN){
            notify.error(ErrMsg.NO_PERMISSION);
            navigate("/"+ (type.toLowerCase()) + "/coupons");
            return;
        }


        //-- verify param.id is a positive integer
        
        if (id <= 0) {
            notify.error(ErrMsg.INVALID_PARAM);
            navigate("/admin/companies");
            return;
        }

        //-- verify whether the resource exists (by the given params.id)

        //-----------------------------------------------------------------------------------------------
        // problem:   when get to page directly via URL rather than via a UI button..
        //            .. although we get the id right (typeof & value) ..
        //            .. getting the resource (store..filter..) gives "undefined" ..
        //            .. wether in initializing a const or a state or within useEffect!
        //-----------------------------------------------------------------------------------------------


    },[]);

    //--------------------------------------------------
    //--------------------------------------------------

    const refreshCoupons = async () => {

        await web.getAllCoupons()
            .then((res) => {
                store.dispatch(couponsDownloadedAction(res.data));
            })
            .catch((err) => {
                notify.error(err);
                if(err.response?.data==="Invalid Token! Please re-login.."){
                    performLogout();
                    navigate("/user/login");
                }
            });
    }

    const refreshCustomers = async () => {

        await web.getAllCustomers()
            .then((res) => {
                store.dispatch(customersDownloadedAction(res.data));
            })
            .catch((err) => {
                notify.error(err);
                if(err.response?.data==="Invalid Token! Please re-login.."){
                    performLogout();
                    navigate("/user/login");
                }
            });
    }

    const no = () => {
        navigate(-1);
    }

    const yes = async () => {

        await web.deleteCompany(id)
            .then((res) => { 
                store.dispatch(companyDeletedAction(id));
                refreshCoupons();
                refreshCustomers();
                notify.success(SccMsg.COMPANY_DELETED);
            })
            .catch((err) => { 
                notify.error(err);
                if(err.response?.data==="Invalid Token! Please re-login.."){
                    performLogout();
                    navigate("/user/login");
                }
            });
            navigate("/admin/companies");
    }

    ////////////////////////////////////////////////////

    return (
        <div className="DeleteCompany flex flx-col flx-start">
            
            <YesNo title="Delete a Company" yes={yes} no={no}> 
                <div>
                    <span className="txt-xl txt-wht">Are you sure you want to </span>
                    <span className="txt-xl txt-red">DELETE</span>
                    <span className="txt-xl txt-wht"> company #{id} named "</span>
                    <span className="txt-xl txt-blu">{name}</span>
                    <span className="txt-xl txt-wht">" ?</span>
                </div>
            </YesNo>
        </div>
    );
}

export default DeleteCompany;
