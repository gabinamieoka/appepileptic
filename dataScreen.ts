import React from "react";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import useBLE from "../components/useBLE";
import DeviceModal from "../components/DeviceConnectionModal";

const MyDataScreen = ({ navigation }: { navigation: any }) => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    heartRate,
    disconnectFromDevice,
    heartRateHistory,
  } = useBLE();
  
  
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  console.log("vamos novamente", heartRateHistory);
  
  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };


  
  // Sanitize the data
  const sanitizedData = heartRateHistory.map(str => parseInt(str));

  // Log para verificar os dados recebidos
  console.log("Heart Rate History:", sanitizedData);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
        <Text style={styles.heartRateTitleText}>Meus Dados</Text>
        <Text style={styles.subTitleText}>Heart Rate over Time</Text>
        {sanitizedData.length > 0 ? (
          <LineChart
            data={{
              labels: sanitizedData.map((_, index) => index.toString()),
              datasets: [
                {
                  data: sanitizedData,
                },
              ],
            }}
            width={Dimensions.get("window").width - 40} // Largura do gráfico
            height={220} // Altura do gráfico
            yAxisLabel=""
            yAxisSuffix=" bpm"
            chartConfig={{
              backgroundColor: "#02a2ff",
              backgroundGradientFrom: "#009efa",
              backgroundGradientTo: "#2491f7",
              decimalPlaces: 0, // Casas decimais no eixo Y
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#26ffed",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        ) : (
          <Text style={styles.noDataText}>No heart rate data available</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {connectedDevice ? "Disconnect" : "Connect"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("MyData")}
        style={[styles.ctaButton, { marginTop: 10 }]}
      >
        <Text style={styles.ctaButtonText}>Go to My Data</Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
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
  subTitleText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 18,
    marginTop: 15,
    color: "red",
  },
    ctaButton: {
      backgroundColor: "#6078ff",
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      marginHorizontal: 20,
      marginBottom: 5,
      borderRadius: 8,
    },
    ctaButtonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
    },
  
});

export default MyDataScreen;
