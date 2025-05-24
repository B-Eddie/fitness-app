import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const intensityLevels = [
  { id: "low", name: "Low", description: "Light exercise, easy to maintain" },
  {
    id: "medium",
    name: "Medium",
    description: "Moderate effort, can talk but not sing",
  },
  {
    id: "high",
    name: "High",
    description: "Vigorous exercise, difficult to talk",
  },
];

const exercises = [
  {
    id: "1",
    name: "Push-ups",
    sets: 3,
    reps: 12,
    rest: 60,
  },
  {
    id: "2",
    name: "Squats",
    sets: 3,
    reps: 15,
    rest: 60,
  },
  {
    id: "3",
    name: "Plank",
    sets: 3,
    duration: 30,
    rest: 45,
  },
];

export default function WorkoutSessionScreen() {
  const [selectedIntensity, setSelectedIntensity] = useState<string | null>(
    null
  );
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);

  const handleStartWorkout = () => {
    if (!selectedIntensity) {
      Alert.alert(
        "Select Intensity",
        "Please select an intensity level to begin."
      );
      return;
    }
    setIsWorkoutActive(true);
  };

  const handleCompleteExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      Alert.alert(
        "Workout Complete!",
        "Great job! Would you like to save your workout?",
        [
          {
            text: "Save",
            onPress: () => {
              // Save workout data
              setIsWorkoutActive(false);
              setCurrentExercise(0);
            },
          },
          {
            text: "Discard",
            onPress: () => {
              setIsWorkoutActive(false);
              setCurrentExercise(0);
            },
            style: "destructive",
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isWorkoutActive ? (
        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Intensity</Text>
            <View style={styles.intensityContainer}>
              {intensityLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.intensityCard,
                    selectedIntensity === level.id && styles.selectedIntensity,
                  ]}
                  onPress={() => setSelectedIntensity(level.id)}
                >
                  <Text style={styles.intensityName}>{level.name}</Text>
                  <Text style={styles.intensityDescription}>
                    {level.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Workout Plan</Text>
            {exercises.map((exercise) => (
              <View key={exercise.id} style={styles.exerciseCard}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <View style={styles.exerciseDetails}>
                  <Text style={styles.exerciseDetail}>
                    {exercise.sets} sets ×{" "}
                    {exercise.reps
                      ? `${exercise.reps} reps`
                      : `${exercise.duration}s`}
                  </Text>
                  <Text style={styles.exerciseDetail}>
                    {exercise.rest}s rest
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.startButton,
              !selectedIntensity && styles.disabledButton,
            ]}
            onPress={handleStartWorkout}
            disabled={!selectedIntensity}
          >
            <Text style={styles.startButtonText}>Start Workout</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={styles.activeWorkout}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.currentExercise}>
              {exercises[currentExercise].name}
            </Text>
            <Text style={styles.exerciseProgress}>
              {currentExercise + 1} of {exercises.length}
            </Text>
          </View>

          <View style={styles.exerciseInfo}>
            <Text style={styles.setInfo}>
              Set {currentExercise + 1} of {exercises[currentExercise].sets}
            </Text>
            <Text style={styles.repInfo}>
              {exercises[currentExercise].reps
                ? `${exercises[currentExercise].reps} reps`
                : `${exercises[currentExercise].duration}s`}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleCompleteExercise}
          >
            <Text style={styles.completeButtonText}>Complete Set</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 15,
  },
  intensityContainer: {
    gap: 10,
  },
  intensityCard: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  selectedIntensity: {
    borderColor: "#007AFF",
    backgroundColor: "#e6f2ff",
  },
  intensityName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 5,
  },
  intensityDescription: {
    fontSize: 14,
    color: "#666",
  },
  exerciseCard: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 5,
  },
  exerciseDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  exerciseDetail: {
    fontSize: 14,
    color: "#666",
  },
  startButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    margin: 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  activeWorkout: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  exerciseHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  currentExercise: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 5,
  },
  exerciseProgress: {
    fontSize: 16,
    color: "#666",
  },
  exerciseInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  setInfo: {
    fontSize: 18,
    color: "#212529",
    marginBottom: 5,
  },
  repInfo: {
    fontSize: 16,
    color: "#666",
  },
  completeButton: {
    backgroundColor: "#28a745",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
