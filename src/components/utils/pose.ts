import posed from "react-pose";

export const TilePose = posed.div({
  hoverable: true,
  pressable: true,
  init: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)"
  },
  hover: {
    scale: 1.1,
    boxShadow: "0px 5px 10px rgba(0,0,0,0.2)"
  },
  press: {
    scale: 0.95,
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
  },
  selected: {
    scale: 1.05,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)"
  }
});

export const CardPose = posed.div({
  hoverable: true,
  pressable: true,
  init: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)"
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 5px 10px rgba(0,0,0,0.2)"
  },
  press: {
    scale: 0.95,
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
  },
  selected: {
    scale: 1.05,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)"
  }
});
