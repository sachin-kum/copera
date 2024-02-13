import React, { useState, useEffect } from "react";
import axios from "axios";
const RightSideBar = (props) => {
  let propsContent = props.contentBoxes ? JSON.parse(props.contentBoxes) : [];
  let boxesData = propsContent;
  const [allImages, setAllImage] = useState([]);
  const [isAlreadyImages, setIsAlreadyImages] = useState([]);
  const [pageno, setPageno] = useState(1);
  useEffect(() => {
    getDataById();
  }, []);
  function createMarkup(html) {
    return { __html: html };
  }
  const getDataById = (id) => {
    axios
      .get(
        "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/wp/v2/media/" +
          id
      )
      .then((res) => {
        let newImageArray = { id: id, data: res?.data };
        setIsAlreadyImages((arr) => [...arr, id]);
        setAllImage((arr) => [...arr, newImageArray]);
      });
  };
  function getImageUrl(imageId) {
    let isAlready = false;
    isAlreadyImages &&
      isAlreadyImages.length > 0 &&
      isAlreadyImages.map((item) => {
        if (item == imageId) {
          isAlready = true;
        }
      });
    if (!isAlready) {
      getDataById(imageId);
    }
    let srcurl =
      allImages && allImages.filter((item) => item.data.id == imageId);
    let url =
      srcurl && srcurl.length > 0 && srcurl[0] && srcurl[0].data.source_url;
    return url;
  }

  return (
    <>
      <div className="col-xl-3 col-lg-4">
        <aside>
          <div className="row flex-column">
            {boxesData && boxesData.length > 0
              ? boxesData.map((item, index) => {
                  if (item.image || item.title || item.description) {
                    return (
                      <>
                        <a
                          href={item.url ? item.url : "/"}
                          className="AsideCardsMain"
                        >
                          <div className="col ">
                            {item.image ? (
                              <img src={getImageUrl(item.image)} alt="" />
                            ) : (
                              ""
                            )}
                            <div
                              className="AsideCards"
                              style={{
                                background: item.background_color
                                  ? item.background_color
                                  : "",
                              }}
                            >
                              <h5>{item.title}</h5>
                              <p
                                dangerouslySetInnerHTML={createMarkup(
                                  item.description
                                )}
                              />
                            </div>
                          </div>
                        </a>
                      </>
                    );
                  }
                })
              : "There are no Items available."}
          </div>
        </aside>
      </div>
    </>
  );
};

export default RightSideBar;
