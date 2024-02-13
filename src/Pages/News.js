import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import HeaderBottom from "../Components/HeaderBottom";
import HerosTwo from "../Components/HerosTwo";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Link, useParams } from "react-router-dom";
import FooterAboveImage from "../Components/FooterAboveImage";
import $ from "jquery";
import Footer from "../Components/Footer";
import axios from "axios";
import LeftSideBar from "../Components/LeftSideBar";

const News = () => {
  const HandleAccordianCollapse = (e) => {
    $(e).parent().children(".CustomAccordianButtonOneCollapse").slideToggle();
    $(e).find(".LineTwo").toggleClass("active");
  };
  const [pressRelease, setpressRelease] = useState([]);
  const [pageData, setPageData] = useState([]);
  const params = useParams();
  const pageSlug = params?.slug;
  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/site/media_and_press_releases_posts"
      )
      .then((res) => {
        console.log(res?.data?.data, "awdawdawdawdawdwadawdawdawdawdawdawdaw");
        setpressRelease(res?.data?.data);
      });
  }, []);
  useEffect(() => {
    console.log(pressRelease);
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/wp/v2/pages?slug=news"
      )
      .then((res) => {
        setPageData(res.data);
        console.log(res.data,"hhawdkwandfokawjndiowandiowadwadwa news api")
      });
  }, [pageSlug]);
  return (
    <>
      <Header />
      <HeaderBottom />
      <HerosTwo />
      <section className="CoperaInnerPagesMainSection py-5">
        <div className="container">
          <Tab.Container id="left-tabs-example">
            <Row>
              <LeftSideBar
                parentPageId={
                  pageData && pageData.length > 0 && pageData[0]?.parent
                }
              />
              <Col lg={10} className=" px-lg-5 px-3">
                <div className="row px-3">
                  <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0">
                    <h2>News</h2>
                    <h5 className="headingBlack">Media Contact</h5>
                    <p>
                      <a href="" className="ThemeLinksAncor">
                        Patrick von Keyserling
                      </a>
                      , Senior Director of Communications
                    </p>
                    <p>Phone: 303-863-3814</p>
                    <p>
                      For media requests only. If you are a member with
                      questions about your PERA account, call 1-800-759-PERA
                      (7372).
                    </p>
                    <div className="CustomAccordianButtonOneMain">
                      <button
                        className="CustomAccordianButtonOne"
                        onClick={(e) => {
                          HandleAccordianCollapse(e.target);
                        }}
                      >
                        <span> Press Releases </span>
                        <span>
                          <div className="LineBox">
                            <div className="LineOne"></div>
                            <div className="LineTwo"></div>
                          </div>
                        </span>
                      </button>
                    </div>
                    {pressRelease?.slice(0, 4).map((val, index) => {
                          let slug = val?.slug.split("/");
                          slug = slug[slug.length - 2];
                          console.log(slug,"kunal is a good boy")
                      return (
                        <Link    to={`/newspost/${slug}`}
                        state={val?.post_id} key={index}>
                          <div className="row  border-top py-4 m-0">
                            {val?.image && (
                              <div className="col-md-5 px-0">
                                <div className="ImgBox">
                                  <img
                                    src={val?.image}
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                              </div>
                            )}
                            <div className="col-md">
                              <h4>{val?.name}</h4>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                    <h4 className="mt-4">
                      <a href="" className="ThemeLinksAncor">
                        See All
                      </a>
                    </h4>
                  </div>
                  <div className="col-xl-3 col-lg-4">
                    <aside>
                      <div className="row flex-column">
                        <Link to="/employees" className="AsideCardsMain">
                          <div className="col ">
                            <div className="AsideCards">
                              <h5>About</h5>
                              <p>
                                Colorado Public Employees' Retirement
                                Association (PERA) provides retirement and other
                                benefits to the employees of more than 500
                                government agencies…
                              </p>
                            </div>
                          </div>
                        </Link>
                        <Link to="/employees" className="AsideCardsMain">
                          <div className="col ">
                            <div className="AsideCards">
                              <h5>Newsletters</h5>
                              <p>
                                PERA publishes several newsletters throughout
                                the year for our active membership, inactive
                                members, PERACare enrollees, retirees, and
                                employers.
                              </p>
                            </div>
                          </div>
                        </Link>
                        <Link to="/employees" className="AsideCardsMain">
                          <div className="col ">
                            <div className="AsideCards">
                              <h5>PERA on the Issues</h5>
                              <p>
                                Retirement insights from a Colorado PERA
                                perspective.
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </aside>
                  </div>
                </div>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </section>
      <FooterAboveImage />
      <Footer />
    </>
  );
};

export default News;
