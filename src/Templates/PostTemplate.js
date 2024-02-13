// import React, { useState, useEffect } from "react";

// import {Route, Link, Routes, useParams} from 'react-router-dom';
// import Footer from "../Components/Footer";
// import Header from "../Components/Header";
// import HeaderBottom from "../Components/HeaderBottom";
// import HerosTwo from "../Components/HerosTwo";
// import Col from "react-bootstrap/Col";
// import Nav from "react-bootstrap/Nav";
// import Row from "react-bootstrap/Row";
// import Tab from "react-bootstrap/Tab";
// import FooterAboveImage from "../Components/FooterAboveImage";
// import axios from "axios";
// const PostTemplate = (props) => {
//   const params = useParams();

//   let postId = params?.id;
//   const [postData, setPostData] = useState([]);

//   const [currentBackground, setCurrentBackground] = useState("");
  
//   useEffect(()=>{
//     getDataById();
//   },[])
//   const getDataById = async() => {
//     try {
     
//       axios.get("https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/wp/v2/posts/"+postId+"").then((res)=>{
//         setPostData(res.data)

//     })
    
//     } catch(error) {
//         console.log(error)
//     }
// }
// useEffect(()=>{
//   getDataById();
// },[postId])
  
//   function createMarkup(html) {
//     return { __html: html?.rendered };
//   }
//   return (
//     <>
//       <Header />
//       <HeaderBottom />
//       <HerosTwo name={postData?.title?.rendered} background={currentBackground} />
//       <section className="CoperaInnerPagesMainSection py-5">
//         <div className="container">
//           <Tab.Container id="left-tabs-example" defaultActiveKey="first">
//             <Row>
             
//               <Col lg={10} className=" px-lg-5 px-3">
//               <div className="row px-3">
//                       <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0">
                      
//                             <div
//                               dangerouslySetInnerHTML={createMarkup(postData.content)}
//                             />
                          
//                       </div>

//                     </div>
//               </Col>
//             </Row>
//           </Tab.Container>
//         </div>
//       </section>
//       <FooterAboveImage />
//       <Footer />
//     </>
//   );
// };

// export default PostTemplate;
import React, { useState, useEffect } from "react";

import {Route, Link, Routes, useParams} from 'react-router-dom';
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeaderBottom from "../Components/HeaderBottom";
import HerosTwo from "../Components/HerosTwo";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import FooterAboveImage from "../Components/FooterAboveImage";

import RightSideBar from "../Components/RightSideBar";
import axios from "axios";
const PostTemplate = (props) => {
  const params = useParams();

  let postSlug = params?.slug;
  const [postData, setPostData] = useState([]);

  const [currentBackground, setCurrentBackground] = useState("");
  
  useEffect(()=>{
    getDataById();
  },[])
  const getDataById = async() => {
    try {
     
      axios.get("https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/wp/v2/posts?slug="+postSlug+"").then((res)=>{
        setPostData(res.data)

    })
    
    } catch(error) {
        console.log(error)
    }
}
useEffect(()=>{
  getDataById();
},[postSlug])
  
  function createMarkup(html) {
    return { __html: html?.rendered };
  }
  // console.log(postData);
  return (
    <>
     <Header />
      <HeaderBottom />
      <HerosTwo name={postData && postData.length > 0 && postData[0]?.title?.rendered} background={currentBackground} />
      <section className="CoperaInnerPagesMainSection py-5">
      <div className="container">
      <div className="row ">
             
      <div className="row px-3">
          <div className="col-xl-9 col-lg-8 CoperaInnerPagesMainSectionMiddle px-0">
       <h2>{postData[0]?.title?.rendered}</h2>
                            <div
                              dangerouslySetInnerHTML={createMarkup(postData && postData.length > 0 && postData[0]?.content)}
                            />
                            </div>
           {(postData && postData.length > 0 && postData[0]?.acf?.post_template == 'right') && <RightSideBar contentBoxes={postData && postData.length > 0 && postData[0]?.acf?.right_sidebar_boxes?JSON.stringify(postData && postData.length > 0 && postData[0]?.acf?.right_sidebar_boxes):''} />}               
                    </div>
                    </div>
                    </div>
                    </section>
      <FooterAboveImage />
      <Footer />
    </>
  );
};

export default PostTemplate;
