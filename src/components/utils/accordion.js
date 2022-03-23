import $ from "jquery";

export const closeFrame = frameHeading => {
  const frameContent = frameHeading.nextSibling;
  if (!isFrameClosed(frameContent)) {
    $(frameHeading).click();
  }
};

export const openFrame = frameHeading => {
  const frameContent = frameHeading.current.nextSibling;
  if (isFrameClosed(frameContent)) {
    $(frameHeading.current).click();
    scrollToFrame(frameHeading);
  }
};

export const scrollToFrame = frameHeading => {
  const frameContent = frameHeading.nextSibling;
  setTimeout(() => {
    frameHeading.current.scrollIntoView({ behaviour: "smooth" });
  }, 200);
};

export const isFrameClosed = frameContent => {
  return $(frameContent).css("display") == "none";
};
