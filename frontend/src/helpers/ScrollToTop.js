import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        if(window.scrollY > 200){
            setShowScroll(true)
        }else{
            setShowScroll(false)
        }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
        window.removeEventListener("scroll", handleScroll)
    }
  },[])

  const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showScroll && (
      <div className="fixed bottom-20 right-10 rounded-full z-[10000] bg-slate-600" onClick={handleScrollToTop}>
        <button className="text-white">
          <i className="fa-solid fa-arrow-up p-3"></i>
        </button>
      </div>
    )
  );
};

export default ScrollToTop;
