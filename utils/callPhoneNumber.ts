import * as Linking from "expo-linking";

const cleanPhoneNumber = (str: string) => {
  // just pretend that phone numbers only include +1 for the area code
  if (str.charAt(0) === "+" && str.charAt(1) === "1") {
    let newStr = "";
    for (let i = 2; i < str.length; i++) {
      newStr += str.charAt(i);
    }

    return newStr;
  }

  return str;
};

export const callPhoneNumber = (phoneNumber: string) => {
  Linking.openURL(`tel:${cleanPhoneNumber(phoneNumber)}`);
};
