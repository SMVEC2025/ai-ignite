import { Link, useNavigate } from "react-router-dom";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialYoutube } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer1() {
  const navigate = useNavigate();
  const handlenavigate = (path) => {
    try {
      navigate(path);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <footer id="footer">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-12">
            <div className="footer-top">
              <div className="logo-footer" id="logo-footer">
                <Link href={`/`}>
                  <img
                    id="logo_footer"
                    src="/footerlogo.png"
                    alt="image"
                    width={166}
                    height={40}
                    data-retina="/assets/images/logo/logo@2x.png"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <p className="footer-logo-bottom">
              Innovation is the spark of progress,<br/>
              empowering minds to build the future.
            </p>
            <ul className="wg-social">
              <li >
                <a href="https://www.facebook.com/SMVECOfficial" target="_blank"><SlSocialFacebook /></a>
              </li>
              <li>
                <a href="https://www.youtube.com/@official_smvec" target="_blank"><SlSocialYoutube /></a>
              </li>
              <li>
                <a href="https://x.com/SMVEC2" target="_blank"><FaXTwitter /></a>
              </li>
              <li>
                <a href="https://www.instagram.com/smvec_official/?igsh=MXJmNmY5cmVueHJh" target="_blank"><FaInstagram /></a>
              </li>
              <li>
                <a href="https://api.whatsapp.com/send/?phone=919344916320&text&app_absent=0" target="_blank"><FaWhatsapp /></a>
              </li>
            </ul>
          </div>
          <div className="col-md-2">
            <div className="footer-title ml-35">Quick links</div>
            <ul className="wg-menu ml-35">
              <li >
                <span onClick={() => handlenavigate('/team')}>
                  Team
                </span>
              </li>
              <li >
                <span onClick={() => handlenavigate('/timeline')}>Timeline</span>
              </li>
              <li >
                <span onClick={() => handlenavigate('/problem')}>Problem Statements</span>
              </li>
              <li >
                <span onClick={() => handlenavigate('/announcements')}>Announcements</span>
              </li>

            </ul>
          </div>
          <div className="col-md-2">
            <div className="footer-title">Help</div>
            <ul className="wg-menu">
              <li >
                <span onClick={() => handlenavigate('/contact-us')}>Contact Us</span>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <div className="footer-title ml--3">Newsletter</div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="comment-form mt-40 ml--3"
            >
              <fieldset className="email">
                <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  className="style-1 mb-10"
                  name="email"
                  tabIndex={2}
                  defaultValue=""
                  aria-required="true"
                  required
                />
              </fieldset>
              <div className="">
                <button className="" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-12">
            <div className="footer-bottom">
              <p className="text mb-0">
                Copyright @{new Date().getFullYear()},{" "}
                <a className="tf-color" href="https://smvec.ac.in" target="_blank">
                  SMVEC
                </a>{" "}
                All Rights Reserved in partnership with 
                {" "}
                 <a className="tf-color" href="https://www.llmatscale.ai" target="_blank">
                  LLMatScale.ai
                </a>{" "}
              </p>
              <ul className="">
                <li>
                  <span onClick={() => handlenavigate('/terms-and-conditions')}>Terms Of Use </span>
                </li>
                <li>
                  <span onClick={() => handlenavigate('/privacy-policy')}>Privacy Policy</span>
                </li>
                <li>
                  <span onClick={() => handlenavigate('/faqs')}>FAQs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
