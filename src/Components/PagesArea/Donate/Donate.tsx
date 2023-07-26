import "./Donate.css";

interface DonateProps {
	to: string;
    bank: number;
    branch: number;
    account: number;
}

function Donate(props: DonateProps): JSX.Element {
    return (
        <div className="Donate flex flx-col flx-start">
            
            <h1>Donate</h1>
            
            <span className="txt-l txt-drk">This is an open source todo application</span>
            
            <span className="txt-xl txt-drk"> Please open your ❤️ and give some 💰</span>
            
            <img
                src="https://media.giphy.com/media/ffzhLUixCtlsc/giphy.gif"
                
                alt="DONATE"
                className="home-img"
            />

			<span className="txt-l txt-drk">Donate now to : {props.to} | Account Details : {props.bank}-{props.branch}-{props.account}</span>

        </div>
    );
}

export default Donate;
