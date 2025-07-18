import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  username: string;
  email: string;
  fullName?: string;
}

interface FormData {
  emailOrUsername: string;
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormError {
  emailOrUsername: string;
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const useAuthLogic = (setUser: (user: User) => void) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const [formData, setFormData] = useState<FormData>({
    emailOrUsername: "",
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState<FormError>({
    emailOrUsername: "",
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const errors: FormError = {
      emailOrUsername: "",
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (isSignUp) {
      // Validate username
      if (!formData.username.trim()) {
        errors.username = "Username is required";
      } else if (formData.username.length < 3) {
        errors.username = "Username must be at least 3 characters";
      }

      // Validate full name
      if (!formData.fullName.trim()) {
        errors.fullName = "Full name is required";
      }

      // Validate email
      if (!formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        errors.email = "Please enter a valid email address";
      }

      // Validate password
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }

      // Validate confirm password
      if (!formData.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    } else {
      // Login validation
      if (!formData.emailOrUsername.trim()) {
        errors.emailOrUsername = "Email or username is required";
      }

      if (!formData.password) {
        errors.password = "Password is required";
      }
    }

    setFormError(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formError[name as keyof FormError]) {
      setFormError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const showAlert = (message: string, type: "success" | "error") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  const handleSubmitLogin = async () => {
    if (!validateForm()) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock successful login
      const user: User = {
        username: formData.emailOrUsername,
        email: formData.emailOrUsername.includes("@") ? formData.emailOrUsername : `${formData.emailOrUsername}@example.com`,
      };

      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      showAlert("Login successful!", "success");
    } catch (error) {
      showAlert("Login failed. Please try again.", "error");
    }
  };

  const handleSubmitRegister = async () => {
    if (!validateForm()) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const user: User = {
        username: formData.username,
        email: formData.email,
        fullName: formData.fullName,
      };

      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      showAlert("Registration successful!", "success");
    } catch (error) {
      showAlert("Registration failed. Please try again.", "error");
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    // Clear form data when switching
    setFormData({
      emailOrUsername: "",
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setFormError({
      emailOrUsername: "",
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return {
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
  };
};

export default useAuthLogic; 