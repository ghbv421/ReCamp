import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";


export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
       tabBarActiveTintColor: "brown",
       tabBarInactiveTintColor: "black",
       tabBarStyle: {
        borderWidth: 1,
        borderTopColor: "yellow",
        height: 90,
        paddingBottom: 30,
        paddingTop: 7,
       },
       tabBarLabelStyle: {
        fontSize: 15,
        fontWeight: "900",

       }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
            
          ),
        }}
      />
      <Tabs.Screen
        name="reservation"
        options={{
          title: "Reservation",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
            
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
            
          ),
        }}
      />
    </Tabs>
    
  );
}
