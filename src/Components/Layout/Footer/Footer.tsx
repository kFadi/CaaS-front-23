import Credit from "../../SharedArea/Credit/Credit";
import Social from "../../SharedArea/Social/Social";
import "./Footer.css";

function Footer(): JSX.Element {
  return (
    <div className="Footer flex flx-row flx-center">
      <Social />
      <Credit />
    </div>
  );
}

export default Footer;
