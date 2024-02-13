import React, { useState, useEffect } from "react";
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
import Footer from "../Components/Footer";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import {
  CareersImage,
  ProposedLegislation,
  CreatingABudget,
  InvestingBasis,
  PreaparingForLifeEvents,
  ProtectingYourAssets,
  SavingAndPlanning,
  GettingReadyToRetire,
  ActivitiesInRetirement,
  PERABasics,
  EmpowerLearning,
  WebinarsOnDemand,
  PERAAnnouncement,
  PERAJourney,
  RetirementPlanning,
  EmployersVideo,
  StepwardShip,
  TopWorkPlaces,
} from "../Components/Images";
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
                  <Tab.Pane eventKey={0}>
                    <div className="row px-3">
                      <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0">
                        <h2>About</h2>
                        {aboutData.map((e) => {
                          return (
                            <div
                              dangerouslySetInnerHTML={createMarkup(e.content)}
                            />
                          );
                        })}
                      </div>

                      <div className="col-xl-3 col-lg-4">
                        <aside>
                          <div className="row flex-column">
                            <Link to="/about" className="AsideCardsMain">
                              <div className="col ">
                                <div className="AsideCards">
                                  <h5>Board of Trustees</h5>
                                  <p>
                                    By state law, the management of the public
                                    employees’ retirement funds is vested in
                                    PERA’s Board of Trustees. The 16-member
                                    Board of Trustees includes…
                                  </p>
                                </div>
                              </div>
                            </Link>
                            <Link to="/about" className="AsideCardsMain">
                              <div className="col ">
                                <div className="AsideCards">
                                  <h5>Frequently Asked Questions</h5>
                                  <p>
                                    Visit our FAQs library to find answers to
                                    commonly asked questions.
                                  </p>
                                </div>
                              </div>
                            </Link>
                            <Link to="/about" className="AsideCardsMain">
                              <div className="ImgBox w-100">
                                <img
                                  src={CareersImage}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <div className="col ">
                                <div className="AsideCards">
                                  <h5>Careers</h5>
                                  <p>
                                    Colorado PERA is an Equal Opportunity
                                    Employer
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </aside>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey={1}>
                    <div className="row px-3">
                      <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: boardTrustee?.content?.rendered,
                          }}
                        />
                        {boardTrustee?.acf?.page_faqs.map((val, index) => {
                          return (
                            <div className="CustomAccordianButtonOneMain">
                              <button
                                className="CustomAccordianButtonOne"
                                onClick={(e) => {
                                  HandleAccordianCollapse(e.target);
                                }}
                              >
                                <span>{val.faqs_title}</span>
                                <span>
                                  <div className="LineBox">
                                    <div className="LineOne"></div>
                                    <div className="LineTwo"></div>
                                  </div>
                                </span>
                              </button>
                              <div
                                className="CustomAccordianButtonOneCollapse"
                                dangerouslySetInnerHTML={{
                                  __html: val?.faqs_content,
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>

                      <div className="col-xl-3 col-lg-4"></div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey={2}>
                    <div className="row px-3">
                      <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: legislation?.content?.rendered,
                          }}
                        />

                        {legislation?.acf?.page_faqs.map((val, index) => {
                          return (
                            <div
                              className="CustomAccordianButtonOneMain"
                              key={index}
                            >
                              <button
                                className="CustomAccordianButtonOne"
                                onClick={(e) => {
                                  HandleAccordianCollapse(e.target);
                                }}
                              >
                                <span>{val.faqs_title} </span>
                                <span>
                                  <div className="LineBox">
                                    <div className="LineOne"></div>
                                    <div className="LineTwo"></div>
                                  </div>
                                </span>
                              </button>
                              <div className="CustomAccordianButtonOneCollapse">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: val.faqs_content,
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}

                        <Link to="/members" className="PagesLinksCards">
                          <div className="row m-0 border-top py-4">
                            <div className="col-md-5 px-0">
                              <div className="ImgBox">
                                <img
                                  src={ProposedLegislation}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                            </div>
                            <div className="col-md-7">
                              <h4>2022 Proposed Legislation Status</h4>
                              <p>
                                A summary of proposed legislation affecting
                                Colorado PERA. The status of each bill will be
                                updated regularly.
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-xl-3 col-lg-4">
                        <aside>
                          <div className="row flex-column">
                            <Link to="/about" className="AsideCardsMain">
                              <div className="col ">
                                <div className="AsideCards">
                                  <h5>About</h5>
                                  <p>
                                    Colorado Public Employees' Retirement
                                    Association (PERA) provides retirement and
                                    other benefits to the employees of more than
                                    500 government agencies…
                                  </p>
                                </div>
                              </div>
                            </Link>
                            <Link to="/about" className="AsideCardsMain">
                              <div className="col ">
                                <div className="AsideCards">
                                  <h5>General FAQs About Colorado PERA </h5>
                                  <p>
                                    Learn more about how PERA operates,
                                    oversight and governance, and PERA's
                                    financial status.
                                  </p>
                                </div>
                              </div>
                            </Link>
                            <Link to="/about" className="AsideCardsMain">
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
                  </Tab.Pane>
                  <Tab.Pane eventKey={3}>
                    <div className="row px-3">
                      <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0">
                        <h2>{peraTownHall?.title?.rendered}</h2>

                        <div
                          dangerouslySetInnerHTML={{
                            __html: peraTownHall?.content?.rendered,
                          }}
                        />
                      </div>
                      <div className="col-xl-3 col-lg-4">
                        <aside>
                          <div className="row flex-column">
                            <Link to="/about" className="AsideCardsMain">
                              <div className="col ">
                                <div className="AsideCards">
                                  <h5>Welcome PERA Members</h5>
                                  <p>
                                    Whether you're new to PERA, in the middle of
                                    your career, or preparing for retirement, we
                                    want to ensure that you are set up for
                                    success when you…
                                  </p>
                                </div>
                              </div>
                            </Link>
                            <Link to="/about" className="AsideCardsMain">
                              <div className="col ">
                                <div className="AsideCards">
                                  <h5>Retirees</h5>
                                  <p>
                                    After years of service to Colorado, you’re
                                    enjoying life at a different pace. But you
                                    still need to stay informed about how the
                                    choices you make might…
                                  </p>
                                </div>
                              </div>
                            </Link>
                            <Link to="/about" className="AsideCardsMain">
                              <div className="col ">
                                <div className="AsideCards">
                                  <h5>Frequently Asked Questions</h5>
                                  <p>
                                    Visit our FAQs library to find answers to
                                    commonly asked questions.
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </aside>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey={4}>
                    <div className="row px-3">
                      <div className="col CoperaInnerPagesMainSectionMiddle">
                        <h2>Financial Wellness Library</h2>
                        <div className="row px-3">
                          {financialWellnessCard.map((val, i) => {
                            return (
                              <div className="col-lg-4 col-md-6" key={i}>
                                <div className="FinancialWellnessCard border-top py-lg-5 py-4">
                                  <div className="ImgBox w-100 mb-4">
                                    <img
                                      src={val.image}
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </div>
                                  <h4>{val.name}</h4>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey={5}>
                    <div className="row px-3">
                      <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0">
                        <h2>Video Library</h2>
                        <p>
                          PERA has a variety of videos for you to watch and
                          learn more about your retirement plan and better
                          understand your PERA benefits.
                        </p>
                        {videoLibrary.map((val) => {
                          return (
                            <Link to="/members" className="PagesLinksCards">
                              <div className="row m-0 border-top py-4">
                                <div className="col-lg-5 px-0">
                                  <div className="ImgBox">
                                    <img
                                      src={val.img}
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-7">
                                  <h4>{val.heading}</h4>
                                  <p>{val.paragraph}</p>
                                </div>
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
                                  <h5>Vimeo Video Library</h5>
                                  <p>
                                    Looking for more videos? Visit our Vimeo
                                    video library to access clips on a variety
                                    of topics about PERA and the PERA Benefit.
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </aside>
                      </div>
                    </div>
                  </Tab.Pane>
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
                  <Tab.Pane eventKey={7}>
                    <div className="row px-3">
                      <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0">
                        <h2> {career?.title?.rendered}</h2>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: career?.content?.rendered,
                          }}
                        />
                        {career?.acf?.page_faqs.map((val, index) => {
                          return (
                            <div className="CustomAccordianButtonOneMain">
                              <button
                                className="CustomAccordianButtonOne"
                                onClick={(e) => {
                                  HandleAccordianCollapse(e.target);
                                }}
                              >
                                <span> {val.faqs_title} </span>
                                <span>
                                  <div className="LineBox">
                                    <div className="LineOne"></div>
                                    <div className="LineTwo"></div>
                                  </div>
                                </span>
                              </button>
                              <div
                                className="CustomAccordianButtonOneCollapse"
                                dangerouslySetInnerHTML={{
                                  __html: val.faqs_content,
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div className="col-xl-3 col-lg-4">
                        <aside>
                          <div className="row flex-column">
                            <Link to="/about" className="AsideCardsMain">
                              <div className="ImgBox w-100">
                                <img
                                  src={PERAAnnouncement}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <div className="col ">
                                <div className="AsideCards">
                                  <h5>Digital Financial Snapshot</h5>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </aside>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey={8}>
                    <div className="row px-3">
                      <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: openRecords?.content?.rendered,
                          }}
                        />
                      </div>
                      <div className="col-xl-3 col-lg-4"></div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey={10}>
                    <div className="row px-3">
                      <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0"></div>
                      <div className="col-xl-3 col-lg-4"></div>
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
