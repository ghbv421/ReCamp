import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

type TabIconProps = {
  name: string;
  focused: boolean;
  isMiddle?: boolean;
};

function TabIcon({ name, focused, isMiddle = false }: TabIconProps) {
  return (
    <View>
      <Ionicons
        name={name as any} // 👈 TS fix: Ionicons accepts string literals
        size={28}
        color={focused ? "#007bff" : "black"}
      />
    </View>
  );
}

export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,      // Hide top header (optional)
        tabBarShowLabel: false,  // ✅ Prevents showing text below icons
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? "home" : "home-outline"} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "search" : "search-outline"}
              focused={focused}
              isMiddle
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reservation"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "calendar" : "calendar-outline"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "person" : "person-outline"}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
