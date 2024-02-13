import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import HeaderBottom from "../Components/HeaderBottom";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import FooterAboveImage from "../Components/FooterAboveImage";
import Footer from "../Components/Footer";

const SinglePost = () => {
  const [videoLibraryInnerData, setVideoLibraryInnerData] = useState([]);
  const location = useLocation();
  const currentpage =  location.pathname.split("/")
  const finalApiSlug = currentpage[currentpage.length - 1]
useEffect(() => {
    axios
    .get(
      `https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/site/video_library_cat/${finalApiSlug}`
    )
    .then((resp) => {
        setVideoLibraryInnerData(resp?.data);
      console.log(resp?.data, "dawdawdwadwadwad");
    });
}, [setVideoLibraryInnerData])
  return (
    <>
      <Header />
      <HeaderBottom />
      <section className="CoperaInnerPagesMainSection py-5">
        <div className="container">
          <Tab.Container id="left-tabs-example">
            <Row>
              <Col lg={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link>
                      <h4>This item appears on</h4>
                      <div className="nav-item">
                        <a className="nav-link" href="/newsletters">
                          News
                        </a>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col lg={10} className=" px-lg-5 px-3">
                  <div className="row px-3">
                    <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0">
                    {videoLibraryInnerData.map((res,index)=><div key={index} dangerouslySetInnerHTML={{__html:res?.content}}/>)}
                    </div>
                    <div className="col-xl-3 col-lg-4"> </div>
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

export default SinglePost;
