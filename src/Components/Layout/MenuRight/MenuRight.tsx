import { useEffect, useState } from "react";
import { BiHide } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { RiBuilding2Fill, RiCoupon3Fill, RiScissorsCutFill } from "react-icons/ri";
import { ClientType } from "../../../Models/UserModels";
import store from "../../../Redux/Store";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import HvrMaster, { HvrMasterType } from "../../SharedArea/HvrMaster/HvrMaster";
import "./MenuRight.css";

function MenuRight(): JSX.Element {

    //-------------------------------------------------- 
    const [isLoggedIn, setIsLoggedIn] = useState(store.getState().userReducer.user?.token?.length > 0);
    const [type, setType] = useState(store.getState().userReducer.user?.type);
    //--------------------------------------------------
    useEffect(() => {
        return store.subscribe(() => {
            setIsLoggedIn(store.getState().userReducer.user?.token?.length > 0);
            setType(store.getState().userReducer.user?.type);
        });
    }, []);
    //--------------------------------------------------

    return (
        <div className="MenuRight flex flx-row flx-center">

			<div className={"flex flx-row flx-even menu-m-item side-menu side-menu-" + ((isLoggedIn)? "populated":"empty")}>

                {(!isLoggedIn) &&(
                    <div className="flex flx-col flx-center" title="Restricted to Registered Users">
                        <HvrMaster type={HvrMasterType.WOBBLE_TOP}>
                            <BiHide size={50} />
                        </HvrMaster>
                    </div>
                )}
                
                {(isLoggedIn) &&(
                    <div className="flex flx-col flx-center m-item" title="Coupons">
                        <HvrMaster type={HvrMasterType.BOB}>
                            <CustomLink to={"/"+ (type.toLowerCase()) + "/coupons"}>
                                <RiCoupon3Fill size={50} />
                            </CustomLink>
                        </HvrMaster>
                    </div> 
                )}

                {(type===ClientType.ADMIN) &&(
                    <div className="flex flx-col flx-center m-item" title="Companies">
                        <HvrMaster type={HvrMasterType.BOB}>
                            <CustomLink to="/admin/companies">
                                <RiBuilding2Fill size={50} />
                            </CustomLink>                      
                        </HvrMaster>
                    </div>
                )}

                {(type===ClientType.ADMIN) &&(
                    <div className="flex flx-col flx-center m-item" title="Customers">
                        <HvrMaster type={HvrMasterType.BOB}>
                            <CustomLink to="/admin/customers">
                                <FaUsers size={52} />
                            </CustomLink>                      
                        </HvrMaster>
                    </div>
                )}

                {(type===ClientType.CUSTOMER) &&(
                    <div className="flex flx-col flx-center m-item" title="Purchased Coupons">
                        <HvrMaster type={HvrMasterType.BOB}>
                            <CustomLink to="/customer/coupons/purchased">
                                <RiScissorsCutFill size={50} />
                            </CustomLink>  
                        </HvrMaster>
                    </div>
                )}

            </div>

        </div>
    );
}

export default MenuRight;
