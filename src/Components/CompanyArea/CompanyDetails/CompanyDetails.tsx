import { useEffect } from "react";
import { IoChevronBackCircleOutline, IoChevronBackOutline } from "react-icons/io5";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModels";
import { ClientType } from "../../../Models/UserModels";
import store from "../../../Redux/Store";
import notify, { ErrMsg } from "../../../Services/Notification";
import CouponItem, { CouponPermissionsLevel } from "../../CouponArea/CouponItem/CouponItem";
import CouponListFiltered from "../../CouponArea/CouponListFiltered/CouponListFiltered";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import BtnSlideBack from "../../SharedArea/BtnSlideBack/BtnSlideBack";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import UserDetails from "../../UserArea/UserDetails/UserDetails";

import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {

    //--------------------------------------------------
    const navigate = useNavigate();
    //--------------------------------------------------
    const params = useParams();
    const id = +(params.id) || 0; //### const id = +(params.id || '');
    //--------------------------------------------------
    const emptyCompany = new CompanyModel();
    emptyCompany.coupons = [];
    const company = (store.getState().companiesReducer.companies.filter(c => c.id === id)[0]) || emptyCompany;
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

    const goBack = () => {
        navigate(-1);
    }

    //--------------------------------------------------
    //--------------------------------------------------


    return (
        <div className="CompanyDetails flex flx-col flx-start">
                
            <UserDetails
                id={0}
                name={""}
                email={""}
                type={ClientType.ADMIN}
            />
            
            <div className="flex flx-row flx-center h1-wrapper">                
                <BtnSlideBack fcn={goBack} icn1={<IoChevronBackOutline size={48}/>} icn2={<IoChevronBackCircleOutline size={48}/>} txt="Back"/>
                <h1>Company's Details</h1>
            </div>

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
                    <tr className="CustomerTableRow my-table-tr">
                        <td className="my-table-td">{company.id}</td>
                        <td className="my-table-td">{company.name}</td>
                        <td className="my-table-td">{company.email}</td>
                        <td className="my-table-td my-table-td-pass">{company.password}</td>
                        <td className="my-table-td my-table-td-actions">
                            <div className="my-table-actions1">
                                <div className="pointer hvr m-item" title="Edit">
                                    <CustomLink to={"/admin/companies/edit/" + company.id}>
                                        <MdEdit size={28} />
                                    </CustomLink>
                                </div>
                                <div className="pointer hvr m-item" title="Delete">
                                    <CustomLink to={"/admin/companies/delete/" + company.id}>
                                        <MdDeleteForever size={28} />
                                    </CustomLink>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>	
            </table>

            <CouponListFiltered 
                originCoupons={company.coupons}
                emptyMessage="No Coupons"
                couponLevel={CouponPermissionsLevel.VIEW}
            />
            
            {/* <div className="flex flx-row-wrap flx-even coupons-list">
                {
                    (company.coupons.length > 0)
                    ? 
                    (
                        company.coupons.map( 
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
            </div> */}

        </div>
    );
}

export default CompanyDetails;
