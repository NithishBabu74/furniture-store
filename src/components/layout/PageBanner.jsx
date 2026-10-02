import { Link } from "react-router-dom";
import BannerLogo from "../common/BannerLogo";
import bannerImage from "../../assets/home.jpeg";

export default function PageBanner({ title }) {
  return (
    <section
      className="shop-banner"
      style={{ "--banner-image": `url(${bannerImage})` }}
    >
      <BannerLogo />
      <h1>{title}</h1>
      <p>
        <Link to="/">
          <b>Home</b>
        </Link>{" "}
        › {title}
      </p>
    </section>
  );
}