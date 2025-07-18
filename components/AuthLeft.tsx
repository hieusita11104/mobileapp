import React from "react";
import { View, Image, StyleSheet, Platform, Dimensions, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

const AuthLeft: React.FC = () => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const containerStyle = [
    styles.container, 
    isWeb && width > 800 ? styles.webContainer : styles.mobileContainer
  ];

  const content = (
    <>
      {/* Animated Background Elements */}
      <Animated.View 
        style={[
          styles.decorativeCircle1,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]} 
      />
      <Animated.View 
        style={[
          styles.decorativeCircle2,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]} 
      />
      <Animated.View 
        style={[
          styles.decorativeCircle3,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]} 
      />
      
      {/* Logo Container */}
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        <View style={styles.logoWrapper}>
          <Image 
            source={require("../assets/images/logo.png")} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </Animated.View>
      
      {/* Floating Elements */}
      <Animated.View 
        style={[
          styles.floatingElement1,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]} 
      />
      <Animated.View 
        style={[
          styles.floatingElement2,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]} 
      />
    </>
  );

  // Render with LinearGradient for web, regular View for mobile
  if (isWeb && width > 800) {
    return (
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={containerStyle}
      >
        {content}
      </LinearGradient>
    );
  }

  return (
    <View style={containerStyle}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  webContainer: {
    width: "50%",
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
  },
  mobileContainer: {
    flex: 0.25,
    width: "100%",
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  decorativeCircle1: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  decorativeCircle3: {
    position: "absolute",
    top: "30%",
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  logoWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: isWeb ? 24 : 16,
    padding: isWeb ? 20 : 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  logo: {
    width: isWeb ? 120 : 80,
    height: isWeb ? 120 : 80,
  },
  floatingElement1: {
    position: "absolute",
    top: "20%",
    right: "20%",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  floatingElement2: {
    position: "absolute",
    bottom: "25%",
    left: "25%",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});

export default AuthLeft;