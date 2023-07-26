import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoChevronBackCircleOutline, IoChevronBackOutline } from "react-icons/io5";
import { MdSettingsBackupRestore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Category, CouponModel } from "../../../Models/CouponModels";
import { ClientType } from "../../../Models/UserModels";
import { couponAddedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import BtnSlideBack from "../../SharedArea/BtnSlideBack/BtnSlideBack";
import { performLogout } from "../../UserArea/Logout/Logout";
import "./AddCoupon.css";

function AddCoupon(): JSX.Element {

    //--------------------------------------------------
    const navigate = useNavigate();
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
        if(type!==ClientType.COMPANY){
            notify.error(ErrMsg.NO_PERMISSION);
            navigate("/"+ (type.toLowerCase()) + "/coupons");
            return;
        }

    },[]);

    //--------------------------------------------------
    //--------------------------------------------------

    const goBack = () => {
        navigate(-1);
    }

    ////////////////////////////////////////////

    function getCleanToday() : Date {
    
        const today= new Date();
        today.setHours(0,0,0,0);
        return today;
    }


    // Step 6 - Manage Your schema
    const schema = yup.object().shape({
        category:
            yup.mixed<Category>().oneOf(Object.values(Category))
            //yup.string()
                //.min(4, "min 4 characters")
                //.max(11, "max 11 characters")
                .required("*required"),
        title:
            yup.string()
                .min(3, "min 3 characters")
                .max(45, "max 45 characters")
                .required("*required"),
        description:
            yup.string()
                .min(3, "min 3 characters")
                .max(45, "max 45 characters")
                .required("*required"),
        startDate:
            yup.date()
                .required("*required")
                .typeError("must be a date")
                .min(getCleanToday(), "cannot be set to the past")
                // .default(new Date())
                // .nullable().default(() => new Date()),
                .default(getCleanToday())
                .nullable().default(() => getCleanToday()),
        endDate:
            yup.date()
                .required("*required")
                .typeError("must be a date")
                .min( yup.ref('startDate'),"cannot ends before it starts")
                // .default(yup.ref('startDate'))
                // .nullable().default(() => yup.ref('startDate'))
                //
                // .default(getCleanToday())
                // .nullable().default(() => getCleanToday())
                ,
        amount:
            yup.number()
                .min(0,"cannot be negative")
                .integer("must be an integer")
                .typeError("must be a number")
                .required("*required"),
        price:
            yup.number()
                .min(0,"cannot be negative")
                .typeError("must be a number")
                .required("*required"),
        image:
            yup.string()
                .min(3, "min 3 characters")
                .max(45, "max 45 characters")
                .required("*required"),
        
    }); 
    

    // Step 7 - Prepare the Hook >> useHook for the rescue 
    const { register, handleSubmit, formState: { errors, isDirty, isValid }, reset } =
        useForm<CouponModel>({ mode: "all", resolver: yupResolver(schema) });

    
    //  Step 8 - Send to Remote as post request
    const formSend = async (coupon: CouponModel) => {

        await web.addCompanyCoupon(coupon)
            .then((res) => { 
                store.dispatch(couponAddedAction(res.data));
                notify.success(SccMsg.COUPON_ADDED);
                navigate("/company/coupons");
            })
            .catch((err) => { 
                notify.error(err);
                if(err.response?.data==="Invalid Token! Please re-login.."){
                    performLogout();
                    navigate("/user/login");
                }
            });
    }
    
    ////////////////////////////////////////////


    return (
        <div className="AddCoupon flex flx-col flx-start">

            <div className="flex flx-row flx-center h1-wrapper">                
                <BtnSlideBack fcn={goBack} icn1={<IoChevronBackOutline size={48}/>} icn2={<IoChevronBackCircleOutline size={48}/>} txt="Back"/>
                <h1>Add a Coupon</h1>
            </div>

            {/* Step 9 - handleSubmit your form */}
            <form onSubmit={handleSubmit(formSend)} className="flex flx-col flx-start f-form">
                
                <div className={"f-reset" + (isDirty? "-active pointer hvr m-item":"")} title="reset" onClick={ ()=>{if (isDirty) reset()}}>          
                    <MdSettingsBackupRestore size={48} />
                </div>


                <div className="f-group">
                    <select {...register("category")} className={"f-input f-select" + ((errors.category?.message)? "invalid":"valid")}>
                        <option value={Category.CLOTHES}>{Category.CLOTHES}</option>
                        <option value={Category.COSMETICS}>{Category.COSMETICS}</option>
                        <option value={Category.ELECTRICITY}>{Category.ELECTRICITY}</option>
                        <option value={Category.FOOD}>{Category.FOOD}</option>
                        <option value={Category.PHARMA}>{Category.PHARMA}</option>
                        <option value={Category.RESTAURANTS}>{Category.RESTAURANTS}</option>
                        <option value={Category.SPORT}>{Category.SPORT}</option>
                        <option value={Category.TOYS}>{Category.TOYS}</option>
                        <option value={Category.VACATIONS}>{Category.VACATIONS}</option>
                    </select>     
                    <label className="f-label">Type</label>
                    <span className="f-span">{errors.category?.message}</span>
                </div>

                <div className="f-group">
                    <input {...register("title")} type="text" placeholder="Title" className={"f-input f-input-" + ((errors.title?.message)? "invalid":"valid")}/>
                    <label className="f-label">Title</label>
                    <span className="f-span">{errors.title?.message}</span>
                </div>
                
                <div className="f-group">
                    <input {...register("description")} type="text" placeholder="Description" className={"f-input f-input-" + ((errors.description?.message)? "invalid":"valid")}/>
                    <label className="f-label">Description</label>
                    <span className="f-span">{errors.description?.message}</span>
                </div>
                
                <div className="f-group">
                    <input {...register("amount")} type="text" placeholder="Amount" className={"f-input f-input-" + ((errors.amount?.message)? "invalid":"valid")}/>
                    <label className="f-label">Amount</label>
                    <span className="f-span">{errors.amount?.message}</span>
                </div>
                
                <div className="f-group">
                    <input {...register("price")} type="text" placeholder="Price" className={"f-input f-input-" + ((errors.price?.message)? "invalid":"valid")}/>
                    <label className="f-label">Price</label>
                    <span className="f-span">{errors.price?.message}</span>
                </div>
                
                <div className="f-group">
                    <input {...register("image")} type="text" placeholder="Image" className={"f-input f-input-" + ((errors.image?.message)? "invalid":"valid")}/>
                    <label className="f-label">Image</label>
                    <span className="f-span">{errors.image?.message}</span>
                </div>
                
                <div className="f-group">
                    <input {...register("startDate")} type="date" placeholder="Start Date" className={"f-input f-input-" + ((errors.startDate?.message)? "invalid":"valid")}/>
                    <label className="f-label">Start Date</label>
                    <span className="f-span">{errors.startDate?.message}</span>
                </div>

                <div className="f-group">
                    <input {...register("endDate")} type="date" placeholder="End Date" className={"f-input f-input-" + ((errors.endDate?.message)? "invalid":"valid")}/>
                    <label className="f-label">End Date</label>
                    <span className="f-span">{errors.endDate?.message}</span>
                </div>
                
                <button disabled={(!isValid || !isDirty)} className="f-btn"> Add </button>
            
            </form>
			
        </div>
    );
}

export default AddCoupon;
