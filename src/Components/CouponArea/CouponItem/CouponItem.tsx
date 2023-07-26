import moment from 'moment';
import { useEffect } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { RiScissorsCutFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Category, CouponModel } from "../../../Models/CouponModels";
import { ClientType } from "../../../Models/UserModels";
import { couponUpdatedAction } from "../../../Redux/CouponsAppState";
import { purchasedCouponAddedAction } from "../../../Redux/PurchasedCouponsAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import { performLogout } from "../../UserArea/Logout/Logout";
import "./CouponItem.css";

//--------------------------------------------------

export enum CouponPermissionsLevel {
    VIEW,       // admin    (all)  -OR-  customer (purchased)
    PURCHASE,   // customer (all)
    CONTROL     // company  (own)
}

//--------------------------------------------------

interface CouponItemProps {
    coupon: CouponModel;
    level: CouponPermissionsLevel;
}

//--------------------------------------------------

function CouponItem(props: CouponItemProps): JSX.Element {


    //--------------------------------------------------
    const navigate = useNavigate();
    //--------------------------------------------------
    useEffect(() => {

        // only axios purchase can take place in here
        // only need to verify that(***) permission
        
        //-- verify is logged-in
        if (!store.getState().userReducer.user.token) {
            notify.error(ErrMsg.LOGIN_NEEDED);
            navigate("/user/login");
            return;
        }

        const type = store.getState().userReducer.user.type;

        //-- verify has permission
        if(
            (props.level===CouponPermissionsLevel.VIEW && type===ClientType.COMPANY) ||
            (props.level===CouponPermissionsLevel.CONTROL && type!==ClientType.COMPANY) ||
            (props.level===CouponPermissionsLevel.PURCHASE && type!==ClientType.CUSTOMER) /* see (***) above */
        ){
            notify.error(ErrMsg.NO_PERMISSION);
            navigate("/"+ (type.toLowerCase()) + "/coupons");
            return;
        }

    },[]);

    //--------------------------------------------------

    function getImgSrc() {

        // let str ="https://loremflickr.com/320/240/coupon";
        // let str ="https://loremflickr.com/320/240/"+props.coupon.category.toLowerCase();
        let str ="https://loremflickr.com/320/240/";
        
        switch (props.coupon.category) {
            case Category.CLOTHES:
                str+="clothing";
                break;
            case Category.COSMETICS:
                str+="cosmetics";
                break;
            case Category.ELECTRICITY:
                str+="electronic-device";
                break;
            case Category.FOOD:
                str+="food";
                break;
            case Category.PHARMA:
                str+="pharma";
                break;
            case Category.RESTAURANTS:
                str+="dining";
                // str+="dishes";
                break;
            case Category.SPORT:
                str+="sports";
                break;
            case Category.TOYS:
                str+="toys";//////////
                break;
            case Category.VACATIONS:
                str+="vacation";
                break;
        }

        return str;
    }

    //--------------------------------------------------

    function getDaysLeft() {
    
        const now= new Date();
        now.setHours(0,0,0,0);
        const d1 = now.getTime();
    
        const dt = new Date (props.coupon.endDate);
        dt.setHours(0,0,0,0);
        const d2 = dt.getTime();
    
        return ((d2-d1)/(1000*60*60*24));
    }
    
    //--------------------------------------------------
        
    const goPurchase = async () => {

        await web.addCustomerPurchase(props.coupon)
            .then((res) => { 
                store.dispatch(purchasedCouponAddedAction(res.data));
                store.dispatch(couponUpdatedAction(res.data));
                notify.success(SccMsg.COUPON_PURCHASED);
                navigate("/customer/coupons/purchased");                
            })
            .catch((err) => { 
                notify.error(err);
                if(err.response?.data==="Invalid Token! Please re-login.."){
                    performLogout();
                    navigate("/user/login");
                }
            });
    }
    //--------------------------------------------------
    
    const sm: number = 28;    

    
    return (
        <div className="CouponItem">
            
            <div className="item-card" title={"#"+props.coupon.id}>
                <img
                    className="item-card-img"
                    // src={"https://loremflickr.com/320/240/"+props.coupon.category.toLowerCase()}
                    src= {getImgSrc()}
                    alt=""
                />

                <div className="item-card-bg"></div>

                
                <div className={"flex flx-row flx-even item-card-btns" + (
                    ( !(props.level===CouponPermissionsLevel.CONTROL || props.level===CouponPermissionsLevel.PURCHASE) )
                    ? 
                    "-no"
                    :
                    ( (props.level===CouponPermissionsLevel.PURCHASE)? " item-card-btns-sm":"")
                )}> 
                    
                    {(props.level===CouponPermissionsLevel.CONTROL) && (
                        <div className="pointer hvr m-item" title="Edit Coupon">
                            <CustomLink to={"/company/coupons/edit/" + props.coupon.id}>
                                <MdEdit size={sm} />
                            </CustomLink>
                        </div>
                    )}
                    
                    {(props.level===CouponPermissionsLevel.CONTROL) && (
                        <div className="pointer hvr m-item" title="Delete Coupon">
                            <CustomLink to={"/company/coupons/delete/" + props.coupon.id}>
                                <MdDeleteForever size={sm} />
                            </CustomLink>
                        </div>
                    )}
                    
                    {(props.level===CouponPermissionsLevel.PURCHASE) && (
                        <div className="pointer hvr m-item" title="Purchase Coupon" onClick={goPurchase}>
                            <RiScissorsCutFill size={sm} />
                        </div>
                    )}

                </div>
                

                <div className="item-card-category">
                    {"#" + props.coupon.category}
                </div>

                <div className="item-card-title">
                    {props.coupon.title}
                </div>

                <div className="flex flx-row flx-center item-card-bordered item-card-price-amount">
                    <div>{props.coupon.price} &#8362;</div>
                    <div className="flex flx-row flx-around count-left amount-left">
                        <div className={"flex flx-row flx-center"+
                                ( (props.coupon.amount>3)
                                    ?
                                    ""
                                    :
                                    (
                                        (props.coupon.amount===0)
                                        ?
                                        " count-left-0"
                                        :
                                        (
                                            (props.coupon.amount===1)
                                            ?
                                            " count-left-1"
                                            :
                                            " count-left-2-3"
                                        )

                                    )
                                )
                        }>&nbsp;{props.coupon.amount}&nbsp;</div>
                        <div className="count-left-text">{"coupon" + ( (props.coupon.amount===1)? "":"s" ) + " left"}</div>
                    </div>
                </div>
                
                <div className="item-card-description overflow-y-scroll">
                    {props.coupon.description}
                </div>

                <div className="flex flx-row flx-center item-card-bordered  item-card-dates">
                    <div className="flex flx-row flx-center">
                        <div className="flex flx-col flx-center dates-text1">
                            <div>starts:</div>
                            <div>ends:&nbsp;&nbsp;</div>
                        </div>
                        <div className="flex flx-col flx-center dates-text2">
                            <div>{(moment(props.coupon.startDate).format('DD/MM/YYYY'))}</div>
                            <div>{(moment(props.coupon.endDate).format('DD/MM/YYYY'))}</div>
                        </div>
                    </div>
                    <div className="flex flx-row flx-center count-left days-left">
                        <div className={"flex flx-row flx-center" +
                                ( (getDaysLeft() > 3)
                                    ?
                                    ""
                                    :
                                    (
                                        (getDaysLeft()===0)
                                        ?
                                        " count-left-0 days-left-0"
                                        :
                                        (
                                            (getDaysLeft()===1)
                                            ?
                                            " count-left-1"
                                            :
                                            " count-left-2-3"
                                        )
                                    )
                                )
                        }>
                            &nbsp;
                            {(((getDaysLeft()===0))&&("ENDS"))}
                            {(((getDaysLeft()!==0))&&(getDaysLeft()))}
                            &nbsp;
                            
                        </div>
                        <div className="flex flx-col flx-center count-left-text">
                            <div>
                                {(((getDaysLeft()===0))&&("@"))}
                                {(((getDaysLeft()!==0))&&("day" + ( (getDaysLeft()===1)? "":"s" )))}
                                
                            </div>
                            <div>
                                {(((getDaysLeft()===0))&&("23:59"))}
                                {(((getDaysLeft()!==0))&&("left"))}
                            </div>
                        </div>
                    </div>
                </div>
    
            </div>
        </div>
    );
}

export default CouponItem;
