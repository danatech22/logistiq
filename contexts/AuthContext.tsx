// context/AuthContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router"; // Import router for redirection
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

// Define the shape of our AuthContext
interface AuthContextType {
  userToken: string | null;
  isLoadingAuth: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (username: string, password: string, email: string) => Promise<void>;
  setAuthToken: (token: string | null) => Promise<void>; // Added: Function to manually set the token
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export function AuthProvider({ children }: PropsWithChildren) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Tracks if auth state is being loaded

  useEffect(() => {
    // Load user token from AsyncStorage on app start
    const loadUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          setUserToken(token);
        }
      } catch (error) {
        console.error("Failed to load user token from AsyncStorage", error);
      } finally {
        setIsLoadingAuth(false); // Auth state loading complete
      }
    };

    loadUserToken();
  }, []);

  // Mock sign-in function
  const signIn = async (username: string, password: string) => {
    setIsLoadingAuth(true); // Set loading true during sign-in process
    try {
      // Simulate API call for sign-in
      console.log("Attempting to sign in with:", username, password);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      const mockToken = `mock-token-${username}`; // Generate a mock token
      await AsyncStorage.setItem("userToken", mockToken);
      setUserToken(mockToken);
      router.replace("/(app)"); // Navigate to the main app after successful sign-in
    } catch (error) {
      console.error("Sign-in failed:", error);
      // In a real app, you'd handle specific error messages (e.g., invalid credentials)
    } finally {
      setIsLoadingAuth(false); // Sign-in process complete
    }
  };

  // Mock sign-up function
  const signUp = async (username: string, password: string, email: string) => {
    setIsLoadingAuth(true); // Set loading true during sign-up process
    try {
      // Simulate API call for sign-up
      console.log("Attempting to sign up with:", username, password, email);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
      const mockToken = `mock-token-${username}`; // Generate a mock token
      await AsyncStorage.setItem("userToken", mockToken);
      setUserToken(mockToken);
      router.replace("/(app)"); // Navigate to the main app after successful sign-up
    } catch (error) {
      console.error("Sign-up failed:", error);
    } finally {
      setIsLoadingAuth(false); // Sign-up process complete
    }
  };

  // Mock sign-out function
  const signOut = async () => {
    setIsLoadingAuth(true); // Set loading true during sign-out process
    try {
      await AsyncStorage.removeItem("userToken");
      setUserToken(null);
      router.replace("/(auth)/login"); // Redirect to sign-in screen after sign-out
    } catch (error) {
      console.error("Sign-out failed:", error);
    } finally {
      setIsLoadingAuth(false); // Sign-out process complete
    }
  };

  // New function to manually set the authentication token
  const setAuthToken = async (token: string | null) => {
    setIsLoadingAuth(true); // Indicate loading while setting token
    try {
      if (token) {
        await AsyncStorage.setItem("userToken", token);
        setUserToken(token);
        router.replace("/(app)"); // Navigate to the main app if a token is set
      } else {
        await AsyncStorage.removeItem("userToken");
        setUserToken(null);
        router.replace("/(auth)/login"); // Redirect to sign-in if token is cleared
      }
    } catch (error) {
      console.error("Failed to manually set auth token:", error);
    } finally {
      setIsLoadingAuth(false); // Token setting complete
    }
  };

  // Provide the context value to children components
  const value = {
    userToken,
    isLoadingAuth,
    signIn,
    signOut,
    signUp,
    setAuthToken, // Added to the context value
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
