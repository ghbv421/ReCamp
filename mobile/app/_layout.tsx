import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { setCustomText, setCustomTextInput } from "react-native-global-props";
import { View, ActivityIndicator } from "react-native";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    JustMeAgain: require("../assets/fonts/JustMeAgainDownHere-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      const customTextProps = {
        style: {
          fontFamily: "JustMeAgain", // 👈 global font
        },
      };
      setCustomText(customTextProps);
      setCustomTextInput(customTextProps);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 👇 main navigation stack (dashboard tabs will be inside /dashboard/_layout.tsx)
  return <Stack screenOptions={{ headerShown: false }} />;
}
