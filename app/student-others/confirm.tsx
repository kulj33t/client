import { View, Text, TouchableWithoutFeedback, Animated, StyleSheet } from "react-native";
import { useState, useRef } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

const AnimatedButton = ({
  onPress,
  children,
  style,
}: {
  onPress: () => void;
  children: React.ReactNode;
  style: any;
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
      tension: 40,
    }).start();
    onPress();
  };

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default function AttendanceConfirmation() {
  const router = useRouter();
  const { branch, semester, subject } = useLocalSearchParams();

  const [markComplete, setMarkComplete] = useState(false);

  const handleMarkPresent = () => {
    setMarkComplete(true);
    setTimeout(() => router.replace("/student/home"), 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Attendance Confirmation</Text>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Subject:</Text>
        <Text style={styles.value}>{subject}</Text>

        <Text style={styles.label}>Branch:</Text>
        <Text style={styles.value}>{branch}</Text>

        <Text style={styles.label}>Semester:</Text>
        <Text style={styles.value}>{semester}</Text>
      </View>

      <View style={styles.buttonGroup}>
        {!markComplete && (
          <AnimatedButton onPress={handleMarkPresent} style={styles.activeButton}>
            <Text style={styles.buttonText}>Register Attendance</Text>
          </AnimatedButton>
        )}

        {markComplete && (
          <View style={styles.disabledButton}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
    
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  detailBox: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#111",
  },
  buttonGroup: {
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#FF4D6D",
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 12,
    alignItems: "center",
    width: "75%",
  },
  disabledButton: {
    backgroundColor: "#aaa",
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 12,
    alignItems: "center",
    width: "75%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
