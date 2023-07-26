import logoGlitchImage from "../../../Assets/Images/logo_glitch.svg";
import logoTextImage from "../../../Assets/Images/logo_text.svg";
import "./Home.css";

function Home(): JSX.Element {
  return (
    <div className="Home flex flx-col flx-start">
      
      <img src={logoTextImage} alt="" className="home-logo-text"/>
      
      <p className="txt-l txt-drk">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s..
      </p>
      
      <img src={logoGlitchImage} alt="" className="home-logo-glitch"/>

      <img
        src="https://media.giphy.com/media/K7hFIJckT3cG0I041Q/giphy.gif"
        alt="Home"
        className="home-img"
      />

      <p className="txt-l txt-drk">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>

    </div>
  );
}

export default Home;
