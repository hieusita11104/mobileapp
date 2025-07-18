import React from "react";
import { View, Text, StyleSheet, Platform, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AuthForm from "./AuthForm";
import AuthToggle from "./AuthToggle";

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

interface AuthRightProps {
  isSignUp: boolean;
  alertVisible: boolean;
  setAlertVisible: (visible: boolean) => void;
  alertMessage: string;
  alertType: "success" | "error";
  formData: {
    emailOrUsername: string;
    username: string;
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  formError: {
    emailOrUsername: string;
    username: string;
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleSubmitLogin: () => void;
  handleSubmitRegister: () => void;
  toggleForm: () => void;
  handleChange: (name: string, value: string) => void;
}

const AuthRight: React.FC<AuthRightProps> = ({
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
}) => {
  return (
    <View style={styles.rightPanel}>
      <View style={styles.container}>
        <View style={styles.content}>
          <AuthToggle isSignUp={isSignUp} toggleForm={toggleForm} />
          
          <AuthForm
            isSignUp={isSignUp}
            formData={formData}
            formError={formError}
            handleChange={handleChange}
            handleSubmit={isSignUp ? handleSubmitRegister : handleSubmitLogin}
          />

          {/* Social Media Icons */}
          <View style={styles.socialContainer}>
            <View style={styles.socialIcon}>
              <Icon name="facebook" size={14} color="#1877f2" />
            </View>
            <View style={styles.socialIcon}>
              <Icon name="instagram" size={14} color="#e4405f" />
            </View>
            <View style={styles.socialIcon}>
              <Icon name="twitter" size={14} color="#1da1f2" />
            </View>
            <View style={styles.socialIcon}>
              <Icon name="linkedin" size={14} color="#0077b5" />
            </View>
            <View style={styles.socialIcon}>
              <Icon name="pinterest" size={14} color="#bd081c" />
            </View>
          </View>


        </View>
      </View>

      {/* Alert Display */}
      {alertVisible && (
        <View style={[styles.alert, alertType === "success" ? styles.successAlert : styles.errorAlert]}>
          <Text style={styles.alertText}>{alertMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rightPanel: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: isWeb && width > 800 ? 32 : 24,
    borderBottomRightRadius: isWeb && width > 800 ? 32 : 24,
    borderTopLeftRadius: isWeb && width > 800 ? 0 : 24,
    borderBottomLeftRadius: isWeb && width > 800 ? 0 : 24,
  },
  container: {
    flex: 1,
    padding: isWeb ? 20 : 16,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 380,
    width: "100%",
    alignSelf: "center",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(102, 126, 234, 0.05)",
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(102, 126, 234, 0.1)",
  },
  socialIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(102, 126, 234, 0.2)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  alert: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    zIndex: 1000,
  },
  successAlert: {
    backgroundColor: "#dcfce7",
    borderColor: "#bbf7d0",
    borderWidth: 1,
  },
  errorAlert: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
    borderWidth: 1,
  },
  alertText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },

});

export default AuthRight;