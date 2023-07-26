import { useEffect, useState } from "react";
import { RiAddCircleLine, RiAddLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModels";
import { ClientType } from "../../../Models/UserModels";
import { companiesDownloadedAction } from "../../../Redux/CompaniesAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import BtnSlide from "../../SharedArea/BtnSlide/BtnSlide";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import { performLogout } from "../../UserArea/Logout/Logout";
import UserDetails from "../../UserArea/UserDetails/UserDetails";
import CompanyTableRow from "../CompanyTableRow/CompanyTableRow";

import "./CompanyTable.css";

function CompanyTable(): JSX.Element {

    //--------------------------------------------------
    const navigate = useNavigate();
    //--------------------------------------------------
    const [companies, setCompanies] = useState<CompanyModel[]>(store.getState().companiesReducer.companies);
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

        //-- download if empty ( companies )
        if(store.getState().companiesReducer.companies.length===0){
            web.getAllCompanies()
                .then((res) => {
                    setCompanies(res.data);
                    store.dispatch(companiesDownloadedAction(res.data));
                    notify.success(SccMsg.COMPANIES_DOWNLOADED);
                })
                .catch((err) => {
                    notify.error(err);
                    if(err.response?.data==="Invalid Token! Please re-login.."){
                        performLogout();
                        navigate("/user/login");
                    }
                });
        }

    },[]);


    //--------------------------------------------------
    //--------------------------------------------------

    const gotoAddCompany = () => {
        navigate("/admin/companies/add");
    }

    //--------------------------------------------------
    //--------------------------------------------------


    return (
        <div className="CompanyTable flex flx-col flx-start">
            
            <UserDetails
                id={0}
                name={""}
                email={""}
                type={ClientType.ADMIN}
            />
            
            <div className="flex flx-row flx-center h1-wrapper">

                <h1>Companies</h1>

                <BtnSlide fcn={gotoAddCompany} icn1={<RiAddLine size={48}/>} icn2={<RiAddCircleLine size={48}/>} txt={"Add a Company"}/>

            </div>

            {
                (companies.length === 0)
                &&
                (<EmptyView msg="No Companies" />)            
            }

            {
                (companies.length > 0)
                &&
                (
                    <table className="my-table">
                        <thead>
                            <tr className="my-table-tr-head">
                                <th className="my-table-th">id</th>
                                <th className="my-table-th">Name</th>
                                <th className="my-table-th">Email</th>
                                <th className="my-table-th">Password</th>
                                <th className="my-table-th">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {( companies.map(c => <CompanyTableRow key={c.id} company={c}/>) )}
                        </tbody>
                    </table>
                )
            }

        </div>
    );
}

export default CompanyTable;
