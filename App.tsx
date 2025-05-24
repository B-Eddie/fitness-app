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
import FeedScreen from "./src/screens/FeedScreen";
import WorkoutSessionScreen from "./src/screens/WorkoutSessionScreen";
import MapScreen from "./src/screens/MapScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#E5E5EA",
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Tab.Screen
        name="Health"
        component={HealthTrackerScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 24 }}>❤️</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Muscles"
        component={MuscleTrackerScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 24 }}>💪</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 24 }}>🗺️</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 24 }}>📱</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutSessionScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 24 }}>🏋️‍♂️</Text>
          ),
        }}
      />
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
