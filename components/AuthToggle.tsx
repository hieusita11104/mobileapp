import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Platform } from "react-native";

const isWeb = Platform.OS === "web";

interface AuthToggleProps {
  isSignUp: boolean;
  toggleForm: () => void;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ isSignUp, toggleForm }) => {
  return (
    <View style={styles.container}>
      <View style={styles.segmentedControl}>
    <TouchableOpacity
          style={[styles.segment, isSignUp && styles.activeSegment]}
      onPress={() => {
        if (!isSignUp) toggleForm();
      }}
          activeOpacity={0.7}
    >
          <Text style={[styles.segmentText, isSignUp && styles.activeSegmentText]}>
            Đăng ký
          </Text>
    </TouchableOpacity>
        
    <TouchableOpacity
          style={[styles.segment, !isSignUp && styles.activeSegment]}
      onPress={() => {
        if (isSignUp) toggleForm();
      }}
          activeOpacity={0.7}
    >
          <Text style={[styles.segmentText, !isSignUp && styles.activeSegmentText]}>
            Đăng nhập
          </Text>
    </TouchableOpacity>
      </View>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: "center",
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  segment: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  activeSegment: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
  activeSegmentText: {
    color: "#667eea",
  },
});

export default AuthToggle;