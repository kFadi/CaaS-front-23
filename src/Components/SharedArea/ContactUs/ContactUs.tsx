import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { MdSettingsBackupRestore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContactModel } from "../../../Models/UserModels";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/Notification";
import { performLogout } from "../../UserArea/Logout/Logout";
//import { send } from 'emailjs-com';
import { send } from "@emailjs/browser";
import "./ContactUs.css";



function ContactUs(): JSX.Element {

  //--------------------------------------------------
  const navigate = useNavigate();
  //--------------------------------------------------
  const [email, setEmail] = useState(store.getState().userReducer.user?.email || "");
  const [name, setName] = useState(store.getState().userReducer.user?.name || "");
  const [origin, setOrigin] = useState<UserContactModel>({ 'email': email, 'name': name, 'message': "" });
  //--------------------------------------------------


  // Step 6 - Manage Your schema
  const schema = yup.object().shape({
    email:
        yup.string()
            .email("invalid pattern")
            .required("*required"),
    name:
        yup.string()
        .required("*required"),   
    
    message:
        yup.string()
            .required("*required")
  });


  // Step 7 - Prepare the Hook >> useHook for the rescue 
  let defaultValuesObj = { ...origin };
  /* * * * * */
  const { register, handleSubmit, formState: { errors, isDirty, isValid }, reset, control } =
    useForm<UserContactModel>({ mode: "all", resolver: yupResolver(schema), defaultValues: defaultValuesObj });  
  /* * * * * */
  const { dirtyFields } = useFormState({ control });
  /* * * * * */
  

  //  Step 8 - Send to Remote as put request
  const formSend = async (userContact: UserContactModel) => {
  
    const templateParams = {
      email: userContact.email,
      name: userContact.name,
      message: userContact.message
    };

    send('service_gmail', 'template_caas', templateParams,'wb0JOQEUfmb-rOGUX')
      .then((response) => {
        notify.success(SccMsg.MSG_SENT);
        navigate("/home");
      })
      .catch((err) => {
        notify.error(err);
        if(err.response?.data==="Invalid Token! Please re-login.."){
          performLogout();
          navigate("/user/login");
        }
      });
  };

  ////////////////////////////////////////////
  
  
  return (
    <div className="ContactUs flex flx-col flx-start">
      
      <h1>Contact Us</h1>
      
      {/* Step 9 - handleSubmit your form */}
      <form onSubmit={handleSubmit(formSend)} className="flex flx-col flx-start f-form">

        <div className={"f-reset" + (isDirty? "-active pointer hvr m-item":"")} title="reset" onClick={ ()=>{if (isDirty) reset()}}>          
          <MdSettingsBackupRestore size={48} />
        </div>

        <div className="f-group">
          <input {...register("email")} disabled={defaultValuesObj.email!==""} type="email" placeholder="Email" className={"f-input f-input-" + ((errors.email?.message)? "invalid":"valid")}/>
          <label className="f-label">Email</label>
          <span className="f-span"> {errors.email?.message} </span>
        </div>

        <div className="f-group">
          <input {...register("name")} disabled={defaultValuesObj.name!==""} type="text" placeholder="Name" className={"f-input f-input-" + ((errors.name?.message)? "invalid":"valid")}/>
          <label className="f-label">Name</label>
          <span className="f-span"> {errors.name?.message} </span>
        </div>

        <div className="f-group">          
          <textarea  {...register("message")} /*type="text"*/ placeholder="Message" className={"f-textarea f-input f-input-" + ((errors.message?.message)? "invalid":"valid")}/>
          <label className="f-label">Message</label>
          <span className="f-span"> {errors.message?.message} </span>
        </div>

        <button disabled={(!isValid || !isDirty)} className="f-btn"> Send </button>
        
      </form>
          
    </div>
  );
}

export default ContactUs;