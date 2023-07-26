import "./EmptyView.css";
interface EmptyViewProps {
  msg: string;
}

function EmptyView(props: EmptyViewProps): JSX.Element {
  return (
    <div className="EmptyView flex flx-col flx-start">
      <div className="txt-xl txt-drk">{props.msg}</div>
      <img className="single-gif"
        src="https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif"
        alt="funny"
      />
    </div>
  );
}

export default EmptyView;
