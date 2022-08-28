import { Input, InputProps, Text } from "@ui-kitten/components";

const maxChars = 7000;

export const DescriptionInput = ({
  value,
  field,
  setDescription,
  autoFocus,
}: {
  value: string;
  field: string;
  setDescription: (field: string, values: any) => void;
  autoFocus?: boolean;
}) => {
  const handleChangeText = (text: string) => {
    if (maxChars - text.length < 0) return;
    setDescription(field, text);
  };

  return (
    <>
      <Input
        multiline
        autoFocus={autoFocus}
        value={value}
        numberOfLines={8}
        textAlignVertical="top"
        onChangeText={handleChangeText}
        placeholder="What's great about this property?"
      />
      <Text appearance={"hint"} category="c1">
        {maxChars - value.length} Characters Remaining
      </Text>
    </>
  );
};
