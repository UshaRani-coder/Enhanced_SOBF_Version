
let modalCount = 0;

const getScrollbarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};

const lockTargets = () => {
  const scrollBarWidth = getScrollbarWidth();

  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  //prevents layout shift 
  document.body.style.paddingRight = `${scrollBarWidth}px`;
};

const unlockTargets = () => {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
};

export const lockScroll = () => {
  modalCount++;
  if (modalCount === 1) lockTargets();
};

export const unlockScroll = () => {
  modalCount--;
  if (modalCount <= 0) {
    modalCount = 0;
    unlockTargets();
  }
};