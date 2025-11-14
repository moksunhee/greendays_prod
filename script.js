gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const panels = gsap.utils.toArray("#fullpage .section");

function goToSection(panel, callback) {
  gsap.to(window, {
    scrollTo: { y: panel, autoKill: false },
    duration: 1,
    ease: "power2.out",
    onComplete: callback, // ← 스크롤 끝난 후 실행
  });
}

function setCropped(target) {
  panels.forEach((p) => p.classList.remove("cropped"));
  target.classList.add("cropped");
}

function snapIn() {
  const tlSnapIn = gsap.timeline();
  panels.forEach((panel) => {
    tlSnapIn.to(panel, {
      duration: 1,
      scrollTrigger: {
        trigger: panel,
        onEnter: () => goToSection(panel, () => setCropped(panel)),
        onEnterBack: () => goToSection(panel, () => setCropped(panel)),
      },
    });
  });
  return tlSnapIn;
}

function initPanelTl() {
  const tl = gsap.timeline();
  const snap = snapIn();
  tl.add(snap);
  return tl;
}

initPanelTl();
