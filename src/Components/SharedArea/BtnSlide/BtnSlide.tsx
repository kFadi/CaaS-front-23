import "./BtnSlide.css";

interface BtnSlideProps {
    fcn: Function;
    icn1: any;
    icn2: any;
    txt: string;
}

function BtnSlide(props: BtnSlideProps): JSX.Element {
    
    const go = () => {
        props.fcn();
    }

    return (
        <div className="BtnSlide">
            
            <button className="btn-slide" onClick={go}>
                <span className="btn-slide-crcl" >
                    <span className="btn-slide-icn1"> {props.icn1} </span>
                    <span className="btn-slide-icn2"> {props.icn2} </span>
                </span>
                <span className="btn-slide-txt">{props.txt}</span> 
            </button>

        </div>
    );
}

export default BtnSlide;
