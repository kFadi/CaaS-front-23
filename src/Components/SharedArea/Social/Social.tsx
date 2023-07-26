import {
    FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn,
    FaPinterestP, FaTwitter, FaWhatsapp, FaYoutube
} from "react-icons/fa";
import "./Social.css";

function Social(): JSX.Element {
  
  const s: number = 28;

  return (
    <div className="Social flex flx-row flx-center">

      <div className="social-wrapper">
        <div className="icon whatsapp">
          <span className="tooltip">Youtube</span>
          <a href="https://www.whatsapp.com/" target={"_blank"}> <span><FaWhatsapp size={s}/></span> </a>
        </div>
        <div className="icon facebook">
          <span className="tooltip">Facebook</span>
          <a href="https://www.facebook.com/" target={"_blank"}> <span><FaFacebookF size={s}/></span> </a>
        </div>
        <div className="icon instagram">
          <span className="tooltip">Instagram</span>
          <a href="https://www.instagram.com/" target={"_blank"}> <span><FaInstagram size={s}/></span> </a>
        </div>
        <div className="icon twitter">
          <span className="tooltip">Twitter</span>
          <a href="https://www.twitter.com" target={"_blank"}> <span><FaTwitter size={s}/></span> </a>
        </div>
        <div className="icon pinterest">
          <span className="tooltip">Pinterest</span>
          <a href="https://www.pinterest.com/" target={"_blank"}> <span><FaPinterestP size={s}/></span> </a>
        </div>
        <div className="icon github">
          <span className="tooltip">Github</span>
          <a href="https://github.com/" target={"_blank"}> <span><FaGithub size={s}/></span> </a>
        </div>
        <div className="icon linkedin">
          <span className="tooltip">Linkedin</span>
          <a href="https://www.linkedin.com/" target={"_blank"}> <span><FaLinkedinIn size={s}/></span> </a>
        </div>
        <div className="icon youtube">
          <span className="tooltip">Youtube</span>
          <a href="https://www.youtube.com/" target={"_blank"}> <span><FaYoutube size={s}/></span> </a>
        </div>
      </div>

    </div>
  );
}

export default Social;
