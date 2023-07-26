import { useEffect } from "react";
import { IoChevronBackCircleOutline, IoChevronBackOutline } from "react-icons/io5";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerModel } from "../../../Models/CustomerModels";
import { ClientType } from "../../../Models/UserModels";
import store from "../../../Redux/Store";
import notify, { ErrMsg } from "../../../Services/Notification";
import CouponItem, { CouponPermissionsLevel } from "../../CouponArea/CouponItem/CouponItem";
import CouponListFiltered from "../../CouponArea/CouponListFiltered/CouponListFiltered";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import BtnSlideBack from "../../SharedArea/BtnSlideBack/BtnSlideBack";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import UserDetails from "../../UserArea/UserDetails/UserDetails";

import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {

    //--------------------------------------------------
    const navigate = useNavigate();
    //--------------------------------------------------
    const params = useParams();
    const id = +(params.id) || 0; //### const id = +(params.id || '');
    //--------------------------------------------------
    const emptyCustomer = new CustomerModel();
    emptyCustomer.coupons = [];
    const customer = (store.getState().customersReducer.customers.filter(c => c.id === id)[0]) || emptyCustomer;
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
            navigate("/admin/customers");
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

    const goBack = () => {
        navigate(-1);
    }

    //--------------------------------------------------
    //--------------------------------------------------


    return (
        <div className="CustomerDetails flex flx-col flx-start">
                
            <UserDetails
                id={0}
                name={""}
                email={""}
                type={ClientType.ADMIN}
            />
            
            <div className="flex flx-row flx-center h1-wrapper">                
                <BtnSlideBack fcn={goBack} icn1={<IoChevronBackOutline size={48}/>} icn2={<IoChevronBackCircleOutline size={48}/>} txt="Back"/>
                <h1>Customer's Details</h1>
            </div>

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
                    <tr className="CustomerTableRow my-table-tr">
                        <td className="my-table-td">{customer.id}</td>
                        <td className="my-table-td">{customer.firstName}</td>
                        <td className="my-table-td">{customer.lastName}</td>
                        <td className="my-table-td">{customer.email}</td>
                        <td className="my-table-td my-table-td-pass">{customer.password}</td>
                        <td className="my-table-td my-table-td-actions">
                            <div className="my-table-actions1">
                                <div className="pointer hvr m-item" title="Edit">
                                    <CustomLink to={"/admin/customers/edit/" + customer.id}>
                                        <MdEdit size={28} />
                                    </CustomLink>
                                </div>
                                <div className="pointer hvr m-item" title="Delete">
                                    <CustomLink to={"/admin/customers/delete/" + customer.id}>
                                        <MdDeleteForever size={28} />
                                    </CustomLink>
                                </div>
                            </div>
                        </td>
                    </tr>	
                </tbody>
            </table>

            <CouponListFiltered 
                originCoupons={customer.coupons}
                emptyMessage="No Coupons"
                couponLevel={CouponPermissionsLevel.VIEW}
            />
            
            {/* <div className="flex flx-row-wrap flx-even coupons-list">
                {
                    (customer.coupons.length > 0)
                    ? 
                    (
                        customer.coupons.map( 
                            c => <CouponItem 
                                    key={c.id}
                                    coupon={c} 
                                    level= {CouponPermissionsLevel.VIEW}
                                    />
                        )
                    )
                    :
                    <EmptyView msg="No Coupons" />
                }
            </div>   */}


        </div>
    );
}

export default CustomerDetails;
