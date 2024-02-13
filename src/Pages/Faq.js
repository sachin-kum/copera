import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeaderBottom from "../Components/HeaderBottom";
import { Link,useLocation } from "react-router-dom";
import HerosTwo from "../Components/HerosTwo";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import FooterAboveImage from "../Components/FooterAboveImage";
import axios from "axios";
 
import $ from "jquery";
const About = () => {
  const [aboutData, setAboutData] = useState([]);

  function createMarkup(html) {
    console.log(html);
    return { __html: html.rendered };
  }

  const FinancialWellnessCardData = async () => {
    const datas = await axios.get(
      "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/site/financial_wellness_library"
    );
    setFinancialWellnessCard(datas.data);
  };

  const AboutData = async () => {
    const res = await axios.get(
      "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/wp/v2/pages?slug=about"
    );
    setAboutData(res.data);
  };

  const [currentHeading, setCurrentHeading] = useState("About");
  const [currentBackground, setCurrentBackground] = useState("");
  const [financialWellnessCard, setFinancialWellnessCard] = useState([]);
  const [videoLibrary, setVideoLibrary] = useState([]);
  const [FAQ, setFAQ] = useState([]);

  const HandleAccordianCollapse = (e) => {
    $(e).parent().children(".CustomAccordianButtonOneCollapse").slideToggle();
    $(e).find(".LineTwo").toggleClass("active");
  };
  const handleTitle = (e) => {
    setCurrentHeading(e.innerHTML);
  };
  const getFAQ = async () => {
    const data = await axios.get(
      "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/site/perafaqs"
    );
    setFAQ(data.data);
  };
  useEffect(() => {
    AboutData();
    FinancialWellnessCardData();
    getFAQ();
  }, []);

  const [openRecords, setOpenRecords] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/wp/v2/pages?slug=colorado-open-records-act-policy"
      )
      .then((res) => {
        setOpenRecords(res?.data[0]);
      });
  }, []);
  const [peraTownHall, setPeraTownHall] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/wp/v2/pages?slug=pera-town-hall"
      )
      .then((res) => {
        setPeraTownHall(res?.data[0]);
      });
  }, []);

  const [legislation, setLegislation] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/wp/v2/pages?slug=legislation"
      )
      .then((res) => {
        setLegislation(res?.data[0]);
      });
  }, []);
  const [boardTrustee, setboardTrustee] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/wp/v2/pages?slug=board-of-trustees"
      )
      .then((res) => {
        setboardTrustee(res?.data[0]);
      });
  }, []);
  const [career, setCareer] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/wp/v2/pages?slug=careers"
      )
      .then((res) => {
        setCareer(res?.data[0]);
      });
  }, []);


  let location = useLocation();
  const [activeTabPane,setActiveTabPane] = useState( location.state || 0)







  return (
    <>
      <Header />
      <HeaderBottom changeTabPane={setActiveTabPane}/>
      <HerosTwo name={currentHeading} background={currentBackground} />
      <section className="CoperaInnerPagesMainSection py-5">
        <div className="container">
          <Tab.Container id="left-tabs-example" activeKey={activeTabPane}>
            <Row>
              <Col lg={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link
                      onClick={(e) => {
                        setActiveTabPane(0)
                        handleTitle(e.target);
                      }}
                      eventKey={0}
                    >
                      About
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={(e) => {setActiveTabPane(1)
                        handleTitle(e.target);
                      }}
                      eventKey={1}
                    >
                      Board of Trustees
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
                      Legislation
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={(e) => {
                        setActiveTabPane(3)
                        handleTitle(e.target);
                      }}
                      eventKey={3}
                    >
                      Town Hall Meetings
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={(e) => {
                        setActiveTabPane(4)
                        handleTitle(e.target);
                      }}
                      eventKey={4}
                    >
                      Financial Wellness Library
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={(e) => {
                        setActiveTabPane(5)
                        handleTitle(e.target);
                      }}
                      eventKey={5}
                    >
                      Video Library
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={(e) => {
                        setActiveTabPane(6)
                        handleTitle(e.target);
                      }}
                      eventKey={6}
                    >
                      FAQs
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={(e) => {setActiveTabPane(7)
                        handleTitle(e.target);
                      }}
                      eventKey={7}
                    >
                      Careers
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={(e) => {

                        setActiveTabPane(8)
                        handleTitle(e.target);
                      }}
                      eventKey={8}
                    >
                      Colorado Open Records Act
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={(e) => {
                        setActiveTabPane(9)
                        handleTitle(e.target);
                      }}
                      eventKey={9}
                    >
                      Ambassador Program
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col lg={10} className=" px-lg-5 px-3">
                <Tab.Content>
          
                  <Tab.Pane eventKey={6}>
                    <div className="row px-3">
                      <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0">
                        <h2>PERA Frequently Asked Questions</h2>
                        {FAQ.map((val) => {
                          return (
                            <Link to="/about">
                              <div className="row py-4  border-top m-0">
                                <h3>{val.name}</h3>
                                <p>
                                  {" "}
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: val.descrption,
                                    }}
                                  />
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="col-xl-3 col-lg-4">
                        <aside>
                          <div className="row flex-column">
                            <Link to="/about" className="AsideCardsMain">
                              <div className="col ">
                                <div className="AsideCards">
                                  <h5>Contact Us</h5>
                                  <p>
                                    Not finding what you're looking for or have
                                    an account-specific question? Call us or
                                    send a secure email.
                                  </p>
                                </div>
                              </div>
                            </Link>
                            <Link to="/about" className="AsideCardsMain">
                              <div className="col ">
                                <div className="AsideCards">
                                  <h5>Member and Retiree Forms</h5>
                                  <p>
                                    Looking for a specific form? Download and
                                    print here, or complete electronically by
                                    logging into your PERA account.
                                  </p>
                                </div>
                              </div>
                            </Link>
                            <Link to="/about" className="AsideCardsMain">
                              <div className="col ">
                                <div className="AsideCards">
                                  <h5>Access My PERA Account</h5>
                                  <p>
                                    Get the most from our website by creating an
                                    online account to access your PERA
                                    information when it's convenient for you.
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </aside>
                      </div>
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
