import React from "react";
import { ScrollView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LoginnScreen = ({ navigation }: { navigation: any }) => {
  return (
    
    <SafeAreaView style={styles.container}>
       <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.heartRateTitleWrapper}>
        <Text style={styles.heartRateTitleText}>Login Page</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("BluetoothConnection")}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  ctaButton: {
    backgroundColor: "#19f0ff",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 7,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default LoginnScreen;
