import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { IoLanguage } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";
import $ from "jquery";
import axios from "axios";
const handleSearchListItem = (e) => {
  $(".headerMenuListItems").toggleClass("active");
  $(".headerMenuSearchItems").toggleClass("d-flex");
  $("#HeaderMainContainer").toggleClass("overflow-hidden");
};
const handleMobileMenuItemsAccordian = (e) => {
  $(e).siblings().find(".lineOne").toggleClass("active");
  $(e)
    .parent()
    .parent()
    .parent()
    .siblings()
    .find(".lineOne")
    .removeClass("active");
  $(e)
    .parent()
    .parent()
    .parent()
    .children(".MobileHeaderAccordianCollapse")
    .slideToggle();
  $(e)
    .parent()
    .parent()
    .parent()
    .siblings()
    .children(".MobileHeaderAccordianCollapse")
    .slideUp();
};
const handleMobileDropdown = (e) => {
  $(e).parent().children("ul").toggleClass("active");
  $(".HeaderMobileDropDown").slideToggle();
};
const handleMouseOver = (e) => {
  $(e).children(".HeaderLinksDropdown").show();
};
const handleMouseLeave = (e) => {
  $(e).children(".HeaderLinksDropdown").hide();
  $(e).siblings().children(".HeaderLinksDropdown").hide();
};
const handleDropdownMouseLeave = (e) => {
  $(e).parentsUntil("li").siblings().children(".HeaderLinksDropdown").hide();
  $(e).parents("li").children(".HeaderLinksDropdown").hide();
};
const handleMouseEnter = (e) => {
  $(e).children(".HeaderLinksDropdown").show();
  $(e).siblings().children(".HeaderLinksDropdown").hide();
};

const HeaderBottom = () => {
  const [headerItem, setHeaderItem] = useState([]);
  const [siteLogo, setSiteLogo] = useState([]);
  const [buttonText, setButtonText] = useState([]);
  const location = useLocation();
  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/menu/logomenu"
      )
      .then((res) => setButtonText(res?.data[0]?.title));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/menu/mainmenu"
      )
      .then((res) => setHeaderItem(res?.data));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/site/logo"
      )
      .then((res) => setSiteLogo(res?.data));
  }, []);
  return (
    <>
      <header>
        <div
          className="container position-relative h-100 "
          id="HeaderMainContainer"
        >
          <nav className="d-flex flex-lg-row flex-column align-items-center justify-content-between w-100 py-3">
            <Link
              to="/"
              className="HeaderLogoLink d-flex justify-content-between align-items-center"
            >
              <img src={siteLogo.logo_url} alt="copera logo" />
              <div className="MobileHamburgerMenuButtonMain d-block d-lg-none">
                <div
                  onClick={(e) => handleMobileDropdown(e.target)}
                  className="MobileHamburgerMenuButton"
                ></div>
                <ul className="MobileHamburgerMenuUl">
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </Link>
            <div>
              <Link
                to="/"
                className="headerLoginRegistrationBtn mt-lg-0 mt-3 d-block"
              >
                {buttonText}
              </Link>
            </div>
          </nav>
          <ul className="  justify-content-end m-0 headerMenuListItems  p-0">
            {headerItem.map((val, index) => {
              let url = val?.url;
              let slug = url.split("/");
              slug = slug[slug.length - 2];
              return (
                <li
                  id="MembersMenu"
                  key={index}
                  onMouseLeave={(e) => handleMouseLeave(e.target)}
                  onMouseOver={(e) => handleMouseOver(e.target)}
                  onMouseEnter={(e) => handleMouseEnter(e.target)}
                >
                  <Link to={`/${slug}`}>
                    <span dangerouslySetInnerHTML={{ __html: val?.title }} />
                  </Link>
                  <div
                    className="HeaderLinksDropdown"
                    onMouseLeave={(e) => handleDropdownMouseLeave(e.target)}
                    onMouseOver={(e) => handleMouseOver(e.target)}
                  >
                    <div className="d-flex flex-column ">
                      {val.submenu.map((sub, i) => {
                        let subSlug = sub?.url.split("/");
                        subSlug = subSlug[subSlug.length - 2];
                        return (
                          <Link
                            className="d-block text-white HeaderDropDownListItem "
                            key={i}
                            to={`/${subSlug}`}
                            state={i + 1}
                          >
                            {sub.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })}
            <li>
              <Link to="/">
                <IoLanguage />
              </Link>
            </li>
            <li onClick={(e) => handleSearchListItem(e.target)}>
              <Link to="/">
                <FiSearch />
              </Link>
            </li>
          </ul>
          <ul className="headerMenuSearchItems justify-content-end align-items-center m-0 p-0">
            <form className="d-flex align-items-end">
              <div className="d-flex flex-column  mb-3">
                <span>Site</span>
                <span>Search</span>
              </div>
              <input type="text" />

              <button type="submit" onClick={(e) => e.preventDefault()}>
                <FiSearch />
              </button>
              <button
                type="button"
                onClick={(e) => handleSearchListItem(e.target)}
              >
                <FiX />
              </button>
            </form>
          </ul>
        </div>
      </header>
      <div className="HeaderMobileDropDown d-lg-none">
        <div className="row m-0">
          <div className="col-md px-4 mt-4">
            <div className="d-flex align-items-center MobileMenuSearchBarMain">
              <input type="text" />
              <button type="submit">
                <RiSearchLine />
              </button>
            </div>
          </div>
          <div className="col-md px-4 mt-md-4 mt-0 ">
            <div className="MobileHeaderTranslateBox">
              <button>
                <IoLanguage /> Translate
              </button>
            </div>
          </div>
        </div>
        {headerItem.map((val, index) => {
          let url = val?.url;
          let slug = url.split("/");
          slug = slug[slug.length - 2];
          return (
            <div className="MobileHeaderAccordian" key={index}>
              <div className="d-flex px-4 align-items-center">
                <Link to={`/${slug}`} className="w-100">
                  {val?.title}
                </Link>
                <div className="HeaderMobileDropDownAccordianButtonMain ">
                  <div className="LinesMain">
                    <div className="position-relative">
                      <div className="lineOne"></div>
                      <div className="lineTwo"></div>
                    </div>
                  </div>
                  <div
                    className="HeaderMobileDropDownAccordianButton"
                    onClick={(e) => {
                      handleMobileMenuItemsAccordian(e.target);
                    }}
                  ></div>
                </div>
              </div>
              <div className="MobileHeaderAccordianCollapse">
                {val.submenu.map((sub, i) => {
                  return (
                    <Link
                      className="d-block HeaderAccordianSubMenus px-5"
                      key={i}
                      to={`/${slug}`}
                      state={i + 1}
                    >
                      {sub.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HeaderBottom;
