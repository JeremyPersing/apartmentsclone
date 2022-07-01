import { Dimensions, Platform, StatusBar } from "react-native";

export const LISTMARGIN = 10;
export const WIDTH = Dimensions.get("screen").width - LISTMARGIN * 2;

const baseHeight = 160;
const iosNotch = 40;
const iosHeight = baseHeight + iosNotch;
let androidHeight = baseHeight;
let androidNotch = 0;
if (StatusBar.currentHeight) androidNotch = StatusBar.currentHeight;
androidHeight += androidNotch;

export const HEADERHEIGHT = Platform.OS === "ios" ? iosHeight : androidHeight;

const serverUrl = "http://192.168.30.24:4000/api";
const location = "/location";
const user = "/user";
const locationEndpoint = serverUrl + location;
const userEndpoint = serverUrl + user;

export const endpoints = {
  autoComplete: locationEndpoint + "/autocomplete",
  search: locationEndpoint + "/search",
  register: userEndpoint + "/register",
  login: userEndpoint + "/login",
  facebook: userEndpoint + "/facebook",
};
