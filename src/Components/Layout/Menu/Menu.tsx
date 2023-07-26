import { BsChatTextFill } from "react-icons/bs";
import { FaDonate } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import HvrMenuItem from "../../SharedArea/HvrMenuItem/HvrMenuItem";
import "./Menu.css";

function Menu(): JSX.Element {

  return (
    <div className="Menu flex flx-row flx-even menu-m-item">
      
      <div className="flex flx-col flx-center m-item" title="Home">
        <CustomLink to="/home">
          <HvrMenuItem to="/home" isSmall={false}>
            <MdHome size={50} />
          </HvrMenuItem>
        </CustomLink>
      </div>

      <div className="flex flx-col flx-center m-item" title="Donate">
        <CustomLink to="/donate">
          <HvrMenuItem to="/donate" isSmall={false}>
            <FaDonate size={45} />
          </HvrMenuItem>
        </CustomLink>
      </div>

      <div className="flex flx-col flx-center m-item" title="Contact Us">
        <CustomLink to="/contact-us">
          <HvrMenuItem to="/contact-us" isSmall={false}>
            <BsChatTextFill size={50} />
          </HvrMenuItem>
        </CustomLink>
      </div>

    </div>
    
  );
}

export default Menu;
