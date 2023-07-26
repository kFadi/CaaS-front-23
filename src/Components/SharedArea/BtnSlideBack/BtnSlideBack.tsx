import "./BtnSlideBack.css";

interface BtnSlideBackProps {
    fcn: Function;
    icn1: any;
    icn2: any;
    txt: string;
}

function BtnSlideBack(props: BtnSlideBackProps): JSX.Element {

    const go = () => {
        props.fcn();
    }

    return (
        <div className="BtnSlideBack">

            <button className="btn-slide-back" onClick={go}>
                <span className="btn-slide-back-txt">{props.txt}</span>
                <span className="btn-slide-back-crcl" >
                    <span className="btn-slide-back-icn1"> {props.icn1} </span>
                    <span className="btn-slide-back-icn2"> {props.icn2} </span>
                </span>
            </button>
			
        </div>
    );
}

export default BtnSlideBack;
