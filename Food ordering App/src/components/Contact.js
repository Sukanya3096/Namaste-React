import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import MapIcon from "@mui/icons-material/Map";
import DraftsIcon from "@mui/icons-material/Drafts";

const Contact = () => {
  return (
    <main>
      <div className="mainContainer">
        <section className="contact_us">
          <div className="container">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <div className="contact_inner">
                  <div className="row">
                    <div className="col-md-10">
                      <div className="contact_form_inner">
                        <div className="contact_field">
                          <h3>Contact Us</h3>
                          <p>
                            Feel Free to contact us any time. We will get back
                            to you as soon as we can!.
                          </p>
                          <input
                            type="text"
                            className="form-control form-group"
                            placeholder="Name"
                          />
                          <input
                            type="text"
                            className="form-control form-group"
                            placeholder="Email"
                          />
                          <textarea
                            className="form-control form-group"
                            placeholder="Message"
                          ></textarea>
                          <button className="contact_form_submit">Send</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="right_conatct_social_icon d-flex align-items-end">
                        <div className="social_item_inner d-flex">
                          <li>
                            <a href="#">
                              <i className="fab fa-facebook-square"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-instagram"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-twitter"></i>
                            </a>
                          </li>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="contact_info_sec">
                    <h4>Contact Info</h4>
                    <div className="d-flex info_single align-items-center">
                      <HeadsetMicIcon />
                      <span className="px-4">+91 8009 054294</span>
                    </div>
                    <div className="d-flex info_single align-items-center">
                      <DraftsIcon />
                      <span className="px-4">info@hungryPanda.com</span>
                    </div>
                    <div className="d-flex info_single">
                      <MapIcon />
                      <span>Baidyabati, hooghly, West Bengal - 712222</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;
