import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            JOB <span>Tracking</span>
          </h1>
          <p>
            Welcome to your job tracking dashboard. Keep all your job
            applications organized and stay on top of your job search process.
            Whether you&apos;re actively searching for a new opportunity or just
            keeping track of your applications, Job Tracker has you covered.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job-image" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
