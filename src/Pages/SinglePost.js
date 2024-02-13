import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Components/Header";
import HeaderBottom from "../Components/HeaderBottom";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import FooterAboveImage from "../Components/FooterAboveImage";
import Footer from "../Components/Footer";

const SinglePost = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  console.log(params.slug);
  useEffect(() => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/site/newsletters_cat"
      )
      .then((res) => {
        var Id;
        res?.data?.data.map((item) => {
          if (item.slug == params.slug) {
            Id = item.term_id;
          }
        });
        axios
          .get(
            `https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/site/newsletters_sub_cat/${Id}`
          )
          .then((resp) => {
            setData(resp?.data?.data);
            console.log(resp?.data?.data, "dawdawdwadwadwad");
          });
      });
  }, []);

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
                          Newsletters
                        </a>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col lg={10} className=" px-lg-5 px-3">
                <Tab.Content>
                  <div className="row px-3">
                    <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0">
                      {data.map((data, index) => {
                        let slug = data?.term_link.split("/");
                        slug = slug[slug.length - 2];
                        return (
                          <Link
                            to={`/posts/${slug}`}
                            className="PagesLinksCards"
                            key={index}
                            state={data?.term_id}
                          >
                            <div className="row  border-top py-4 m-0">
                              <div className="col">
                                <h4>{data?.name}</h4>
                                <p>{data?.description}</p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="col-xl-3 col-lg-4"> </div>
                  </div>
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

export default SinglePost;
