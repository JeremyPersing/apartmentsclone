import { PickerItem } from "react-native-woodpicker";

export const NoPets = "none";
export const CatsOnly = "cats";
export const DogsOnly = "dogs";
export const CatsAndDogs = "cats & dogs";

export const petValues: PickerItem[] = [
  { label: "None", value: NoPets },
  { label: "Cats", value: CatsOnly },
  { label: "Dogs", value: DogsOnly },
  { label: "Both", value: CatsAndDogs },
];
