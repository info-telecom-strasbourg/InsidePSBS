import { Button, Column, Host, TextInput, type TextInputRef } from "@expo/ui";
import { useRef } from "react";

export default function LogInScreen() {
  const inputRef = useRef<TextInputRef>(null);

  return (
    <Host matchContents={{ vertical: true }}>
      <Column spacing={8}>
        <TextInput
          ref={inputRef}
          defaultValue="hello"
          placeholder="Type here"
          onChangeText={(value) => console.log(value)}
        />
        <Button label="Clear" onPress={() => inputRef.current?.clear()} />
      </Column>
    </Host>
  );
}
