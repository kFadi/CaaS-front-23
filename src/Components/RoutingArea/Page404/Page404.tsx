import "./Page404.css";

function Page404(): JSX.Element {
  return (
    <div className="Page404 flex flx-col flx-start">

      <h1>Page Not Found</h1>

      <div /*style="width:480px"*/>

        <iframe 
          allow="fullscreen" 
          frameBorder="0" 
          height="480" 
          src="https://giphy.com/embed/3wqPlXmRxVs3S1u8yR/video" 
          width="480" 
          className="single-gif">

        </iframe>

      </div>

    </div>
  );
}

export default Page404;
