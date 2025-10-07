import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  LayoutChangeEvent,
} from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const INDICATOR_SIZE = 60;
const ICON_LIFT = -22;
const CIRCLE_LIFT = -28;

function AnimatedTabBarIcon({ name, color, size, focused }: any) {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: focused ? 1.2 : 1,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: focused ? ICON_LIFT : 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: focused ? 1 : 0.6,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }, { translateY }], opacity }}>
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
}

// 🔸 Custom Tab Bar
function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const [tabBarWidth, setTabBarWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const handleLayout = (event: LayoutChangeEvent) =>
    setTabBarWidth(event.nativeEvent.layout.width);

  const tabCount = state.routes.length;

  useEffect(() => {
    if (tabBarWidth === 0) return;

    const tabWidth = tabBarWidth / tabCount;
    const toX = state.index * tabWidth + tabWidth / 2 - INDICATOR_SIZE / 2;

    Animated.spring(translateX, {
      toValue: toX,
      useNativeDriver: true,
      friction: 8,
      tension: 80,
    }).start();

    Animated.timing(translateY, {
      toValue: state.index !== null ? CIRCLE_LIFT : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [state.index, tabBarWidth]);

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar} onLayout={handleLayout}>
        {/* Animated circle indicator */}
        {tabBarWidth > 0 && (
          <Animated.View
            style={[
              styles.circleIndicator,
              { transform: [{ translateX }, { translateY }] },
            ]}
          />
        )}

        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            if (!isFocused) navigation.navigate(route.name as never);
          };

          const iconName =
            route.name === "home"
              ? "home-outline"
              : route.name === "favorites"
              ? "heart-outline"
              : route.name === "reservation"
              ? "calendar-outline"
              : "person-outline";

          const label =
            route.name === "home"
              ? "Home"
              : route.name === "favorites"
              ? "Favorites"
              : route.name === "reservation"
              ? "Reservation"
              : "Account";

          const color = "#EFCC8A";

          return (
            <TouchableWithoutFeedback key={route.key} onPress={onPress}>
              <View style={styles.tab}>
                <AnimatedTabBarIcon
                  name={iconName}
                  color={color}
                  size={28}
                  focused={isFocused}
                />
                <Text
                  style={[styles.label, { color, opacity: isFocused ? 1 : 0.6 }]}
                >
                  {label}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
}

export default function DashboardLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="favorites" options={{ title: "Favorites" }} />
      <Tabs.Screen name="reservation" options={{ title: "Reservation" }} />
      <Tabs.Screen name="account" options={{ title: "Account" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",  // float above the screen bottom
    bottom: 20,            // distance from bottom
    left: 16,
    right: 16,
    height: 70,
  },
  tabBar: {
    flexDirection: "row",
    height: 70,
    alignItems: "center",
    backgroundColor: "#83492B",
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circleIndicator: {
    position: "absolute",
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    backgroundColor: "#392C21",
    borderRadius: INDICATOR_SIZE / 2,
    bottom: 10,
    zIndex: 0,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "700",
    textAlign: "center",
  },
});