import React from "react";
import $ from "jquery";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const HandleHerosSectionDropdown = () => {
  $(".HerosSectionDropdown.active").slideToggle();
  $(
    ".HerosSectionDropdownButton .HerosSectionDropdownButtonIcon .lines"
  ).toggleClass("active");
};

const HerosBanner = () => {
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/wp/v2/pages?slug=home"
      )
      .then((res) => setBanner(res?.data[0]));
  }, []);
  return (
    <>
      <section className="herosSectionHomePage">
        <div className="filter h-100 w-100">
          <div className="container">
            <div className="col-xl-5 col-md-8">
              <h1>{banner?.acf?.banner_title}</h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: banner?.acf?.banner_description,
                }}
              />
              <div className="HerosSectionDropdownMain">
                <button
                  className="HerosSectionDropdownButton"
                  onClick={HandleHerosSectionDropdown}
                >
                  {banner?.acf?.banner_menus}
                  <div className="HerosSectionDropdownButtonIcon">
                    <div className="lines">
                      <div className="lineOne"></div>
                      <div className="lineTwo"></div>
                    </div>
                  </div>
                </button>
                <div className="HerosSectionDropdown active">
                  {banner?.acf?.banner_menu_items.map((data, index) => {
                    return (
                      <Link to="#" key={index}>
                        {data?.item_name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HerosBanner;
