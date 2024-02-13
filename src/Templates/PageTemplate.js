import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeaderBottom from "../Components/HeaderBottom";
import HerosTwo from "../Components/HerosTwo";
import FooterAboveImage from "../Components/FooterAboveImage";
import LeftSideBar from "../Components/LeftSideBar";
import RightSideBar from "../Components/RightSideBar";
import axios from "axios";
const PageTemplate = (props) => {
  const params = useParams();
  let pageSlug = params?.slug;
  const [pageData, setPageData] = useState([]);
  const [menuData, setMenuData] = useState();
  const [currentBackground, setCurrentBackground] = useState(false);
  useEffect(() => {
    getDataById();
  }, []);
  useEffect(() => {
    $(".CustomAccordianButtonOne")
      .unbind()
      .click(function () {
        $(this)
          .parent()
          .children(".CustomAccordianButtonOneCollapse")
          .slideToggle();
        $(this).find(".LineTwo").toggleClass("active");
      });
  });
  const getDataById = async () => {
    try {
      axios
        .get(
          "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/menu/mainmenu"
        )
        .then((res) => setMenuData(res?.data));
      axios
        .get(
          "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/wp/v2/pages?slug=" +
            pageSlug +
            ""
        )
        .then((res) => {
          setPageData(res.data);
         
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataById();
  }, [pageSlug]);
  useEffect(() => {
    if (pageData[0]?.acf?.header_background_image) {
      axios
        .get(
          "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/site/image_get_by_id/" +
            pageData[0]?.acf?.header_background_image
        )
        .then((resp) => {
          setCurrentBackground(resp?.data);
        });
    } else {
      setCurrentBackground(false);
    }
  }, [pageData]);
  function createMarkup(html) {
    return { __html: html?.rendered };
  }
  return (
    <>
      <Header />
      <HeaderBottom />
      {currentBackground && (
        <HerosTwo
          name={pageData && pageData.length > 0 && pageData[0]?.title?.rendered}
          background={currentBackground}
        />
      )}
      <section className="CoperaInnerPagesMainSection py-5">
        <div className="container">
          <div className="row ">
            {((pageData &&
              pageData.length > 0 &&
              pageData[0]?.acf?.page_template == "left") ||
              (pageData &&
                pageData.length > 0 &&
                pageData[0]?.acf?.page_template == "leftright")) && (
              <LeftSideBar
                parentPageId={
                  pageData && pageData.length > 0 && pageData[0]?.parent
                }
                pageId={pageData && pageData.length > 0 && pageData[0]?.id}
                menuData={menuData && JSON.stringify(menuData)}
              />
            )}

            <div
              className={
                pageData &&
                pageData.length > 0 &&
                pageData[0]?.acf?.page_template == "left"
                  ? "  left_sidebar   px-xl-5 px-3 col-lg-10"
                  : pageData &&
                    pageData.length > 0 &&
                    pageData[0]?.acf?.page_template == "right"
                  ? " right_sidebar   px-xl-5 px-3 col-lg-10"
                  : pageData &&
                    pageData.length > 0 &&
                    pageData[0]?.acf?.page_template == "leftright"
                  ? " leftright_sidebar   px-xl-5 px-3 col-lg-10"
                  : "  px-xl-5 px-3 col-xl-12 col-lg-12"
              }
            >
              <div className="row px-3">
                <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0">
                  <div
                    dangerouslySetInnerHTML={createMarkup(
                      pageData && pageData.length > 0 && pageData[0]?.content
                    )}
                  />
                </div>
                {((pageData &&
                  pageData.length > 0 &&
                  pageData[0]?.acf?.page_template == "right") ||
                  (pageData &&
                    pageData.length > 0 &&
                    pageData[0]?.acf?.page_template == "leftright")) && (
                  <RightSideBar
                    contentBoxes={
                      pageData &&
                      pageData.length > 0 &&
                      pageData[0]?.acf?.right_sidebar_boxes
                        ? JSON.stringify(
                            pageData &&
                              pageData.length > 0 &&
                              pageData[0]?.acf?.right_sidebar_boxes
                          )
                        : ""
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterAboveImage />
      <Footer />
    </>
  );
};

export default PageTemplate;
