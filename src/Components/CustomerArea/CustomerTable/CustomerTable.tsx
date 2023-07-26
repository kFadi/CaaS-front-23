import { useEffect, useState } from "react";
import { RiAddCircleLine, RiAddLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../Models/CustomerModels";
import { ClientType } from "../../../Models/UserModels";
import { customersDownloadedAction } from "../../../Redux/CustomersAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import BtnSlide from "../../SharedArea/BtnSlide/BtnSlide";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import { performLogout } from "../../UserArea/Logout/Logout";
import UserDetails from "../../UserArea/UserDetails/UserDetails";
import CustomerTableRow from "../CustomerTableRow/CustomerTableRow";


import "./CustomerTable.css";

function CustomerTable(): JSX.Element {

    //--------------------------------------------------
    const navigate = useNavigate();
    //--------------------------------------------------
    const [customers, setCustomers] = useState<CustomerModel[]>(store.getState().customersReducer.customers);
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

        //-- download if empty ( customers )
        if(store.getState().customersReducer.customers.length===0){
            web.getAllCustomers()
                .then((res) => {
                    setCustomers(res.data);
                    store.dispatch(customersDownloadedAction(res.data));
                    notify.success(SccMsg.CUSTOMERS_DOWNLOADED);
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

    const gotoAddCustomer = () => {
        navigate("/admin/customers/add");
    }

    //--------------------------------------------------
    //--------------------------------------------------

    return (
        <div className="CustomerTable flex flx-col flx-start">
            
            <UserDetails
                id={0}
                name={""}
                email={""}
                type={ClientType.ADMIN}
            />
            
            <div className="flex flx-row flx-center h1-wrapper">

                <h1>Customers</h1>

                <BtnSlide fcn={gotoAddCustomer} icn1={<RiAddLine size={48}/>} icn2={<RiAddCircleLine size={48}/>} txt={"Add a Customer"}/>

            </div>

            {
                (customers.length === 0)
                &&
                (<EmptyView msg="No Customers" />)
            }

            {
                (customers.length > 0)
                &&
                (
                    <table className="my-table">
                        <thead>
                            <tr className="my-table-tr-head">
                                <th className="my-table-th">id</th>
                                <th className="my-table-th">First Name</th>
                                <th className="my-table-th">Last Name</th>
                                <th className="my-table-th">Email</th>
                                <th className="my-table-th">Password</th>
                                <th className="my-table-th">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {( customers.map(c => <CustomerTableRow key={c.id} customer={c}/>) )}
                        </tbody>
                    </table>
                )
            }
            
        </div>
    );
}

export default CustomerTable;
