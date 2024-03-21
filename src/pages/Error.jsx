import { Link, useRouteError } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import WrapperError from "../assets/wrappers/ErrorPage";

const Error = () => {
  const error = useRouteError();

  // Cek Status Code (Server)
  if (error.status === 404) {
    return (
      <WrapperError>
        <div>
          <img src={img} alt="img-not-found" />
          <h3>Oops...! Page is Not Found</h3>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p>We can't seem to find the page that you are looking for.</p>
          <div className="button-container">
            <Link className="button-link" to="/">
              Return to Home
            </Link>
          </div>
        </div>
      </WrapperError>
    );
  }

  return (
    <WrapperError>
      <div>
        <h3>Something Went Wrong</h3>
      </div>
    </WrapperError>
  );
};

export default Error;
