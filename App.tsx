import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

// Import screens
import HomeScreen from "./src/screens/HomeScreen";
import WorkoutScreen from "./src/screens/WorkoutScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import HealthTrackerScreen from "./src/screens/HealthTrackerScreen";
import MuscleTrackerScreen from "./src/screens/MuscleTrackerScreen";
import WorkoutSessionScreen from "./src/screens/WorkoutSessionScreen";
import MapScreen from "./src/screens/MapScreen";
import GachaScreen from "./src/screens/GachaScreen";
import MotivationScreen from "./src/screens/TikTokMotivationScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Workout") {
            iconName = focused ? "fitness" : "fitness-outline";
          } else if (route.name === "Health") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Muscles") {
            iconName = focused ? "body" : "body-outline";
          } else if (route.name === "Motivation") {
            iconName = focused ? "flame" : "flame-outline";
          } else if (route.name === "Gacha") {
            iconName = focused ? "gift" : "gift-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#E5E5EA",
          backgroundColor: "#FFFFFF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workout" component={WorkoutScreen} />
      <Tab.Screen name="Health" component={HealthTrackerScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Muscles" component={MuscleTrackerScreen} />
      <Tab.Screen name="Motivation" component={MotivationScreen} />
      <Tab.Screen name="Gacha" component={GachaScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#007AFF",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WorkoutSession"
            component={WorkoutSessionScreen}
            options={{ title: "Workout Session" }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "Profile" }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
