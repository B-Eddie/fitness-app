import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function ProfileScreen() {
  const { user, userProfile, updateUserProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(
    userProfile?.displayName || ""
  );
  const [height, setHeight] = useState(userProfile?.height?.toString() || "");
  const [weight, setWeight] = useState(userProfile?.weight?.toString() || "");
  const [fitnessGoals, setFitnessGoals] = useState(
    userProfile?.fitnessGoals?.join(", ") || ""
  );

  const handleSave = async () => {
    try {
      await updateUserProfile({
        displayName,
        height: height ? parseFloat(height) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
        fitnessGoals: fitnessGoals
          .split(",")
          .map((goal) => goal.trim())
          .filter(Boolean),
      });
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <Text style={styles.email}>Email: {user?.email}</Text>

        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Display Name"
              value={displayName}
              onChangeText={setDisplayName}
            />
            <TextInput
              style={styles.input}
              placeholder="Height (cm)"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Weight (kg)"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Fitness Goals (comma-separated)"
              value={fitnessGoals}
              onChangeText={setFitnessGoals}
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.info}>
              Display Name: {userProfile?.displayName || "Not set"}
            </Text>
            <Text style={styles.info}>
              Height:{" "}
              {userProfile?.height ? `${userProfile.height} cm` : "Not set"}
            </Text>
            <Text style={styles.info}>
              Weight:{" "}
              {userProfile?.weight ? `${userProfile.weight} kg` : "Not set"}
            </Text>
            <Text style={styles.info}>
              Fitness Goals:{" "}
              {userProfile?.fitnessGoals?.join(", ") || "Not set"}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    margin: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
