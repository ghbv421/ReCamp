import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";


export default function DashboardLayout() {
  return (
    
    <Tabs
      screenOptions={{
       tabBarActiveBackgroundColor: "#392C21",
       tabBarActiveTintColor: "#EFCC8A",
       tabBarInactiveTintColor: "#EFCC8A",
       tabBarStyle: {
        backgroundColor: "#83492B",
        borderWidth: 0,
        borderTopWidth: 0,
        borderTopColor: "yellow",
        height: 90,
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
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
            
          ),
        }}
      />
      <Tabs.Screen
        name="reservation"
        options={{
          title: "Reservation",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
            
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
            
          ),
        }}
      />
    </Tabs>
    
  );
}
