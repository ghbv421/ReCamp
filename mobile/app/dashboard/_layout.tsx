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
    <View
      style={{
        backgroundColor: focused ? "white" : "transparent",
        borderRadius: 40,
        padding: focused ? 12 : 8,
        borderWidth: focused ? 2 : 0,
        borderColor: focused ? "#007bff" : "transparent",
        shadowColor: "#007bff",
        shadowOpacity: focused ? 0.6 : 0,
        shadowRadius: 8,
        elevation: focused ? 8 : 0,
        marginBottom: isMiddle ? 20 : 0, // 👈 float middle tab
      }}
    >
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
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: "absolute",
          height: 70,
        },
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
