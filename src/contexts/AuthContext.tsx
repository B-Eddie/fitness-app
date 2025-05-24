import React, { createContext, useState, useContext } from "react";

interface UserProfile {
  email: string;
  displayName?: string;
  height?: number;
  weight?: number;
  fitnessGoals?: string[];
}

interface AuthContextType {
  user: { email: string } | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading] = useState(false);

  const signUp = async (email: string, password: string) => {
    // Mock signup - in a real app, this would validate and create a user
    const newUser = { email };
    setUser(newUser);
    setUserProfile({
      email,
      createdAt: new Date(),
    });
  };

  const signIn = async (email: string, password: string) => {
    // Mock signin - in a real app, this would validate credentials
    const mockUser = { email };
    setUser(mockUser);
    setUserProfile({
      email,
      displayName: "Demo User",
      height: 175,
      weight: 70,
      fitnessGoals: ["Build Muscle", "Improve Endurance"],
    });
  };

  const logout = async () => {
    setUser(null);
    setUserProfile(null);
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    setUserProfile((prev) => (prev ? { ...prev, ...data } : null));
  };

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
