import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { addClass, removeClass } from "../utils/classes";

export const showShowreel = () => {
  return dispatch => {
    addClass(document.querySelector(".ToggleMenu"), "is-hidden");
    disableBodyScroll(document.querySelector(".Showreel"));
    dispatch({ type: "SHOW_SHOWREEL" });
  };
};

export const hideShowreel = () => {
  return dispatch => {
    removeClass(document.querySelector(".ToggleMenu"), "is-hidden");
    enableBodyScroll(document.querySelector(".Showreel"));
    dispatch({ type: "HIDE_SHOWREEL" });
  };
};
