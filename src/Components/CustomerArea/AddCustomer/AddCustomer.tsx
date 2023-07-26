import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoChevronBackCircleOutline, IoChevronBackOutline } from "react-icons/io5";
import { MdSettingsBackupRestore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { CustomerModel } from "../../../Models/CustomerModels";
import { ClientType } from "../../../Models/UserModels";
import { customerAddedAction } from "../../../Redux/CustomersAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import BtnSlideBack from "../../SharedArea/BtnSlideBack/BtnSlideBack";
import { performLogout } from "../../UserArea/Logout/Logout";
import "./AddCustomer.css";

function AddCustomer(): JSX.Element {

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
        if(type!==ClientType.ADMIN){
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


    // Step 6 - Manage Your schema
    const schema = yup.object().shape({

        firstName:
            yup.string()
                .min(3, "min 3 characters")
                .max(45, "max 45 characters")
                .required("*required"),
        lastName:
            yup.string()
                .min(3, "min 3 characters")
                .max(45, "max 45 characters")
                .required("*required"),
        email:
            yup.string()
                .max(45, "max 45 characters")
                .email("must be a valid email")
                .required("*required"),
        password:
            yup.string()
                .min(4, "min 4 characters")
                .max(8, "max 8 characters")
                .required("*required")
    }); 
    

    // Step 7 - Prepare the Hook >> useHook for the rescue 
    const { register, handleSubmit, formState: { errors, isDirty, isValid }, reset } =
        useForm<CustomerModel>({ mode: "all", resolver: yupResolver(schema) });

    
    //  Step 8 - Send to Remote as post request
    const formSend = async (customer: CustomerModel) => {

        await web.addCustomer(customer)
            .then((res) => { 
                store.dispatch(customerAddedAction(res.data));
                notify.success(SccMsg.CUSTOMER_ADDED);
            })
            .catch((err) => { 
                notify.error(err);
                if(err.response?.data==="Invalid Token! Please re-login.."){
                    performLogout();
                    navigate("/user/login");
                }
            });
            navigate("/admin/customers");
    }
    
    ////////////////////////////////////////////


    return (
        <div className="AddCustomer flex flx-col flx-start">

            <div className="flex flx-row flx-center h1-wrapper">                
                <BtnSlideBack fcn={goBack} icn1={<IoChevronBackOutline size={48}/>} icn2={<IoChevronBackCircleOutline size={48}/>} txt="Back"/>
                <h1>Add a Customer</h1>
            </div>

            {/* Step 9 - handleSubmit your form */}
            <form onSubmit={handleSubmit(formSend)} className="flex flx-col flx-start f-form">
                
                <div className={"f-reset" + (isDirty? "-active pointer hvr m-item":"")} title="reset" onClick={ ()=>{if (isDirty) reset()}}>          
                    <MdSettingsBackupRestore size={48} />
                </div>


                <div className="f-group">
                    <input {...register("firstName")} type="text" placeholder="First Name" className={"f-input f-input-" + ((errors.firstName?.message)? "invalid":"valid")}/>
                    <label className="f-label">First Name</label>
                    <span className="f-span">{errors.firstName?.message}</span>
                </div>
                
                <div className="f-group">
                    <input {...register("lastName")} type="text" placeholder="Last Name" className={"f-input f-input-" + ((errors.lastName?.message)? "invalid":"valid")}/>
                    <label className="f-label">Last Name</label>
                    <span className="f-span">{errors.lastName?.message}</span>
                </div>

                <div className="f-group">
                    <input {...register("email")} type="email" placeholder="Email" className={"f-input f-input-" + ((errors.email?.message)? "invalid":"valid")}/>
                    <label className="f-label">Email</label>
                    <span className="f-span">{errors.email?.message}</span>
                </div>
                
                <div className="f-group">
                    <input  {...register("password")} type="password" placeholder="Password" className={"f-input f-input-" + ((errors.password?.message)? "invalid":"valid")}/>
                    <label  className="f-label">Password</label>
                    <span className="f-span">{errors.password?.message}</span>
                </div>
                
                <button disabled={(!isValid || !isDirty)} className="f-btn"> Add </button>
            
            </form>
			
        </div>
    );
}

export default AddCustomer;
