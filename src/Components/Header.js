import React from "react";
import { BsTelephone } from "react-icons/bs";
import { RiSuitcase2Line } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <section className="HeaderLinkBarTop">
        <div className="container">
          <div className="d-flex text-end w-100 justify-content-md-end justify-content-evenly">
            <Link to="/contact-us" className="d-md-block d-none">
              <BsTelephone />
              Contact Us
            </Link>
            <Link
              to="https://secure.copera.org/vendor/inquiry/GeneralInformation.jsp#!/"
              target="_blank"
            >
              <RiSuitcase2Line />
              Employer Login
            </Link>
            <Link
              to="https://secure.copera.org/vendor/inquiry/GeneralInformation.jsp#!/"
              target="_blank"
            >
              <AiOutlineUser />
              Vendor Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
