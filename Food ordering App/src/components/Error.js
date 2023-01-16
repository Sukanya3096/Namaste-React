import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);

  let errorRender = (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>

                <p>the page you are looking for not available!</p>

                <Link to="/" className="link_404">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  if (err.status === 500) {
    errorRender = (
      <div className="container">
        <img src="https://i.imgur.com/qIufhof.png" />

        <h1>
          <span>500</span> <br />
          Internal server error
        </h1>
        <p>We are currently trying to fix the problem.</p>
      </div>
    );
  }

  return <>{errorRender}</>;
};

export default Error;
