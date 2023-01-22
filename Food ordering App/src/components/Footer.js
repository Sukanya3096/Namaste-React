import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="row text-center">
          <div className="col-md-4 box">
            <span className="copyright quick-links">
              Copyright &copy; Hungry Panda {year}
            </span>
          </div>
          <div className="col-md-4 box">
            <ul className="list-inline social-buttons">
              <li className="list-inline-item">
                <a href="#">
                  <TwitterIcon />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <FacebookIcon />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <LinkedInIcon />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 box">
            <ul className="list-inline quick-links">
              <li className="list-inline-item">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="list-inline-item">
                <a href="#">Terms of Use</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
