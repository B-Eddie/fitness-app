import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

const fitnessGoals = [
  {
    id: "cardio",
    title: "Cardiovascular Endurance",
    description:
      "Improve your ability to perform exercises at moderate-to-vigorous intensities for a prolonged period of time.",
    icon: "🏃‍♂️",
  },
  {
    id: "strength",
    title: "Muscular Strength & Endurance",
    description:
      "Increase how much force your muscles can exert or how heavy weights they can lift.",
    icon: "💪",
  },
  {
    id: "flexibility",
    title: "Flexibility",
    description:
      "Enhance your ability to move muscles and joints through a full range of motion.",
    icon: "🧘‍♀️",
  },
  {
    id: "composition",
    title: "Body Composition",
    description:
      "Optimize your body's ratio of fat mass to fat-free mass like muscle and bone.",
    icon: "⚖️",
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    // Here you would typically save the selected goals
    navigation.replace("Main");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Fitness Goals</Text>
          <Text style={styles.subtitle}>
            Select one or more goals to personalize your experience
          </Text>
        </View>

        <View style={styles.goalsContainer}>
          {fitnessGoals.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.goalCard,
                selectedGoals.includes(goal.id) && styles.selectedGoal,
              ]}
              onPress={() => toggleGoal(goal.id)}
            >
              <Text style={styles.goalIcon}>{goal.icon}</Text>
              <Text style={styles.goalTitle}>{goal.title}</Text>
              <Text style={styles.goalDescription}>{goal.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedGoals.length === 0 && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={selectedGoals.length === 0}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  goalsContainer: {
    gap: 15,
  },
  goalCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: "#e9ecef",
  },
  selectedGoal: {
    borderColor: "#007AFF",
    backgroundColor: "#e6f2ff",
  },
  goalIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 5,
  },
  goalDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
