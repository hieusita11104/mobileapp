import React from "react";
import { View, StyleSheet, Platform, Dimensions, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useAuthLogic from "../hooks/useAuthLogic";
import AuthRight from "../components/AuthRight";

const { width, height } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

interface AuthPageProps {
  setUser: (user: { username: string; email: string; fullName?: string }) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ setUser }) => {
  const {
    isSignUp,
    alertVisible,
    setAlertVisible,
    alertMessage,
    alertType,
    formData,
    formError,
    handleSubmitLogin,
    handleSubmitRegister,
    toggleForm,
    handleChange,
  } = useAuthLogic(setUser);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      {/* Animated Gradient Background */}
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#334155', '#475569']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      />
      
      {/* Decorative Elements */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      <View style={styles.decorativeCircle3} />
      
      {/* Main Content */}
      <View style={[styles.contentContainer, isWeb && width > 800 ? styles.webLayout : styles.mobileLayout]}>
        {/* Auth Card */}
        <View style={[styles.authCard, isWeb && width > 800 ? styles.webCard : styles.mobileCard]}>
      <AuthRight
        isSignUp={isSignUp}
        alertVisible={alertVisible}
        setAlertVisible={setAlertVisible}
        alertMessage={alertMessage}
        alertType={alertType}
        formData={formData}
        formError={formError}
        handleSubmitLogin={handleSubmitLogin}
        handleSubmitRegister={handleSubmitRegister}
        toggleForm={toggleForm}
        handleChange={handleChange}
      />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  decorativeCircle1: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    opacity: 0.6,
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: "rgba(168, 85, 247, 0.08)",
    opacity: 0.4,
  },
  decorativeCircle3: {
    position: "absolute",
    top: "50%",
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(34, 197, 94, 0.06)",
    opacity: 0.3,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: isWeb ? 24 : 20,
  },
  webLayout: {
    minHeight: height,
  },
  mobileLayout: {
    minHeight: height,
    paddingVertical: 20,
  },
  authCard: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: isWeb ? 32 : 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  webCard: {
    flexDirection: "row",
    maxWidth: 1100,
    width: "100%",
    minHeight: 600,
    maxHeight: 650,
  },
  mobileCard: {
    flexDirection: "column",
    width: "100%",
    maxWidth: 420,
    minHeight: 650,
    maxHeight: 750,
  },
});

export default AuthPage;