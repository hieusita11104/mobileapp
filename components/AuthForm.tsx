import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";

const isWeb = Platform.OS === "web";

interface AuthFormProps {
  isSignUp: boolean;
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
  handleChange: (name: string, value: string) => void;
  handleSubmit: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isSignUp,
  formData,
  formError,
  handleChange,
  handleSubmit,
}) => (
  <View style={styles.container}>
    <View style={styles.formContainer}>
      {/* First field - Email/Username or Username */}
      <View style={styles.formGroup}>
        <TextInput
          label={isSignUp ? "Username" : "Email or Username"}
          value={isSignUp ? formData.username : formData.emailOrUsername}
          onChangeText={(text) => handleChange(isSignUp ? "username" : "emailOrUsername", text)}
          style={styles.input}
          error={!!(isSignUp ? formError.username : formError.emailOrUsername)}
          mode="outlined"
          autoCapitalize="none"
          outlineColor="rgba(102, 126, 234, 0.3)"
          activeOutlineColor="#667eea"
          dense
        />
        {!!(isSignUp ? formError.username : formError.emailOrUsername) && (
          <Text style={styles.errorText}>
            {isSignUp ? formError.username : formError.emailOrUsername}
          </Text>
        )}
      </View>
      
      {/* Conditional fields container */}
      {isSignUp && (
        <>
          {/* Full Name field */}
          <View style={styles.formGroup}>
            <TextInput
              label="Full Name"
              value={formData.fullName}
              onChangeText={(text) => handleChange("fullName", text)}
              style={styles.input}
              error={!!formError.fullName}
              mode="outlined"
              outlineColor="rgba(102, 126, 234, 0.3)"
              activeOutlineColor="#667eea"
              dense
            />
            {!!formError.fullName && (
              <Text style={styles.errorText}>{formError.fullName}</Text>
            )}
          </View>
          
          {/* Email field */}
          <View style={styles.formGroup}>
            <TextInput
              label="Email"
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              style={styles.input}
              error={!!formError.email}
              mode="outlined"
              autoCapitalize="none"
              keyboardType="email-address"
              outlineColor="rgba(102, 126, 234, 0.3)"
              activeOutlineColor="#667eea"
              dense
            />
            {!!formError.email && (
              <Text style={styles.errorText}>{formError.email}</Text>
            )}
          </View>
        </>
      )}
      
      {/* Password field */}
      <View style={styles.formGroup}>
        <TextInput
          label="Password"
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry
          style={styles.input}
          error={!!formError.password}
          mode="outlined"
          outlineColor="rgba(102, 126, 234, 0.3)"
          activeOutlineColor="#667eea"
          dense
        />
        {!!formError.password && <Text style={styles.errorText}>{formError.password}</Text>}
      </View>
      
      {/* Confirm Password field */}
      {isSignUp && (
        <View style={styles.formGroup}>
          <TextInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            secureTextEntry
            style={styles.input}
            error={!!formError.confirmPassword}
            mode="outlined"
            outlineColor="rgba(102, 126, 234, 0.3)"
            activeOutlineColor="#667eea"
            dense
          />
          {!!formError.confirmPassword && (
            <Text style={styles.errorText}>{formError.confirmPassword}</Text>
          )}
        </View>
      )}
    </View>
    
    <Button
      mode="contained"
      onPress={handleSubmit}
      style={styles.button}
      contentStyle={styles.buttonContent}
      labelStyle={styles.buttonLabel}
      buttonColor="#667eea"
    >
      {isSignUp ? "Sign Up" : "Sign In"}
    </Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 350,
    alignSelf: "center",
  },
  formContainer: {
    marginBottom: 8,
  },
  formGroup: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    fontSize: 14,
    height: 48,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 11,
    marginTop: 2,
    marginLeft: 4,
  },
  button: {
    marginTop: 8,
    borderRadius: 12,
    minHeight: 48,
    elevation: 2,
    shadowColor: "#667eea",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonContent: {
    minHeight: 48,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
  },
});

export default AuthForm;