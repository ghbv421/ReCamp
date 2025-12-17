import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { setCustomText, setCustomTextInput } from "react-native-global-props";
import { View, ActivityIndicator } from "react-native";

// Import your Context Providers
import { FavoritesProvider } from "./context/FavoritesContext";
import { UserProvider } from "./context/UserContext"; // ✅ 1. Import this

export default function Layout() {
  const [fontsLoaded] = useFonts({
    JustMeAgain: require("../assets/fonts/JustMeAgainDownHere-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      const customTextProps = {
        style: {
          fontFamily: "JustMeAgain",
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

  return (
    // ✅ 2. Wrap existing providers with UserProvider
    <FavoritesProvider>
      <UserProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </UserProvider>
    </FavoritesProvider>
  );
}