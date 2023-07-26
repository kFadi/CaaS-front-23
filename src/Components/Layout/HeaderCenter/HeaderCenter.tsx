import Logo from "../../SharedArea/Logo/Logo";
import "./HeaderCenter.css";

function HeaderCenter(): JSX.Element {
    return (
        <div className="HeaderCenter flex flx-row flx-center">
			<Logo/>
        </div>
    );
}

export default HeaderCenter;
