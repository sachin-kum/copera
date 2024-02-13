import axios from 'axios'
import React,{useEffect, useState} from 'react'
import Header from '../Components/Header'
import HeaderBottom from '../Components/HeaderBottom'
import Col from "react-bootstrap/Col";
import {Link,useNavigate,useLocation} from 'react-router-dom' 
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import FooterAboveImage from '../Components/FooterAboveImage' 
import Footer from '../Components/Footer'


const SecondPage = () => {
// const [newPageId,set]

    const  [data,setData] = useState([])
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if(!location.state){navigate("/newsletters")}
        console.log("hello",location.state)
        axios.get(`https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/site/newsletters_post/${location.state}`).then((resp)=>{
            setData(resp?.data?.data)    
            console.log(resp?.data?.data,"dawdawamnvdjkwabdawjkdbwajklbdwadwadwad")
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
                            
                          {data.map((item,index)=>{
                              let slug = item?.slug.split("/")
                              slug  = slug[(slug.length - 2)]
                            return(

                             <Link to={`/post/${slug}`} className="PagesLinksCards" key={index}>
                             <div className="row  border-top py-4 m-0">
                               <div className="col">
                                 <h4>{item?.name}</h4>
                                 <div dangerouslySetInnerHTML={{__html:item?.content}}/>
                               </div>
                             </div>
                           </Link>

                          )})}
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

export default SecondPage
