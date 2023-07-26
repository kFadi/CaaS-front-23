import { useEffect, useState } from "react";
import { IoEnter, IoExit } from "react-icons/io5";
import { MdAdminPanelSettings, MdOutlineWavingHand } from "react-icons/md";
import { RiBuilding2Fill, RiUserFill } from "react-icons/ri";
import store from "../../../Redux/Store";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import HvrMaster, { HvrMasterType } from "../../SharedArea/HvrMaster/HvrMaster";
import "./UserMenu.css";

function UserMenu(): JSX.Element {
    
    //-------------------------------------------------- 
    const [isLoggedIn, setIsLoggedIn] = useState(store.getState().userReducer.user?.token?.length > 0);
    const [email, setEmail] = useState(store.getState().userReducer.user?.email);
    const [type, setType] = useState(store.getState().userReducer.user?.type);
    
    //--------------------------------------------------
    useEffect(() => {
        return store.subscribe(() => {
            setIsLoggedIn(store.getState().userReducer.user?.token?.length > 0);
            setEmail(store.getState().userReducer.user?.email);
            setType(store.getState().userReducer.user?.type);
        });
    }, []);
    //--------------------------------------------------


    return (
        <div className="UserMenu flex flx-row flx-even user-menu">
            
            <div className = {"flex flx-col flx-center user-menu-icon" + ((isLoggedIn)?"-active":"")}>
                {!isLoggedIn && (
                    <div>
                        {/* <MdWavingHand size={36}/> */}
                        <MdOutlineWavingHand size={45} />
                    </div>
                )}

                {(type==="ADMIN") &&(
                    <div>
                        <MdAdminPanelSettings size={60} />
                    </div>
                )}
                {(type==="COMPANY") &&(
                    <div>
                        <RiBuilding2Fill size={50} />
                    </div>
                )}
                {(type==="CUSTOMER") &&(
                    <div>
                        <RiUserFill size={55} />
                    </div>
                )} 
            </div>

            <div className = "flex flx-col flx-center user-menu-lines">
                
                <div className = "flex flx-row flx-center user-menu-line1">
                    {isLoggedIn && (
                        <div className="m-item" title="Sign out">
                            <HvrMaster type={HvrMasterType.HANG}>
                                <CustomLink to="/user/logout">
                                    <IoExit size={42} />
                                </CustomLink>
                            </HvrMaster>
                        </div>
                    )}
            
                    {!isLoggedIn && (
                        <div className="m-item" title="Sign in">
                            <HvrMaster type={HvrMasterType.HANG}>
                                <CustomLink to="/user/login">
                                    <IoEnter size={42} />
                                </CustomLink>
                            </HvrMaster>
                        </div>
                    )}
                </div>

                <div className={"flex flx-row flx-center overflow-x-limit user-menu-line2"+(isLoggedIn ? " user-menu-line2-active" : "")}>
                    {isLoggedIn ? email : "g u e s t"}
                </div>

            </div>

        </div>
    );
}

export default UserMenu;
