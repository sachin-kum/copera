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

const VideoLibrary = () => {
  const [pageData, setPageData] = useState([]);
  const [videoLibrary, setVideoLibrary] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/site/video_library"
      )
      .then((res) =>{ setVideoLibrary(res?.data)
      console.log(res?.data)});
  }, []);
  return (
    <>
      <Header />
      <HeaderBottom />

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
                  <h2>Video Library</h2>
                        <p>
                          PERA has a variety of videos for you to watch and
                          learn more about your retirement plan and better
                          understand your PERA benefits.
                        </p>
                        {videoLibrary.map((val) => {
                                  let slug = val?.termlink.split("/");
                                  slug = slug[slug.length - 2];
                          return (
                            <Link to={`/video-library/${slug}`} className="PagesLinksCards">
                              <div className="row m-0 border-top py-4">
                                <div className="col-lg-5 px-0">
                                  <div className="ImgBox">
                                    <img
                                      src={val?.image}
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-7">
                                  <h4>{val?.name}</h4>
                                  <p dangerouslySetInnerHTML={{__html:val?.content}}/>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
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
                              <h5>VideoLibraryletters</h5>
                              <p>
                                PERA publishes several VideoLibraryletters
                                throughout the year for our active membership,
                                inactive members, PERACare enrollees, retirees,
                                and employers.
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

export default VideoLibrary;
