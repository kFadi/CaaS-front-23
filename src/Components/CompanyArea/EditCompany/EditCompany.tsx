import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { IoChevronBackCircleOutline, IoChevronBackOutline } from "react-icons/io5";
import { MdSettingsBackupRestore } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { CompanyModel } from "../../../Models/CompanyModels";
import { ClientType } from "../../../Models/UserModels";
import { companyUpdatedAction } from "../../../Redux/CompaniesAppState";
import store from "../../../Redux/Store";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import BtnSlideBack from "../../SharedArea/BtnSlideBack/BtnSlideBack";
import { performLogout } from "../../UserArea/Logout/Logout";
import "./EditCompany.css";

function EditCompany(): JSX.Element {

    //--------------------------------------------------
    const navigate = useNavigate();
    //--------------------------------------------------
    const params = useParams();
    const id = +(params.id) || 0; //### const id = +(params.id || '');
    
    //--------------------------------------------------
    //--------------------------------------------------
    
    const [origin, setOrigin] = useState<CompanyModel>(store.getState().companiesReducer.companies.filter(c => c.id === id)[0]);
    
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
        // check whether the resource is undefined (i.e. doesn't exist by the given id)
        // -OR-  get (store..filter..) & then check
        //===============================================================================================
        //===============================================================================================
        // problem 1: actual "form initial state" is only affected by initializing origin_state ..
        //            .. useEffect setting "defaultValuesObj" directly or via setOrigin has no effect!
        //-----------------------------------------------------------------------------------------------
        // problem 2: when get to page directly via URL rather than via a UI button..
        //            .. although we get the id right (typeof & value) ..
        //            .. getting the origin (store..filter..) gives "undefined" ..
        //            .. wether in initializing origin_state or within useEffect!
        //-----------------------------------------------------------------------------------------------


    },[]);

    //--------------------------------------------------
    //--------------------------------------------------

    const goBack = () => {
        navigate(-1);
    }

    ////////////////////////////////////////////


    // Step 6 - Manage Your schema
    const schema = yup.object().shape({

        name:
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
    
    let defaultValuesObj = { ...origin };
    /* * * * * */
    const { register, handleSubmit, formState: { errors, isDirty, isValid }, reset, control } =
        useForm<CompanyModel>({ mode: "all", resolver: yupResolver(schema), defaultValues: defaultValuesObj });
    /* * * * * */
    const { dirtyFields } = useFormState({ control });
    /* * * * * */

    
    //  Step 8 - Send to Remote as post request
    const formSend = async (company: CompanyModel) => {

        await web.updateCompany(id,company)
            .then((res) => { 
                store.dispatch(companyUpdatedAction(res.data));
                notify.success(SccMsg.COMPANY_UPDATED);
            })
            .catch((err) => { 
                notify.error(err);
                if(err.response?.data==="Invalid Token! Please re-login.."){
                    performLogout();
                    navigate("/user/login");
                };
            });
            navigate("/admin/companies");
    }
    
    ////////////////////////////////////////////


    return (
        <div className="EditCompany flex flx-col flx-start">

            <div className="flex flx-row flx-center h1-wrapper">                
                <BtnSlideBack fcn={goBack} icn1={<IoChevronBackOutline size={48}/>} icn2={<IoChevronBackCircleOutline size={48}/>} txt="Back"/>
                <h1>Edit a Company</h1>
            </div>

            {/* Step 9 - handleSubmit your form */}
            <form onSubmit={handleSubmit(formSend)} className="flex flx-col flx-start f-form">
                
                <div className={"f-reset" + (isDirty? "-active pointer hvr m-item":"")} title="reset" onClick={ ()=>{if (isDirty) reset()}}>          
                    <MdSettingsBackupRestore size={48} />
                </div>


                <div className="f-group">
                    <input {...register("name")} disabled type="text" placeholder="Name" className={"f-input f-input-" + ((errors.name?.message)? "invalid":"valid")}/>
                    <label className="f-label">Name</label>
                    <span className="f-span">{errors.name?.message}</span>
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
                
                <button disabled={(!isValid || !isDirty)} className="f-btn"> Update </button>
            
            </form>
			
        </div>
    );
}

export default EditCompany;
