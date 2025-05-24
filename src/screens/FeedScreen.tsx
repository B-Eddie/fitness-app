import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Mock data for feed posts
const feedPosts = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      avatar: "👩",
      location: "New York",
    },
    content: "Just completed my first 10K run! 🏃‍♀️ #FitnessJourney",
    likes: 128,
    comments: 24,
    timeAgo: "2h",
  },
  {
    id: "2",
    user: {
      name: "Mike Chen",
      avatar: "👨",
      location: "Los Angeles",
    },
    content:
      "New personal best on deadlifts today! 315lbs 💪 #StrengthTraining",
    likes: 256,
    comments: 42,
    timeAgo: "4h",
  },
  {
    id: "3",
    user: {
      name: "Emma Wilson",
      avatar: "👩",
      location: "Chicago",
    },
    content: "Morning yoga session with an amazing view 🌅 #YogaLife",
    likes: 89,
    comments: 15,
    timeAgo: "6h",
  },
];

const PostCard = ({ post }: { post: (typeof feedPosts)[0] }) => (
  <View style={styles.postCard}>
    <View style={styles.postHeader}>
      <View style={styles.userInfo}>
        <Text style={styles.avatar}>{post.user.avatar}</Text>
        <View>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.location}>{post.user.location}</Text>
        </View>
      </View>
      <Text style={styles.timeAgo}>{post.timeAgo}</Text>
    </View>

    <Text style={styles.postContent}>{post.content}</Text>

    <View style={styles.postActions}>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="heart-outline" size={24} color="#666" />
        <Text style={styles.actionText}>{post.likes}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="chatbubble-outline" size={24} color="#666" />
        <Text style={styles.actionText}>{post.comments}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="share-outline" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Feed</Text>
        <TouchableOpacity style={styles.createButton}>
          <Ionicons name="add-circle" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={feedPosts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feedList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
  },
  createButton: {
    padding: 5,
  },
  feedList: {
    padding: 15,
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    fontSize: 24,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
  timeAgo: {
    fontSize: 14,
    color: "#666",
  },
  postContent: {
    fontSize: 16,
    color: "#212529",
    marginBottom: 15,
    lineHeight: 22,
  },
  postActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
    color: "#666",
  },
});
