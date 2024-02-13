import axios from 'axios'
import React,{useEffect, useState} from 'react'
import Header from '../Components/Header'
import HeaderBottom from '../Components/HeaderBottom'
import Col from "react-bootstrap/Col";
import {Link,useNavigate,useParams,useLocation} from 'react-router-dom' 
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import FooterAboveImage from '../Components/FooterAboveImage' 
import Footer from '../Components/Footer'


const Post = () => {
// const [newPageId,set]
    const params = useParams()
    const  [data,setData] = useState([])
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/wp/v2/posts?slug=${params.slug}`).then((resp)=>{
            setData(resp?.data[0])    
        console.log(resp?.data[0])    
        })
    
    },[])

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
                        <Nav.Link
                          
                        >
                          <h4>This item appears on</h4>
                          <div className="nav-item"><a className='nav-link' href="/newsletters">Newsletters</a></div>
                        </Nav.Link>
                      </Nav.Item>
                
                    </Nav>
                  </Col>
                  <Col lg={10} className=" px-lg-5 px-3">
                    <Tab.Content>
                
                     
                        <div className="row px-3">
                          <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0">
                       <h2>{data?.title?.rendered}</h2>     
                       <div dangerouslySetInnerHTML={{__html:data?.content?.rendered}}/>
                       
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
}

export default Post
