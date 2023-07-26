

import UserMenu from "../../UserArea/UserMenu/UserMenu";
import "./HeaderRight.css";

function HeaderRight(): JSX.Element {
    return (
        <div className="HeaderRight flex flx-row flx-center">
			<UserMenu/>
        </div>
    );
}

export default HeaderRight;
