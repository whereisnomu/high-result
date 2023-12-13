new Splide(".splide", {
  arrows: "true",
  type: "loop",
  perPage: 1,
  autoplay: true,
  rewindSpeed: 5000,
  speed: 2500,
  gap: "30px",
  breakpoints: {
    768: {
      width: "600px",
      height: "420px",
    },
    480: {
      width: "600px",
      height: "500px",
    },
    360: {
      width: "600px",
      height: "590px",
    },
  },
}).mount();
