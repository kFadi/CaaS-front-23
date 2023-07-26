import logoImage from '../../../Assets/Images/logo.svg';
import "./Logo.css";

function Logo(): JSX.Element {
  // TODO app version dynamically? version variable?
  return (
    <div className="Logo flex flx-row flx-center pointer">
      <img src={logoImage} alt="LOGO" title = "App Version 1.0" />
    </div>
  );
}

export default Logo;
