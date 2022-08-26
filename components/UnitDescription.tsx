import { View, StyleSheet } from "react-native";
import { Input, Text, Button, Divider } from "@ui-kitten/components";

import { ModalHeader } from "./ModalHeader";
import { Row } from "./Row";
import { theme } from "../theme";

const maxChars = 7000;

export const UnitDescription = ({
  field,
  description,
  setDescription,
  cancel,
}: {
  field: string;
  description: string;
  setDescription: (field: string, values: any) => void;
  cancel?: () => void;
}) => {
  const handleChangeText = (text: string) => {
    if (maxChars - text.length < 0) return;
    setDescription(field, text);
  };

  const handleClearPressed = () => {
    setDescription(field, "");
  };

  return (
    <View>
      <ModalHeader
        xShown
        text="Unit Description"
        onPress={cancel ? cancel : undefined}
      />
      <View style={styles.container}>
        <Input
          style={styles.defaultMarginTop}
          multiline
          autoFocus
          value={description}
          numberOfLines={8}
          textAlignVertical="top"
          onChangeText={handleChangeText}
          placeholder="What's great about this property?"
        />
        <Text appearance={"hint"} category="c1">
          {maxChars - description.length} Characters Remaining
        </Text>

        <Divider style={[styles.divider, styles.defaultMarginTop]} />

        <Row style={[styles.row, styles.defaultMarginTop]}>
          <Button
            style={[styles.button, styles.clearButton]}
            appearance="ghost"
            onPress={handleClearPressed}
          >
            Clear
          </Button>
          {/* Alternatively you could make an update on the server to this apartment
              when save is pressed */}
          <Button style={styles.button} onPress={cancel}>
            Save
          </Button>
        </Row>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  defaultMarginTop: { marginTop: 10 },
  divider: {
    backgroundColor: theme["color-gray"],
  },
  row: {
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
  },
  clearButton: {
    borderColor: theme["color-primary-500"],
  },
});
