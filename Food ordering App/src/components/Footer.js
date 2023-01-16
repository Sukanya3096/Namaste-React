import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div class="container">
        <div class="row text-center">
          <div class="col-md-4 box">
            <span class="copyright quick-links">
              Copyright &copy; Hungry Panda {year}
            </span>
          </div>
          <div class="col-md-4 box">
            <ul class="list-inline social-buttons">
              <li class="list-inline-item">
                <a href="#">
                  <TwitterIcon />
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#">
                  <FacebookIcon />
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#">
                  <LinkedInIcon />
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-4 box">
            <ul class="list-inline quick-links">
              <li class="list-inline-item">
                <a href="#">Privacy Policy</a>
              </li>
              <li class="list-inline-item">
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
