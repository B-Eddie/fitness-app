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

// Mock data for muscle groups
const muscleGroups = [
  {
    id: "chest",
    name: "Chest",
    intensity: 0.7,
    lastWorked: "2 days ago",
  },
  {
    id: "back",
    name: "Back",
    intensity: 0.3,
    lastWorked: "5 days ago",
  },
  {
    id: "shoulders",
    name: "Shoulders",
    intensity: 0.5,
    lastWorked: "1 day ago",
  },
  {
    id: "arms",
    name: "Arms",
    intensity: 0.8,
    lastWorked: "Today",
  },
  {
    id: "legs",
    name: "Legs",
    intensity: 0.4,
    lastWorked: "3 days ago",
  },
  {
    id: "core",
    name: "Core",
    intensity: 0.6,
    lastWorked: "Yesterday",
  },
];

const getIntensityColor = (intensity: number) => {
  if (intensity >= 0.8) return "#dc3545"; // Red for high intensity
  if (intensity >= 0.5) return "#ffc107"; // Yellow for medium intensity
  return "#28a745"; // Green for low intensity
};

export default function MuscleTrackerScreen() {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Muscle Groups</Text>
          <View style={styles.modelContainer}>
            {/* Placeholder for 3D model */}
            <View style={styles.modelPlaceholder}>
              <Text style={styles.modelPlaceholderText}>3D Model View</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Report</Text>
          <View style={styles.muscleList}>
            {muscleGroups.map((muscle) => (
              <TouchableOpacity
                key={muscle.id}
                style={[
                  styles.muscleCard,
                  selectedMuscle === muscle.id && styles.selectedMuscle,
                ]}
                onPress={() => setSelectedMuscle(muscle.id)}
              >
                <View style={styles.muscleHeader}>
                  <Text style={styles.muscleName}>{muscle.name}</Text>
                  <View
                    style={[
                      styles.intensityIndicator,
                      { backgroundColor: getIntensityColor(muscle.intensity) },
                    ]}
                  />
                </View>
                <Text style={styles.lastWorked}>
                  Last worked: {muscle.lastWorked}
                </Text>
                <View style={styles.intensityBar}>
                  <View
                    style={[
                      styles.intensityFill,
                      {
                        width: `${muscle.intensity * 100}%`,
                        backgroundColor: getIntensityColor(muscle.intensity),
                      },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Warnings</Text>
          <View style={styles.warningCard}>
            <Text style={styles.warningTitle}>⚠️ High Intensity Alert</Text>
            <Text style={styles.warningText}>
              Arms muscle group has been worked at high intensity for 3
              consecutive days. Consider taking a rest day.
            </Text>
          </View>
        </View>
      </ScrollView>
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
  modelContainer: {
    height: 300,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    overflow: "hidden",
  },
  modelPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9ecef",
  },
  modelPlaceholderText: {
    color: "#666",
    fontSize: 16,
  },
  muscleList: {
    gap: 10,
  },
  muscleCard: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  selectedMuscle: {
    borderColor: "#007AFF",
    backgroundColor: "#e6f2ff",
  },
  muscleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  muscleName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
  },
  intensityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  lastWorked: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  intensityBar: {
    height: 4,
    backgroundColor: "#e9ecef",
    borderRadius: 2,
  },
  intensityFill: {
    height: "100%",
    borderRadius: 2,
  },
  warningCard: {
    backgroundColor: "#fff3cd",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffeeba",
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#856404",
    marginBottom: 5,
  },
  warningText: {
    fontSize: 14,
    color: "#856404",
  },
});
