import HvrMaster, { HvrMasterType } from "../HvrMaster/HvrMaster";
import "./YesNo.css";

interface YesNoProps {
    title: string;
    yes: Function;
    no: Function;
    children: any;
}

function YesNo(props: YesNoProps): JSX.Element {


    const goNo = () => {
        props.no();
    }
    
    const goYes = () => {
        props.yes();
    }
    
    return (
        <div className="YesNo flex flx-col flx-start">
            <h1>{props.title}</h1>
            <div className="flex flx-col flx-start f-form-yes-no">
                {props.children}
                <div className="flex flx-row flx-center f-btns-yes-no">
                    <HvrMaster type={HvrMasterType.FLOAT}><button onClick={goNo} className="f-btn"> No </button></HvrMaster>
                    <HvrMaster type={HvrMasterType.FLOAT}><button onClick={goYes} className="f-btn-danger"> Yes </button></HvrMaster>
                </div>
            </div>
        </div>
    );
}

export default YesNo;
