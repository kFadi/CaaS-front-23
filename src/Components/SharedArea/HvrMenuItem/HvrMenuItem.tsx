import { useLocation, useMatch, useResolvedPath } from "react-router-dom";
import "./HvrMenuItem.css";

interface HvrMenuItemProps {
    children: any;
    to: string;
    isSmall: boolean;
}

function getClsnm(isInactive: boolean, isSmall: boolean) : string {
    
    let str="";

    if (isSmall){
        str+= "hvrmi-small" + ( isInactive ? "-inactive" : "");
    } else {
        str+= "hvrmi" + ( isInactive ? "-inactive" : "");
    }
  
    return str;
}


function HvrMenuItem(props: HvrMenuItemProps): JSX.Element {

    let resolved = useResolvedPath(props.to);
    let match = useMatch({ path: resolved.pathname, end: true });
    // -------------------------------
    const location = useLocation();
    const isRootAndHome = location.pathname==='/' && props.to==="/home";
    // -------------------------------


    const clsnm = getClsnm( ((match||isRootAndHome)? true:false), props.isSmall);

    return (
        <div className="HvrMenuItem">

            {/* <div className={"hvrmi"+((match||isRootAndHome) ? "-inactive" : "")}> */}
            <div className={clsnm}>
                {props.children}
            </div>
			
        </div>
    );
}

export default HvrMenuItem;
