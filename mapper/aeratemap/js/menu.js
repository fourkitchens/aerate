(document => {
  const links = document.querySelectorAll(".menu__link");
  const tests = document.querySelectorAll(".britechart-test");
  const header = document.getElementById("header");
  let i = 0;

  const handleClick = (link, test) => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const active = document.querySelector(".menu__link--active");
      const activeTest = document.querySelector(".britechart-test--active");
      if (active) {
        active.classList.remove("menu__link--active");
        active.classList.remove("mobile-menu--active");
      }
      if (activeTest) {
        activeTest.classList.remove("britechart-test--active");
      }
      link.classList.add("menu__link--active");
      test.classList.add("britechart-test--active");
      header.classList.remove("header--active");
    });
  };

  for (i = 0; i < links.length; i += 1) {
    const link = links[i];
    const test = tests[i];
    links[0].classList.add("menu__link--active");
    tests[0].classList.add("britechart-test--active");
    handleClick(link, test);
  }
})(document);
