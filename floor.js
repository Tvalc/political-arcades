const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const screen = document.getElementById("cab-screen");

if (screen && window.lottie) {
  const anim = window.lottie.loadAnimation({
    container: screen,
    renderer: "svg",
    loop: !reduce,
    autoplay: !reduce,
    path: "art/attract.json?v=arcade7",
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  });
  anim.addEventListener("DOMLoaded", () => screen.classList.remove("poster"));
  if (reduce) {
    anim.addEventListener("DOMLoaded", () => anim.goToAndStop(40, true));
  }
}
