import React from "react";
import {
  faEnvelope,
  faGem,
  faHome,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGithub,
  faGoogle,
  faLinkedin,
  faReact,
  faNodeJs,
  faJs,
  faBootstrap,
  faHtml5,
  faCss3,
} from "@fortawesome/free-brands-svg-icons";
import { useLocation } from "react-router";
const Footer = () => {
  const location = useLocation();
  return (
    <footer className="text-center  text-lg-start bg-primary text-muted ">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block text-secondary">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a
            className="me-4 text-reset"
            target="_blank"
            href="https://github.com/mahmoudAlBaghdady"
          >
            <FontAwesomeIcon icon={faGithub} className="me-3 text-secondary" />
          </a>
          <a
            className="me-4 text-reset text-secondary"
            target="_blank"
            href="mailto:mahmoudAlBaghdadyy@gmail.com"
          >
            <FontAwesomeIcon icon={faGoogle} className="me-3 text-secondary" />
          </a>
          <a
            className="me-4 text-reset"
            target="_blank"
            href="https://www.linkedin.com/in/mahmoud-al-baghdady-3160b5237"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="me-3 text-secondary"
            />
          </a>
        </div>
        {/* Right */}
      </section>
      {/* Section: Social media */}
      {/* Section: Links  */}
      {location.pathname === "/events" && (
        <>
          <section>
            <div className="container text-center text-md-start mt-5">
              {/* Grid row */}
              <div className="row mt-3">
                {/* Grid column */}
                <div className="col-md-5 col-lg-4 col-xl-3 mx-auto mb-4">
                  {/* Content */}
                  <h6 className="text-uppercase fw-bold  mb-4">
                    <FontAwesomeIcon
                      icon={faGem}
                      className="me-3 text-secondary"
                    />
                    Eventers
                  </h6>
                  <p className="text-secondary">
                    Here you can use rows and columns to organize your footer
                    content. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit.
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-5 col-lg-4 col-xl-3 mx-auto mb-md-0 mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                  <p className="text-secondary">
                    <FontAwesomeIcon icon={faHome} className="me-3" />
                    Beirut, Ashrafieh, LB
                  </p>
                  <p className="text-secondary">
                    <FontAwesomeIcon icon={faEnvelope} className="me-3" />
                    mahmoudAlBaghdadyy@gmail.com
                  </p>
                  <p className="text-secondary">
                    <FontAwesomeIcon icon={faPhone} className="me-3" />+ 961 78
                    87 16 49
                  </p>
                </div>
                <div className="col-md-5 col-lg-4 col-xl-3 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase   fw-bold mb-4">
                    Technologies
                  </h6>
                  <p className=" text-secondary">
                    {" "}
                    <FontAwesomeIcon
                      icon={faHtml5}
                      className="me-3 text-secondary"
                    />
                    HTML 5
                  </p>
                  <p className=" text-secondary">
                    <FontAwesomeIcon
                      icon={faCss3}
                      className="me-3 text-secondary"
                    />
                    CSS 3
                  </p>
                  <p className=" text-secondary">
                    <img
                      style={{ width: "18px", height: "18px" }}
                      className=" me-3"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACsklEQVRoge2YT2jTUBzHv78k++NsGyqirNoOD2uljh1kIujAk4InETwJnsSbgoKKB0/uInhRr8oOXrx59DQ2/LODiILgatvJYIsbcyIziQ5mk/w8DdI0bbpVfJm8z+393u/98j5N8t5rAIlE0goKBiqGOQ3gmIC5tA9jupDTR/0hJSQt3hIAQDgeDIWJbEukSNyQInFDisQNKRI3pEjckCJxQ4rEDSkSN7ROBheyesNf5XaoGCb7mmUwPSbQW6Ub5bV1twYAvUDaU3mAPPUwyLsG0L5WNTsS6RQCHlhfUzdGRqgW0r0KYA7AVGXBPAtCTEUYE/mcfrWtXEJfVEpHIlXDuhuM5bOpW1E5DAYpuO+PfV6297i/vXsgjALoJVAVwHOXMA7mHVFzCfscxGGJ7RJ8b5rVcxy1/9CBxLIv7wmACyGpJsDdANXJBK8j7NFK91hWMNQkVQ/5vRsQtvzaSOT8bVf1LjPj/VbrCRMhh8/528VMer6QTR0hxnkA5c3WEybChJuz83bRHyMiL5/Tn+b3p4aY6SKA5SbDGxC5syc9xXvxadFq+ERLRO7BXGpc0ZRhMKbbKSb6iLJb8fhlxTAfzhjmrmDnYH/yW1L7dQpAKaqQaBEAUAFc0YC56oJ5e2ZlJeHvzGQya2C+E1UkDiIb6EwY09Z7PpYW7CF/h9KlTkYNjpPIBgMquWN1kZ+J4J7TgLhVi+kMGBMAGnd+VureCWXn6t6oesJ2dk9zPxQz6ZMlwxzUgNMM5MFIAnhjryQf+XMdTz0RVU/oMR4Aill9FsBss/4pZg1f7OthN86PcJFWLC0t9dmL1jiA4ahcYSKKozwrGz8miemdonG1Bv7u1MjSujjV5VDBBR21XVwCkG2n3l8/xv8rgsf4OC6/W+I/FiG8FjCPzfJK9AQkku3GH7fUzaJmJcDOAAAAAElFTkSuQmCC"
                    ></img>
                    Typescript
                  </p>

                  <p className="text-secondary">
                    <FontAwesomeIcon
                      icon={faJs}
                      className="me-3 text-secondary"
                    />{" "}
                    JavaScript
                  </p>
                  <p className=" text-secondary">
                    <img
                      style={{ width: "18px", height: "18px" }}
                      className=" me-3"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACLElEQVRIia2VTUhUURiGn+8OgwY5jsUkNKmNaRqIkEwUSKsgMKJW0SIocNU2WlXQotpXmxa1allB2yBnLUlGIFIzI2p5J7GknDtTGjret4UFLebnevFbHc77vt9zfjgc2EbNFLwTuYK3NLNQPBQ04wQ1uq52+eI+ot03buwoQJKzRvkpcAyRARvNFbzLOwbIF0q3hS4Iri92xEYwMognM19WjjbKWiPD7OKPzspmJId43tfZegVg6nOxrclxpgy/WPraOpRO20boHVQqkbsCH4ve/Dc32BVfMdNVYQOxfeVLjXrUrOzyckvO9dbyrvegmp5zvTd518tLqnkSdXdga9EzQLOZPauqi4eC3rxbSocCgI0ASz3JlolqanTTfwVsYJwNCaAHMW1mfjUxlWorCo0Dp8MBjG7M5ut65GRBHeEAkJDpW/018B3YExaw6ojddR2O32TY77CALNBf1yHbL1gOBTA0LRianFS0toc0xvtQAB97ASRi7d65avqHhfKAoFeysVCAvgOx18C8ZNeqvdaI498Cfq37/stQADPzJbuHMZwrlEf/1/KudxxxUejRYFd8pWaPegAASZYvlMaAYd+xU0eSsfG5uZ/tG9HNCYHRvD7Qn0iUQwMAPhZKex1pAohLNmrGHVCP4/gne5NtNS84MAAg+6mYsohlgG7BquPo/OFkPNMoF/hP7j8Ynxd6/HdV74I03xZgy2zu1sgqwTPbqAq8BWYl5YJm/gBnH96wiji7pwAAAABJRU5ErkJggg=="
                    ></img>
                    Mongo DB
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-5 col-lg-4 col-xl-3 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold  mb-4">FrameWorks</h6>
                  <p className="text-secondary">
                    <FontAwesomeIcon
                      icon={faNodeJs}
                      className="me-3 text-secondary"
                    />
                    Nodejs
                  </p>
                  <p className="text-secondary">
                    <FontAwesomeIcon
                      icon={faReact}
                      className="me-3 text-secondary"
                    />
                    Reactjs
                  </p>
                  <p className=" text-secondary">
                    <img
                      style={{ width: "18px", height: "18px" }}
                      className=" me-3"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAI5klEQVRoge2aa3BcZRnHf885m5C02UtaWqDJpvSS7JbOAAW51DJcx5kiteOIgqNAp6jcvoCOjHIpDBfFD8ygM4hCB2ewIEIF5WJh5FIRoUqrtUJMdjc10N2E0qFpzoY0bbLnffyQC+ccdpOcTZ3hA/9v7/O+7/95/jnv5XmfDXyGTxfkSJKpqp3JD6yxRL+msBL0OBABeoBtqrI5lYw+LyLmSPqFIyiks3DgPFHrfuCEKYa2o6xPtcS3HynfANZMCVRVsgXnTlHrFaYWAbAc4Y3OfP8PZurbixl/kewe5z4VbqhqssqPUy2xW2YaA8zwi3Tu6b+2jAiD8ISxZFXUHpxdgrmi1jnAo4DrGyl6c2ZP8XsziWGCqtqJnT3FVWL0z0DEY/5QLflyuin2Rrk5ufzAOQbzOHCcx1wyRs9ctjDxj2pjgSq/iKraYvR+vCKED4zIqkoiAFqT0dfEtS4APvSYI5ZlPbxjh9ZUE8s4qhKS63G+BZzsMRlx9fJlzbHsVHPbjo92qJhLAP3YqidF5xevqiaWcYQWslU1oiq3B8w/b1uYeGm6HOnmxq0i/NJnFL6rqnbYeMYRWkhTz8BqYIHHNFgzYv8oLE9k2L5D4aDHtCRbGFgblmccoYWomvU+g/Dg4sUNH4TlWby44QOBhwPs68LyjCOUkF17984GWeMjsPSxap2r6q8DpvPb27W2Gq5QQuqHZ58KTDgSyLUuSPyzGscA6ZbEDmC3xxS1485Z1XCFEmJEz/S2FdlajVMvBH3N11b5/wsRzBm+tpgZXWIABuvNgGlpNTwhN7s0+5oqu4IjsoXimkzeeSuTdwYyeefvnXln9WSM6WTsYZTTFb0X2KdVColMPcSHOd6GWzK+0ypbKK5R1ec8ptMFtmTyTh/gAAh6UFX+I+i/VWRnbSn26qIW2Q5s7+7WDcORgQurERIq18rknf1eMbUl07hoUWO/p3878LmQMRQFnjMqT76fjG45T6QUcj4Q/h6JehvvHp/4KNCfqiKGmMI3RfSZBYVie2feuayaGz6skKK3MXePEw30Z8IGEECbwKZsofjOVHsriLBC9nsb9eLfMyJyR5k5Kso3Dhudgy3zEHMywjqBnwH/reAnLbAlW3Ae6O3tnTWdwKbcI7n3Bk5w1R1KH5/ozuSdbcDEXWIJK1ub43/zjs8WnItUuQ1YDuRA7kwlY78vx62q0tVTPMM1rBNhPXBUmWFZyzJfb21q3Fm1kI78gXNtrKeN6NXp5sTmbL64WdGvegK5Lt2S+MVkHNPF7t6+lpIbuRV0PZ88TYsW1trWZPS1cnNhkqWVzR/4ioX1okKjZSQ1Gji+v75YcvpMgvdiyYI5e1LJ2FWquhLoDHTHDO4LuZ7ilyrNLysk817xLMV6jLFPrTK6nCxL/a8/5WxVPaK1sXRLYscsYqeoyoP+Hqk3Rp/qLBw4r9y8TwjpKBTbsPQPQJ3HvFJVhaHYTuCQx764q2fgTI4wkkkZSrfErgG9Cd9LkhpR64ndvX0twTk+IVtVI5bqY8Bcj1lRNoiItrbKYYRnvHNco1dUG7Annfkok3feyhaci7z9qWTiJyJ6TWDaPNfYT+dy6jsYfEIWFJzvE7iZVbk91RJ/wGPZ6O0X0XW5wn5/DjZNEWPpzGnAbOA0VZ4PimlrTjyEyj2BmE516xxfGWpCyGgwn3iL/zGVjN3tI26Kvwp0eaTUGxO5m5BQ1aCv8SBvC9raktFbVfHmcAhyc9fegfnj7QkhrtrX498X/XaNdaWIqI9AREXF/0YXrsjknaFyy6OikMrl1WVBg4gYkZpr8WcWMXfETIi2AHK5/TFBfOUYgduXHhvdV85TazL6CMJf/cOpo8LyKAdBuip0lU1zUslZPSoEv+Jl3d1aNyHErbdXAzHPgA/riW2kAkREjdrXESyBjqHc8vCifd++BjBzy3RphTQHgMORoY1Av8cUH0/7LQBRvuCnY1MyKUOTBbMs2fA2FYRQZnl4UXO4dgNIk8dkgDeBNW3NsecrzTvp2GMHFXwFC0EvhvE9orLK22mhL04WyMfQStluR6UZuUJxpSL+wrfofalkfFUqGd8ylUfbkpd9EYydsqNChPneTqm1/zUVIYAKd+O/sMZRdnlk8gebjOpTeCoxQK8eNVJxOQXhunawTrAQwBpLMRLenvwxDX3TIU03J55U0UtB3x6rGr4FXFTuL9tRKM5VHXkWfyUeFb0+PW/ewHSFUH8wOLZOVe2IiGg27xQVGsd75r87eDSwd5piNgObJxuTK+xvNkb/hPj3jqL3ppsTv5umBADM4KwG2/a+hnVIRFxrlJCcd3BtrTktDPlk6Ogpft7VyBtBEcALqeb4D8PyRSKlUwKmLhjbI6rie7QYo9eFdRDEjh1a01lw7rKM/kUgkOTJVq0bvlREKp16FaHKtX4qeR3GhNgijwfGr84W+qv+vSJbKK6JHlPcKcqtQKCQoE9bh6IXhtoXE7z9VwP+y9bIb8HzQswUnNdRvOVKBe6qLcXuWbRIDjEFdu3dO7uuVH8xyg3AijJDFOWnbcnYjSLiZvPOGfaw27lkyRxnKu7ubq0bjhRvAjbgf9W+nkrGz/YJ6co7S13YCTT4aaQAPIqYl2uGI+/09c3ui8exhiODjXatWWIZPUXRcxVZLVChUCAFMebKtoWJl1RVMj3FO0W5BRgGXkJlK5bZVRqJtLtW6bBdPzxiDdYcjW2lLJFzwVweuEABPrJhxdJkvMsnBKBzT3GtiD6BP3mcCUqgjxw23HjiwsSBjkJxro3+SpWqf9AZwyHLkktam2ITGbHvPZJuiT1rMBcC78/QkVH4jRFZnkomvn3iwsSBUWd6sypfnCH3+xbWaq8IqFBFyeX2x9w6e4Mg3wHi0/UgkDPKJnXNpmWLGt8tN2Z3b19LqRS5Wkb/X6U1hABH0YeoG7mr3EExaeEgn9f6g+qsRawLQFcAzYxmASVGi3X7ENoF3eZqZNtYIjlt5N4bWK6WOd+IrhCVk0HmgTYyetL1i9CjqjtReWWWxJ6ZKpH9DJ8m/A/kfZNHAHNahgAAAABJRU5ErkJggg=="
                    ></img>
                    Redux Toolkit
                  </p>
                  <p className=" text-secondary">
                    <img
                      style={{ width: "18px", height: "18px" }}
                      className=" me-3"
                      src="data:image/png;base64,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"
                    ></img>
                    Graph Ql
                  </p>

                  <p className="text-secondary">
                    <FontAwesomeIcon
                      icon={faBootstrap}
                      className="me-3 text-secondary"
                    />
                    Bootstrap
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
              </div>
            </div>
          </section>

          <div
            className="text-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          >
            <p className="text-secondary fw-bold">
              © 2022 Copyright : &nbsp; Eventers.com
            </p>
          </div>
          {/* Copyright */}
        </>
      )}
    </footer>
  );
};

export default Footer;
