import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Footer = () => {
  const [FooterItems, setFooterItems] = useState([]);
  const [FooterLogo, setFooterLogo] = useState([]);
  const [footerMedia, setFooterMedia] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/menu/footermenu"
      )
      .then((res) => setFooterItems(res?.data));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/site/footerlogo"
      )
      .then((res) => setFooterLogo(res?.data));
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/site/footersociallinks"
      )
      .then((res) => setFooterMedia(res?.data));
  }, []);

  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 FooterDescriptionOne order-1">
              <Link to="/" className="FooterLogo">
                <img src={FooterLogo.logo_url} alt="" />
              </Link>
              <p dangerouslySetInnerHTML={{ __html: FooterLogo?.address }} />

              <p>{FooterLogo?.hours}</p>
              <p>{FooterLogo?.phone}</p>
              <Link to="/" className="d-lg-block d-none">
                Powered by PensionX
              </Link>
            </div>
            <div className="col-lg-4 FooterDescriptionTwo order-md-2 order-3 mt-lg-0 mt-5">
              {FooterItems.map((e, i) => {
                return (
                  <Link to="" key={i}>
                    {e.title}
                  </Link>
                );
              })}
              <a
                href="https://www.pensionx.com/"
                target="_blank"
                className="d-lg-none d-block fs-12 fs-300"
              >
                Powered by PensionX
              </a>
            </div>
            <div className="col-lg-4 FooterDescriptionThree order-md-3 order-2">
              <p>{footerMedia?.title}</p>
              <Link to="/">{footerMedia?.footer_social_meadia_butontext}</Link>
              <div className="FooterSocialLinks d-flex">
                <div className="FooterSocialIconsMain">
                  <a
                    href={footerMedia?.twitter_social_icon_link}
                    target="_blank"
                    className="TwitterLink"
                  >
                    <img src={footerMedia?.twitter_social_icon} alt="" />
                  </a>
                </div>
                <div className="FooterSocialIconsMain">
                  <a
                    href={footerMedia?.facebook_social_icon_link}
                    target="_blank"
                    className="FacebookLink"
                  >
                    <img src={footerMedia?.facebook_social_icon} alt="" />
                  </a>
                </div>
                <div className="FooterSocialIconsMain">
                  <a
                    href={footerMedia?.linkedin_social_icon_link}
                    target="_blank"
                    className="LinkedInLink"
                  >
                    <img src={footerMedia?.linkedin_social_icon} alt="" />
                  </a>
                </div>
                <div className="FooterSocialIconsMain">
                  <a
                    href={footerMedia?.instagram_social_icon_link}
                    target="_blank"
                    className="InstagramLink"
                  >
                    <img src={footerMedia?.instagram_social_icon} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
