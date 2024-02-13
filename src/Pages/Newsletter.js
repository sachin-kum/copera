import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeaderBottom from "../Components/HeaderBottom";
import { Link, useLocation, useParams } from "react-router-dom";
import HerosTwo from "../Components/HerosTwo";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import LeftSideBar from "../Components/LeftSideBar";
import FooterAboveImage from "../Components/FooterAboveImage";
import $ from "jquery";
import axios from "axios";
const About = () => {
  const [currentHeading, setCurrentHeading] = useState("News");
  const [currentBackground, setCurrentBackground] = useState("");

  const HandleAccordianCollapse = (e) => {
    $(e).parent().children(".CustomAccordianButtonOneCollapse").slideToggle();
    $(e).find(".LineTwo").toggleClass("active");
  };
  const [newsLetter, setnewsLetter] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/site/newsletters_cat"
      )
      .then((res) => setnewsLetter(res?.data?.data));
  }, []);

  console.log(newsLetter);
  const handleTitle = (e) => {
    setCurrentHeading(e.innerHTML);
  };
  let location = useLocation();
  const [activeTabPane, setActiveTabPane] = useState(location.state || 0);
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
      });
  }, [pageSlug]);

  return (
    <>
      <Header />
      <HeaderBottom changeTabPane={setActiveTabPane} />
      <HerosTwo name={currentHeading} background={currentBackground} />
      <section className="CoperaInnerPagesMainSection py-5">
        <div className="container">
          <Tab.Container id="left-tabs-example" activeKey={activeTabPane}>
            <Row>
              <LeftSideBar
                parentPageId={
                  pageData && pageData.length > 0 && pageData[0]?.parent
                }
              />
              {/* <Col lg={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link
                      onClick={(e) => {
                        setActiveTabPane(0)
                        handleTitle(e.target);
                      }}
                      eventKey={0}
                    >
                      News
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={(e) => {
                        setActiveTabPane(1)
                        handleTitle(e.target);
                      }}
                      eventKey={1}
                    >
                      Media and Press Releases
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={(e) => {
                        setActiveTabPane(2)
                        handleTitle(e.target);
                      }}
                      eventKey={2}
                    >
                      Newsletters
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={(e) => {
                        setActiveTabPane(3);
                        handleTitle(e.target);
                      }}
                      eventKey={3}
                    >
                      PERA on the Issues
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col> */}
              <Col lg={10} className=" px-lg-5 px-3">
                <Tab.Content>
                  <Tab.Pane eventKey={2}>
                    <div className="row px-3">
                      <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0">
                        <h2>Newsletters</h2>
                        <p>
                          PERA publishes several newsletters throughout the year
                          for our active membership, inactive members, PERACare
                          enrollees, retirees, and employers.
                        </p>
                        {newsLetter?.map((val) => {
                          let slug = val?.term_link.split("/");
                          slug = slug[slug.length - 2];
                          return (
                            <Link
                              to={`/newsletter_categories/${slug}`}
                              className="PagesLinksCards"
                            >
                              <div className="row  border-top py-4 m-0">
                                <div className="col">
                                  <h4>{val?.name}</h4>
                                  <p>{val?.description}</p>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="col-xl-3 col-lg-4"> </div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
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

export default About;
