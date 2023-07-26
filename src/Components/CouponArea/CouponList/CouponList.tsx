import { useEffect, useState } from "react";
import { RiAddCircleLine, RiAddLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModels";
import { ClientType } from "../../../Models/UserModels";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import { purchasedCouponsDownloadedAction } from "../../../Redux/PurchasedCouponsAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import BtnSlide from "../../SharedArea/BtnSlide/BtnSlide";
import { performLogout } from "../../UserArea/Logout/Logout";
import UserDetails from "../../UserArea/UserDetails/UserDetails";
import { CouponPermissionsLevel } from "../CouponItem/CouponItem";
import CouponListFiltered from "../CouponListFiltered/CouponListFiltered";
import "./CouponList.css";

//--------------------------------------------------

export enum CouponListType {
    ADMIN_VIEW,
    COMPANY_CONTROL,
    CUSTOMER_BROWSE_AND_PURCHASE,
    CUSTOMER_VIEW_PURCHASED
}

//--------------------------------------------------

interface CouponListProps {
	couponListType: CouponListType;
}

function CouponList(props: CouponListProps): JSX.Element {

    //--------------------------------------------------
    const navigate = useNavigate();
    //--------------------------------------------------
    const [type, setType] = useState<ClientType>(store.getState().userReducer.user?.type || ClientType.NONE);
    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().couponsReducer?.coupons || []);
    const [purchasedCoupons, setPurchasedCoupons] = useState<CouponModel[]>(store.getState().purchasedCouponsReducer?.purchasedCoupons || []);
    const [displayedCoupons, setDisplayedCoupons] = useState<CouponModel[]>([]);
    //--------------------------------------------------
    const [couponsFetched, setCouponsFetched] = useState<boolean>(false);
    const [purchasedCouponsFetched, setPurchasedCouponsFetched] = useState<boolean>(false);
    //--------------------------------------------------

    useEffect(() => {

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        async function customerFetch() {

            if(!couponsFetched && store.getState().couponsReducer.coupons.length===0) {
                await web.getBrowseCoupons()
                    .then((res) => {
                        setCoupons(res.data);
                        store.dispatch(couponsDownloadedAction(res.data));
                        if(props.couponListType===CouponListType.CUSTOMER_BROWSE_AND_PURCHASE){
                            setDisplayedCoupons(res.data);
                        }
                        setCouponsFetched(true);
                        notify.success(SccMsg.COUPONS_DOWNLOADED);
                    })
                    .catch((err) => {
                        notify.error(err);
                        if(err.response?.data==="Invalid Token! Please re-login.."){
                            performLogout();
                            navigate("/user/login");
                            return;
                        }
                    });
            } else if(props.couponListType===CouponListType.CUSTOMER_BROWSE_AND_PURCHASE){
                setDisplayedCoupons(coupons);
            }

            if (!purchasedCouponsFetched && store.getState().purchasedCouponsReducer.purchasedCoupons.length ===0) {
                await web.getCustomerCoupons()
                    .then((res) => {
                        setPurchasedCoupons(res.data);
                        store.dispatch(purchasedCouponsDownloadedAction(res.data));
                        if (props.couponListType===CouponListType.CUSTOMER_VIEW_PURCHASED){
                            setDisplayedCoupons(res.data);
                        }
                        setPurchasedCouponsFetched(true);
                        notify.success(SccMsg.PURCHASED_COUPONS_DOWNLOADED);
                    })
                    .catch((err) => {
                        notify.error(err);
                        if(err.response?.data==="Invalid Token! Please re-login.."){
                            performLogout();
                            navigate("/user/login");
                            return;
                        }
                    });
            } else if (props.couponListType===CouponListType.CUSTOMER_VIEW_PURCHASED){
                setDisplayedCoupons(purchasedCoupons);
            }

        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 


        //-- verify is logged-in
        if (!store.getState().userReducer.user.token) {
            notify.error(ErrMsg.LOGIN_NEEDED);
            navigate("/user/login");
            return;
        }

        setType(store.getState().userReducer.user.type);

        //-- verify has permission
        if(
            (props.couponListType===CouponListType.ADMIN_VIEW && type!==ClientType.ADMIN) ||
            (props.couponListType===CouponListType.COMPANY_CONTROL && type!==ClientType.COMPANY) ||
            (props.couponListType===CouponListType.CUSTOMER_VIEW_PURCHASED && type!==ClientType.CUSTOMER) ||
            (props.couponListType===CouponListType.CUSTOMER_BROWSE_AND_PURCHASE && type!==ClientType.CUSTOMER)
        ){
            notify.error(ErrMsg.NO_PERMISSION);
            navigate("/"+ (type.toLowerCase()) + "/coupons");
            return;
        }


        //-- set displayedCoupons & download if the needed list is empty ( coupons | purchasedCoupons )
        switch (type) {
                
            case ClientType.CUSTOMER:    
                customerFetch();
                break;

            case ClientType.COMPANY:    
                //if(store.getState().couponsReducer.coupons.length===0){
                if(!couponsFetched && store.getState().couponsReducer.coupons.length===0){
                    web.getCompanyCoupons()
                        .then((res) => {
                            setCoupons(res.data);
                            store.dispatch(couponsDownloadedAction(res.data));
                            setDisplayedCoupons(res.data);
                            //
                            setCouponsFetched(true);
                            //
                            notify.success(SccMsg.COUPONS_DOWNLOADED);
                        })
                        .catch((err) => {
                            notify.error(err);
                            if(err.response?.data==="Invalid Token! Please re-login.."){
                                performLogout();
                                navigate("/user/login");
                                return;
                            }
                        });
                } else {
                    setDisplayedCoupons(coupons);
                }
                break;

            case ClientType.ADMIN:
                //if(store.getState().couponsReducer.coupons.length===0){
                if(!couponsFetched && store.getState().couponsReducer.coupons.length===0){
                    web.getAllCoupons()
                        .then((res) => {
                            setCoupons(res.data);
                            store.dispatch(couponsDownloadedAction(res.data));
                            setDisplayedCoupons(res.data);
                            //
                            setCouponsFetched(true);
                            //
                            notify.success(SccMsg.COUPONS_DOWNLOADED);
                        })
                        .catch((err) => {
                            notify.error(err);
                            if(err.response?.data==="Invalid Token! Please re-login.."){
                                performLogout();
                                navigate("/user/login");
                            }
                        });
                } else {
                    setDisplayedCoupons(coupons);
                }
                break;
        }    

    },[props.couponListType]);

    //--------------------------------------------------
    //--------------------------------------------------

    const gotoAddCoupon = () => {
        navigate("/company/coupons/add");
    }

    //--------------------------------------------------
    //--------------------------------------------------


    return (
        <div className="CouponList flex flx-col flx-start">
            
            <UserDetails
                id={store.getState().userReducer.user.id}
                name={store.getState().userReducer.user.name}
                email={store.getState().userReducer.user.email}
                type={type}
            />
            
            <div className="flex flx-row flx-center h1-wrapper">

                <h1>{ (
                        (props.couponListType===CouponListType.ADMIN_VIEW || props.couponListType===CouponListType.CUSTOMER_BROWSE_AND_PURCHASE )
                        ?
                        ""
                        :
                        (  "Your " + ( (props.couponListType===CouponListType.CUSTOMER_VIEW_PURCHASED)? "Purchased ":"")  )
                    )
                    +"Coupons"
                }</h1>

                {(type===ClientType.COMPANY)&&(<BtnSlide fcn={gotoAddCoupon} icn1={<RiAddLine size={48}/>} icn2={<RiAddCircleLine size={48}/>} txt={"Add a Coupon"}/>)}

            </div>

            {/* FILTER */}

            <CouponListFiltered 
                originCoupons={displayedCoupons}
                emptyMessage={"No " +
                    (
                        (props.couponListType===CouponListType.CUSTOMER_VIEW_PURCHASED)? "Purchased ":""
                    )
                    +"Coupons" + 
                    (
                        (props.couponListType===CouponListType.CUSTOMER_VIEW_PURCHASED || props.couponListType===CouponListType.COMPANY_CONTROL)? " For You":""
                    )
                }
                couponLevel={
                    (props.couponListType===CouponListType.ADMIN_VIEW || props.couponListType===CouponListType.CUSTOMER_VIEW_PURCHASED)
                    ?
                    (CouponPermissionsLevel.VIEW)
                    :
                    (
                        (props.couponListType===CouponListType.COMPANY_CONTROL)
                        ? 
                        (CouponPermissionsLevel.CONTROL)
                        :
                        (CouponPermissionsLevel.PURCHASE)  
                    )
                }
            />
            
            {/* <div className="flex flx-row-wrap flx-even coupons-list">
                {
                    (displayedCoupons.length > 0)
                    ? 
                    (
                        displayedCoupons.map( 
                            c => <CouponItem 
                                    key={c.id}
                                    coupon={c} 
                                    level= {
                                        (props.couponListType===CouponListType.ADMIN_VIEW || props.couponListType===CouponListType.CUSTOMER_VIEW_PURCHASED)
                                        ?
                                        (CouponPermissionsLevel.VIEW)
                                        :
                                        (
                                            (props.couponListType===CouponListType.COMPANY_CONTROL)
                                            ? 
                                            (CouponPermissionsLevel.CONTROL)
                                            :
                                            (CouponPermissionsLevel.PURCHASE)  
                                        )
                                    }
                                    />
                        )
                    )
                    :
                    <EmptyView msg=
                        {"No " +
                        (
                            (props.couponListType===CouponListType.CUSTOMER_VIEW_PURCHASED)? "Purchased ":""
                        )
                        +"Coupons" + 
                        (
                            (props.couponListType===CouponListType.CUSTOMER_VIEW_PURCHASED || props.couponListType===CouponListType.COMPANY_CONTROL)? " For You":""
                        )
                    } />
                }
            </div>   */}
            
        </div>
    );
}

export default CouponList;
