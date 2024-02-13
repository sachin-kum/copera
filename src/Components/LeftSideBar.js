import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineConsoleSql } from "react-icons/ai";
const LeftSideBar = (props) => {
  let menuData = props?.menuData ? JSON.parse(props.menuData) : [];
  let parentPageId =
    props?.parentPageId != 0 ? props?.parentPageId : props?.pageId;
  const [parentPageData, setParentPageData] = useState([]);
  const [parentSlug, setParentSlug] = useState("");
  const [onSubSubPage, setSubSubPage] = useState(false);
  let subSubMenuVisible = false;
  const location = useLocation();
  let subMenuData = [];
  if (parentPageId > 0 && !onSubSubPage) {
    let subMenu =
      menuData &&
      menuData
        .filter((Item) => Item.object_id == parentPageId)
        .map((Item, i) => {
          console.log(Item, "mnbv");
          return Item.submenu;
        });
    subMenuData = subMenu && subMenu.length > 0 && subMenu[0];
  }
  if (!subMenuData) {
    menuData.map((SubMenuItems) => {
      SubMenuItems?.submenu?.map((item) => {
        item.submenu.map((thirdLevel) => {
          let thirdLevelSlug = thirdLevel?.url.split("/");
          thirdLevelSlug = thirdLevelSlug[thirdLevelSlug.length - 2];
          if ("/" + thirdLevelSlug == location.pathname) {
            subMenuData = SubMenuItems.submenu;
            // console.log(item,"ieteanwn")
            let Condition = item.submenu.map((thirdLevelSingleItem) => {
              let thirdLevelSingleItemSlug =
                thirdLevelSingleItem?.url?.split("/");
              thirdLevelSingleItemSlug =
                thirdLevelSingleItemSlug[thirdLevelSingleItemSlug.length - 2];
              return "/" + thirdLevelSingleItemSlug == location.pathname
                ? thirdLevelSingleItemSlug
                : null;
            });
            let result = Condition?.filter((it) => it);
            subSubMenuVisible = result;
          }
        });
      });
    });
  }

  useEffect(() => {
    if (parentPageId > 0) {
      getDataById();
    } else {
      setParentPageData();
    }
  }, []);
  const getDataById = async () => {
    try {
      axios
        .get(
          "https://wordpress-713393-2826851.cloudwaysapps.com/wp-json/wp/v2/pages/" +
            parentPageId +
            ""
        )
        .then((res) => {
          setParentPageData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (parentPageId > 0) {
      getDataById();
    } else {
      setParentPageData();
    }
  }, [parentPageId]);

  function getUrlSlug(url) {
    let slug = "";
    let urlArray = url.split("/");
    let urlLength = urlArray.length;
    slug = urlArray[urlLength - 2];
    return slug;
  }

  return (
    <>
      <div className="col-lg-2 leftSidebarSection">
        {subMenuData && subMenuData.length > 0 ? (
          <Link to={`/${parentPageData?.slug}`}>
            <h5
              className="leftSidebarHeading"
              dangerouslySetInnerHTML={{
                __html: parentPageData?.title?.rendered,
              }}
            ></h5>
          </Link>
        ) : (
          ""
        )}
        <ul className="justify-content-end m-0 p-0 submenus">
          {subMenuData && subMenuData.length > 0 ? (
            subMenuData &&
            subMenuData[0] &&
            subMenuData.map((sub, i) => {
              let slug = sub?.url.split("/");
              slug = slug[slug.length - 2];
              return (
                <li key={i}>
                  <Link
                    className={`d-block ${
                      location.pathname == "/" + slug ? "active" : ""
                    } `}
                    to={`/${slug}`}
                    key={i}
                    dangerouslySetInnerHTML={{ __html: sub.title }}
                  />
                  {sub.submenu.some((subsub) => {
                    let subsubslug = subsub?.url.split("/");
                    subsubslug = subsubslug[subsubslug.length - 2];
                    return location.pathname == "/" + subsubslug;
                  }) ||
                  (location.pathname == "/" + slug &&
                    sub.submenu &&
                    sub.submenu.length > 0) ? (
                    <div className="d-flex flex-column ">
                      <ul className="submenus_submenus">
                        {sub.submenu.map((subsub, i) => {
                          let subsubslug = subsub?.url.split("/");
                          subsubslug = subsubslug[subsubslug.length - 2];
                          return (
                            <li>
                              <Link
                                className={`d-block HeaderDropDownListItem  ${
                                  location.pathname == "/" + subsubslug
                                    ? "active"
                                    : ""
                                }  `}
                                to={`/${subsubslug}`}
                                key={i}
                              >
                                {subsub.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              );
            })
          ) : (
            <li key="0">There are no Items available.</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default LeftSideBar;
