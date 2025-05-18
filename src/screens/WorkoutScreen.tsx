import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type WorkoutScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const WorkoutScreen: React.FC<WorkoutScreenProps> = () => {
  const [workoutStarted, setWorkoutStarted] = useState(false);

  const dummyWorkout = {
    name: "Upper Body Strength",
    exercises: [
      {
        name: "Bench Press",
        sets: 3,
        reps: "8-12",
        rest: "90 sec",
      },
      {
        name: "Pull-ups",
        sets: 3,
        reps: "8-12",
        rest: "90 sec",
      },
      {
        name: "Shoulder Press",
        sets: 3,
        reps: "8-12",
        rest: "90 sec",
      },
    ],
  };

  return (
    <View style={styles.container}>
      {!workoutStarted ? (
        <View style={styles.preWorkout}>
          <Text style={styles.title}>Today's Workout</Text>
          <Text style={styles.workoutName}>{dummyWorkout.name}</Text>

          <View style={styles.workoutInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoValue}>45 min</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Difficulty</Text>
              <Text style={styles.infoValue}>Intermediate</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => setWorkoutStarted(true)}
          >
            <Text style={styles.buttonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.workoutContainer}>
          <Text style={styles.title}>In Progress</Text>
          {dummyWorkout.exercises.map((exercise, index) => (
            <View key={index} style={styles.exerciseCard}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <View style={styles.exerciseDetails}>
                <Text style={styles.detail}>Sets: {exercise.sets}</Text>
                <Text style={styles.detail}>Reps: {exercise.reps}</Text>
                <Text style={styles.detail}>Rest: {exercise.rest}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  preWorkout: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  workoutName: {
    fontSize: 20,
    color: "#666",
    marginBottom: 20,
  },
  workoutInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  infoItem: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    width: "48%",
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  startButton: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  workoutContainer: {
    padding: 20,
  },
  exerciseCard: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exerciseDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detail: {
    fontSize: 14,
    color: "#666",
  },
});

export default WorkoutScreen;
