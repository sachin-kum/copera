import React from "react";

const HerosTwo = ({ name, background }) => {
  return (
    <>
      <div
        className="MembersHerosSection SecondHerosSection"
        style={{ backgroundImage: `url('${background}')` }}
      >
        <section className="ForHerosSectionFilter w-100 h-100">
          <div className="container h-100">
            <div className="row h-100 align-items-end">
              <h1 dangerouslySetInnerHTML={{ __html: name }} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HerosTwo;
