import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdSettingsBackupRestore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ClientType, LoginReqModel } from "../../../Models/UserModels";
import store from "../../../Redux/Store";
import { loginAction } from "../../../Redux/UserAppState";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./Login.css";


// installations:   react-hook-form + yup(resolver/ts/react)
// create:          model + fc
// imports:         { useForm, useFormState /*useFormState only when update*/ } from "react-hook-form";  +  * as yup from "yup";  +  { yupResolver } from "@hookform/resolvers/yup";
// >>6# Schema/   >>7# useHook/   >>8# Send Remote Request/   >>9# handleSubmit your form/


function Login(): JSX.Element {

    //--------------------------------------------------
    const navigate = useNavigate();
    //--------------------------------------------------

    useEffect(() => {
        
        //-- verify is logged-in
        if (store.getState().userReducer.user.token) {
            notify.error(ErrMsg.ALREADY_LOGGED_IN);
            navigate("/user/logout");
            return;
        }

    },[]);

    //--------------------------------------------------
 
    // Step 6 - Manage Your schema
    const schema = yup.object().shape({
        
        type:
            yup.mixed<ClientType>().oneOf(Object.values(ClientType))
            //yup.string()
                //.min(5, "min 5 characters")
                //.max(8, "max 8 characters")
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
        useForm<LoginReqModel>({ mode: "all", resolver: yupResolver(schema) });


    //  Step 8 - Send to Remote as post request
    const formSend = async (loginReq: LoginReqModel) => {

        web.login(loginReq)
            .then((res) => { 
                store.dispatch(loginAction(res.data));
                notify.success(SccMsg.USER_LOGGED_IN);
                navigate("/"+ (res.data.type.toLowerCase()) + "/coupons");                
            })
            .catch((err) => { 
                notify.error(err);
            });
    }
    
    ////////////////////////////////////////////

    
    return (
        <div className="Login flex flx-col flx-start">

            <h1>Sign-in</h1>

            {/* Step 9 - handleSubmit your form */}
            <form onSubmit={handleSubmit(formSend)} className="flex flx-col flx-start f-form">

                <div className={"f-reset" + (isDirty? "-active pointer hvr m-item":"")} title="reset" onClick={ ()=>{if (isDirty) reset()}}>          
                    <MdSettingsBackupRestore size={48} />
                </div>

                <div className="f-group">
                    <select {...register("type")} className={"f-input f-select-" + ((errors.type?.message)? "invalid":"valid")}>
                        <option value={ClientType.ADMIN}>{ClientType.ADMIN}</option>
                        <option value={ClientType.COMPANY}>{ClientType.COMPANY}</option>
                        <option value={ClientType.CUSTOMER}>{ClientType.CUSTOMER}</option>
                    </select>     
                    <label className="f-label">Type</label>
                    <span className="f-span">{errors.type?.message}</span>
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

                <button disabled={(!isValid || !isDirty)} className="f-btn"> Sign in </button>
        
            </form>
            
        </div>


    );
}

export default Login;