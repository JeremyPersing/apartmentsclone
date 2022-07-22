import * as WebBrowser from "expo-web-browser";

export const openURL = (url: string) => {
  let prefix = "";
  if (!url.includes("https://")) prefix = "https://";
  if (!url.includes("www.")) prefix += "www.";
  WebBrowser.openBrowserAsync(prefix + url);
};
