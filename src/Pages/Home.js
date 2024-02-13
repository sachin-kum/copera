import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import HeaderBottom from "../Components/HeaderBottom";
import HerosBanner from "../Components/HerosBanner";
import FooterAboveImage from "../Components/FooterAboveImage";
import Footer from "../Components/Footer";
import { Pagination, Autoplay } from "swiper";
import { HiChevronRight } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { EffectFade } from "swiper";
import {
  HomePageGetStartedSectionOne,
  HomePageGetStartedSectionTwo,
  HomePageGetStartedSectionThree,
  HomePageGetStartedSectionFour,
  HomePageGetStartedSectionFive,
  CardHoverImageOne,
  CardHoverImageTwo,
  CardHoverImageThree,
} from "../Components/Images";

const Home = () => {
  const [recentPost, setRecentPost] = useState([]);

  const RecentPost = async () => {
    const res = await axios.get(
      "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/site/home_page_news_post"
    );
    setRecentPost(res.data);
  };
  useEffect(() => {
    return () => {
      RecentPost();
    };
  }, []);
  return (
    <>
      <Header />
      <HeaderBottom />
      <HerosBanner />
      <section className="HomePageGetStartedSection py-lg-5 py-4">
        <div className="container">
          <div className="row py-lg-5 py-4 flex-wrap">
            <h2 className="title">Get Started — What you need to know</h2>
            <p className="description pb-3">
              Pick the guide for your career stage & needs
            </p>
            <div className="col-md-4 col-lg mx-auto mt-0 mt-md-4 mt-lg-0">
              <article className="ArticleOne d-flex flex-column justify-content-center align-items-center">
                <div className="ImgBox">
                  <img src={HomePageGetStartedSectionOne} alt="" />
                </div>
                <span>NEW TO PERA</span>
              </article>
            </div>
            <div className="col-md-4 col-lg mx-auto mt-0 mt-md-4 mt-lg-0">
              <article className="ArticleTwo d-flex flex-column justify-content-center align-items-center">
                <div className="ImgBox">
                  <img src={HomePageGetStartedSectionTwo} alt="" />
                </div>
                <span>MID-CAREER</span>
              </article>
            </div>
            <div className="col-md-4 col-lg mx-auto mt-0 mt-md-4 mt-lg-0">
              <article className="ArticleThree d-flex flex-column justify-content-center align-items-center">
                <div className="ImgBox">
                  <img src={HomePageGetStartedSectionThree} alt="" />
                </div>
                <span>READY TO RETIRE</span>
              </article>
            </div>
            <div className="col-md-4 col-lg mx-auto mt-0 mt-md-4 mt-lg-0">
              <article className="ArticleFour d-flex flex-column justify-content-center align-items-center">
                <div className="ImgBox">
                  <img src={HomePageGetStartedSectionFour} alt="" />
                </div>
                <span>RETIRED</span>
              </article>
            </div>
            <div className="col-md-4 col-lg mx-auto mt-0 mt-md-4 mt-lg-0">
              <article className="ArticleFive d-flex flex-column justify-content-center align-items-center">
                <div className="ImgBox">
                  <img src={HomePageGetStartedSectionFive} alt="" />
                </div>
                <span>LIFE AND JOB CHANGES</span>
              </article>
            </div>
          </div>
          <div className="row py-lg-5 py-4">
            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              slidesPerView={1}
              effect={"fade"}
              pagination={{ clickable: true }}
              // onSwiper={(swiper) => console.log(swiper)}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            >
              <SwiperSlide>
                <div className="GetStartedHomePageSlideOne">
                  <div className="SlideContent">
                    <h2>
                      <a href="">
                        PERACare Open Enrollment: October 17 - November 17, 2022
                      </a>
                    </h2>
                    <p>
                      Open Enrollment information will be available online on
                      October 3, 2022.
                    </p>
                    <a className="SliderLearnMoreButton" href="#">
                      Learn More
                    </a>
                  </div>
                  <div className="SlideImage"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="GetStartedHomePageSlideTwo">
                  <div className="SlideContent">
                    <h2>
                      <a href="">How much will you need to retire?</a>
                    </h2>
                    <p>
                      Find the tools to help you project your retirement income
                      and learn about the options you have to maximize it.
                    </p>
                    <a className="SliderLearnMoreButton" href="#">
                      Learn More
                    </a>
                  </div>
                  <div className="SlideImage"></div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="GetStartedHomePageSlideThree">
                  <div className="SlideContent">
                    <h2>
                      <a href="">Learn about your retirement from home</a>
                    </h2>
                    <p>
                      <span>
                        Learn more about your PERA benefits from the comfort of
                        your own home by participating in a live webinar. You’ll
                        be able to ask questions and hear…
                      </span>
                    </p>
                    <a className="SliderLearnMoreButton" href="#">
                      Learn More
                    </a>
                  </div>
                  <div className="SlideImage"></div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
      <section className="HomePageGetStayInformedSection CustomBackgroundColorOne py-lg-5 py-4">
        <div className="container">
          <div className="row py-4">
            <h2 className="title">Stay Informed — Latest News & Updates</h2>
            <p className="description CustomColorOne">
              Check out the latest news, updates, & reports from PERA
            </p>
            <div className="col">
              <div className="row">
                {recentPost.map((e,ind) => {
                  return (
                    <div className="col-md-4" key={ind}>
                      <a href="">
                        <div className="ImgBox">
                          <img
                            src={e.image}
                            alt={e.title}
                            className="img-fluid"
                          />
                        </div>
                        <h3>{e.title}</h3>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="HomePageFrequentlyAskedQuestionSection CustomBackgroundColorOne">
        <div className="container">
          <div className="row px-md-0 px-3">
            <div className="col-xxl-4 col-lg-3 px-xl-5 px-0">
              <h2>
                Frequently <br className="d-xl-block d-none" /> Asked
                <br className="d-xl-block d-none" /> Questions
              </h2>
            </div>
            <div className="col-xxl-8 col-lg-9 CustomBorderLeft px-md-5 px-0">
              <div className="d-flex flex-column">
                <a href="#">
                  When Can I Retire?
                  <HiChevronRight />
                </a>
                <a href="#">
                  How Can I Save More? | 401(k) and 457 Plans (PERAPlus)
                  <HiChevronRight />
                </a>
                <a href="#">
                  How Will My Social Security Benefit Be Affected?
                  <HiChevronRight />
                </a>
                <a href="#">
                  Can I Work in Retirement?
                  <HiChevronRight />
                </a>
                <a href="#">
                  Does PERA Offer Retiree Health Insurance?
                  <HiChevronRight />
                </a>
                <a href="#">
                  Frequently Asked Questions
                  <HiChevronRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterAboveImage />
      <Footer />
    </>
  );
};

export default Home;
