import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";

const mockData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 50],
      color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

export default function HealthTrackerScreen() {
  const [isHealthConnected, setIsHealthConnected] = useState(false);

  const handleHealthConnect = () => {
    // Here you would implement Apple Health integration
    setIsHealthConnected(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Integration</Text>
          {!isHealthConnected ? (
            <TouchableOpacity
              style={styles.connectButton}
              onPress={handleHealthConnect}
            >
              <Text style={styles.connectButtonText}>Connect Apple Health</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.connectedText}>Connected to Apple Health</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Activity</Text>
          <LineChart
            data={mockData}
            width={Dimensions.get("window").width - 40}
            height={220}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Goals & Predictions</Text>
          <View style={styles.goalCard}>
            <Text style={styles.goalTitle}>Daily Steps</Text>
            <Text style={styles.goalValue}>8,432 / 10,000</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: "84%" }]} />
            </View>
          </View>
          <View style={styles.goalCard}>
            <Text style={styles.goalTitle}>Active Minutes</Text>
            <Text style={styles.goalValue}>45 / 60</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: "75%" }]} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Workout Data</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Manual Entry</Text>
          </TouchableOpacity>
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
  connectButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  connectButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  connectedText: {
    color: "#28a745",
    fontSize: 16,
    fontWeight: "600",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  goalCard: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 5,
  },
  goalValue: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e9ecef",
    borderRadius: 3,
  },
  progress: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 3,
  },
  addButton: {
    borderWidth: 2,
    borderColor: "#007AFF",
    borderStyle: "dashed",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
