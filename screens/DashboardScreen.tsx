import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DashboardScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Dashboard Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default DashboardScreen;