import { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const MapMarker = ({
  lat,
  lng,
  onPress,
  color,
}: {
  lat: number;
  lng: number;
  onPress?: () => void;
  color: string;
}) => {
  return (
    <Marker coordinate={{ latitude: lat, longitude: lng }} onPress={onPress}>
      <MaterialCommunityIcons name="map-marker" size={32} color={color} />
    </Marker>
  );
};
