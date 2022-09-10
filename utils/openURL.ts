import * as WebBrowser from "expo-web-browser";

export const openURL = (url: string) => {
  try {
    WebBrowser.openBrowserAsync(url);
  } catch (error) {
    alert("Unable to view website");
  }
};
