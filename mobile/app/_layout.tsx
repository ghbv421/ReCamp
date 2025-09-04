import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { setCustomText, setCustomTextInput } from "react-native-global-props";
import { View, ActivityIndicator } from "react-native";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    InriaSerifBold: require("../assets/fonts/InriaSerif-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      const customTextProps = {
        style: {
          fontFamily: "InriaSerifBold", // must match the key in useFonts
        },
      };
      setCustomText(customTextProps);
      setCustomTextInput(customTextProps);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
