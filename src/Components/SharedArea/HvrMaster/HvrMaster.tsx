import "./HvrMaster.css";

interface HvrMasterProps {
    children: any;
    type: HvrMasterType;
}

function HvrMaster (props: HvrMasterProps): JSX.Element {

    return (
        
        <div className="HvrMaster">

            <div className={"hvr-"+props.type}>
                {props.children}
            </div>
    
        </div>
    );
}

export default HvrMaster;

/* ############################################### */
/* ############################################### */

export enum HvrMasterType {
    NONE = "",
    FLOAT = "float",
    BOB = "bob",
    HANG = "hang",
    WOBBLE_TOP = "wobble-top",
  }
  

  /* ############################################### */
  /* ############################################### */
