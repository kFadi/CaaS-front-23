import { useState } from "react";
import { IoCaretDownCircle, IoCaretUpCircle } from "react-icons/io5";
import { RiContactsLine } from "react-icons/ri";
import { ClientType } from "../../../Models/UserModels";
import "./UserDetails.css";


interface UserDetailsProps {
	type: ClientType;
    id: number;
    name: string;
    email: string;
}

function UserDetails(props: UserDetailsProps): JSX.Element {

    const [isShown,setIsShown] = useState(false);

    return (
        <div className="UserDetails flex flx-col flx-center">

                <div className="flex flx-row flx-center ud-header">
                    <RiContactsLine size={36} />
                    {(!isShown) && (
                        <div onClick={()=>setIsShown(true)}  title="Show User Details.." className={"flex flx-center pointer hvr m-item ud-h-"+((!isShown)?"show":"hide")}>
                            <IoCaretDownCircle size={46}/>    
                        </div>
                    )}
                    {(isShown) && (
                        <div onClick={()=>setIsShown(false)} title="Hide User Details.." className={"flex flx-center pointer hvr m-item ud-h-"+((isShown)?"show":"hide")}>
                            <IoCaretUpCircle size={46}/>    
                        </div>   
                    )}
                
                </div>

                {(isShown) && (
        
                    <div className={"flex flx-col flx-even ud"+((!isShown)?" ud-hide":"")}>
                        <div className={"flex flx-row flx-center ud-line" + ((props.type===ClientType.ADMIN)? "-no":"")}>
                            
                            <div className="flex flx-col flx-center ud-field">
                                <div className="ud-label">id#</div>
                                <div className="ud-value">{props.id}</div>
                            </div>
                            <div className="flex flx-col flx-center ud-field">
                                <div className="ud-label">Name</div>
                                <div className="ud-value">{props.name}</div>
                            </div>
                            <div className="flex flx-col flx-center ud-field">
                                <div className="ud-label">Email</div>
                                <div className="ud-value">{props.email}</div>
                            </div>
                            
                            <div className="flex flx-col flx-center ud-field ud-field-hidden"
                                    title ="Cannot be displayed, use CONTACT-US for SUPPORT.." >
                                <div className="ud-label">Password</div>
                                <div className="ud-value ud-pass-toHide">&#9679;&#9679;&#9679;&#9679;&#9679;</div>
                            </div>
                        </div>
                    
                        <div className="flex flx-col flx-center ud-footer">
                            <div className="ud-label">{"Level  /"+props.type}</div>
                            <div className="ud-value">
                                {(props.type===ClientType.ADMIN) && ("can VIEW, ADD, EDIT and DELETE Companies and Customers, and VIEW Coupons")}
                                {(props.type===ClientType.COMPANY) && ("can VIEW, ADD, EDIT and DELETE Coupons of yours")}
                                {(props.type===ClientType.CUSTOMER) && ("can VIEW and PURCHASE Coupons, and VIEW your Purchased-Coupons")}
                            </div>
                        </div>
                    </div>

                )}
                
        </div>
    );
}

export default UserDetails;
