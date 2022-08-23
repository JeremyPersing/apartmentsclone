import {
  Pressable,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

import { Property } from "../types/property";
import { ImageCarousel } from "./ImageCarousel";
import { CardInformation } from "./CardInformation";
import { LISTMARGIN } from "../constants";
import { theme } from "../theme";
import { endpoints } from "../constants";

export const Card = ({
  property,
  onPress,
  myProperty,
  style,
}: {
  property: Property;
  onPress?: () => void;
  myProperty?: boolean;
  style?: ViewStyle;
}) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const deleteProperty = useMutation(
    () => axios.delete(`${endpoints.deleteProperty}${property.ID}`),
    {
      onMutate: async () => {
        await queryClient.cancelQueries("myproperties");

        const prevProperties: { data: Property[] } | undefined =
          queryClient.getQueryData("myproperties");

        if (prevProperties) {
          const filtered = prevProperties.data.filter(
            (i) => i.ID !== property.ID
          );

          queryClient.setQueryData("myproperties", filtered);
        }

        return { prevProperties };
      },
      onError: (err, newTodo, context) => {
        if (context?.prevProperties)
          queryClient.setQueryData(
            "myproperties",
            context?.prevProperties.data
          );
      },
      onSettled: () => {
        queryClient.invalidateQueries("myproperties");
      },
    }
  );

  const handleEditProperty = () => {
    navigation.navigate("EditProperty", { propertyID: property.ID });
    closeModal();
  };

  const handleDeleteProperty = () => {
    deleteProperty.mutate();
    closeModal();
  };

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles.boxShadow, style]}
    >
      <ImageCarousel
        onImagePress={onPress}
        images={property.images}
        chevronsShown
      />
      <CardInformation property={property} myProperty={myProperty} />

      {myProperty ? (
        <TouchableOpacity onPress={openModal} style={styles.ellipses}>
          <MaterialCommunityIcons
            name="dots-horizontal"
            color={theme["color-primary-500"]}
            size={30}
          />
        </TouchableOpacity>
      ) : null}

      <Modal visible={showModal} transparent>
        <View style={[styles.modal, styles.boxShadow]}>
          <Button
            status={"info"}
            appearance="ghost"
            onPress={handleEditProperty}
          >
            Edit Property
          </Button>

          <Button
            status={"danger"}
            appearance="ghost"
            onPress={handleDeleteProperty}
          >
            Delete Property
          </Button>
          <Button appearance="ghost" onPress={closeModal}>
            Cancel
          </Button>
        </View>
      </Modal>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: LISTMARGIN,
    borderRadius: 5,
    backgroundColor: "white",
  },
  ellipses: {
    backgroundColor: "#fff",
    position: "absolute",
    borderRadius: 5,
    paddingHorizontal: 5,
    top: 10,
    right: 15,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    position: "absolute",
    top: Dimensions.get("screen").height / 3,
    right: Dimensions.get("screen").width / 4,
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
