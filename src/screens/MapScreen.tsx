import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

interface WorkoutSpot {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  type: "gym" | "park" | "outdoor" | "home";
  name: string;
  level: number;
  experience: number;
}

// Mock data for workout spots
const mockWorkoutSpots: WorkoutSpot[] = [
  {
    id: "1",
    coordinate: {
      latitude: 40.7128,
      longitude: -74.006,
    },
    type: "gym",
    name: "Central Fitness",
    level: 5,
    experience: 1000,
  },
  {
    id: "2",
    coordinate: {
      latitude: 40.7129,
      longitude: -74.0062,
    },
    type: "park",
    name: "Riverside Park",
    level: 3,
    experience: 500,
  },
];

const MapScreen = () => {
  const [selectedSpot, setSelectedSpot] = useState<WorkoutSpot | null>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const handleSpotPress = (spot: WorkoutSpot) => {
    setSelectedSpot(spot);
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "gym":
        return "💪";
      case "park":
        return "🌳";
      case "outdoor":
        return "🏃";
      case "home":
        return "🏠";
      default:
        return "📍";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "gym":
        return "#FF6B6B";
      case "park":
        return "#4CAF50";
      case "outdoor":
        return "#2196F3";
      case "home":
        return "#9C27B0";
      default:
        return "#757575";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={
          userLocation
            ? {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : {
                latitude: 40.7128,
                longitude: -74.006,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
        }
        showsUserLocation
        showsMyLocationButton
      >
        {mockWorkoutSpots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={spot.coordinate}
            onPress={() => handleSpotPress(spot)}
          >
            <View
              style={[
                styles.markerContainer,
                { backgroundColor: getTypeColor(spot.type) },
              ]}
            >
              <Text style={styles.markerText}>{getMarkerIcon(spot.type)}</Text>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>Lv.{spot.level}</Text>
              </View>
            </View>
          </Marker>
        ))}
      </MapView>

      {selectedSpot && (
        <View
          style={[
            styles.spotDetails,
            { borderColor: getTypeColor(selectedSpot.type) },
          ]}
        >
          <View style={styles.spotHeader}>
            <Text style={styles.spotName}>{selectedSpot.name}</Text>
            <Text style={styles.spotLevel}>Level {selectedSpot.level}</Text>
          </View>
          <View style={styles.typeContainer}>
            <Text
              style={[
                styles.typeBadge,
                { backgroundColor: getTypeColor(selectedSpot.type) },
              ]}
            >
              {selectedSpot.type.toUpperCase()}
            </Text>
          </View>
          <View style={styles.expContainer}>
            <Text style={styles.expText}>
              Experience: {selectedSpot.experience} XP
            </Text>
            <View style={styles.expBar}>
              <View
                style={[
                  styles.expFill,
                  {
                    width: `${(selectedSpot.experience % 1000) / 10}%`,
                    backgroundColor: getTypeColor(selectedSpot.type),
                  },
                ]}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: getTypeColor(selectedSpot.type) },
            ]}
          >
            <Text style={styles.buttonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  markerContainer: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerText: {
    fontSize: 20,
  },
  levelBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FFD700",
    borderRadius: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: "#fff",
  },
  levelText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
  },
  spotDetails: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    borderWidth: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  spotHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  spotName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  spotLevel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
  },
  typeContainer: {
    marginBottom: 15,
  },
  typeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  expContainer: {
    marginBottom: 15,
  },
  expText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  expBar: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  expFill: {
    height: "100%",
    borderRadius: 4,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MapScreen;
