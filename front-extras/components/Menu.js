
"use client";

import Link from "next/link";

export default function Menu() {
  return (
    <div
      className="
        fixed-bottom
        d-flex
        
        justify-content-center
        p-3
    "   
    >
        <div className="
            rounded-5
            px-5 py-3
            bg-body-tertiary
            shadow
        ">
            
            
            {/* <Link className="nav-link fs-5 m-3" href={"/bitacoras"}>
                <i className="bi bi-journal-bookmark"></i>
            </Link> */}
            <Link className="nav-link fs-5 m-3" href={"/"}>
                <i className="bi bi-house"></i>
            </Link>
            <Link className="nav-link fs-5 m-3" href={"/analisis"}>
                <i className="bi bi-bar-chart"></i>
            </Link>
            
        </div>
     
    </div>
    /*     <div
        className="
      navbar navbar-dark 
      fixed-bottom 
      bg-body-tertiary
      d-flex 
      justify-content-center
      p-3 
      px-5
      "
      >
        <div className="col-12 col-md-8 col-xl-6 d-flex justify-content-between ">
          <Link className="nav-link fs-5" href={"/"}>
            <i className="bi bi-house-door-fill"></i>
          </Link>
          <Link className="nav-link fs-5" href={"/calendar"}>
            <i className="bi bi-calendar3-week-fill"></i>
          </Link>
          <Link className="nav-link fs-5" href={"/pomodoro"}>
            <i className="bi bi-stopwatch-fill"></i>
          </Link>
        </div>
      </div> */
  );
}

