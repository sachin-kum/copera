import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import News from "./Pages/News";
import NotFound from "./Pages/NotFound";
import axios from "axios";
import PageTemplate from "./Templates/PageTemplate";
import Faq from "./Pages/Faq";
import Newsletter from "./Pages/Newsletter";
import SinglePost from "./Pages/SinglePost";
import Newsinner from './Pages/NewsInner'
import $ from "jquery";
import SecondPage from "./Pages/SecondPage";
import Post from "./Pages/Post";
import VideoLibrary from "./Pages/VideoLibrary";
import VideoLibraryInner from "./Pages/VideoLibraryInner";
const App = () => {
  const [sideMenu, setSideMenu] = useState([]);
  const getSideMenuData = async () => {
    const res = await axios.get(
      "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/site/perafaqs"
    );
    setSideMenu(res.data);
  };
  useEffect(() => {
    return () => {
      getSideMenuData();
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:slug" element={<PageTemplate />} />
          <Route path="/newspost/:slug" element={<Newsinner />} />
          <Route path="/video-library/:slug" element={<VideoLibraryInner />} />
          <Route
            path="media-and-press-releases"
            element={<Navigate to="/news" />}
          />
          <Route
            path="forms-publications"
            element={<Navigate to="/member-and-retiree-forms" />}
          />
          <Route
            path="forms-publications"
            element={<Navigate to="/member-and-retiree-forms" />}
          />
          <Route path="/news" element={<News />} />
          <Route exact path="/*" element={<NotFound />} />
          <Route exact path="/faq" element={<Faq />} />
          <Route path="/newsletter_categories/:slug" element={<SinglePost />} />
          <Route path="/posts/:slug" element={<SecondPage />} />
          <Route path="/post/:slug" element={<Post />} />
          <Route exact path="/newsletters" element={<Newsletter />} />
          <Route exact path="/video-library" element={<VideoLibrary />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
