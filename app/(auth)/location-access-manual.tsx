import Button from "@/components/Button"; // Your custom button component
import JostFont from "@/constants/jost-font";
import { moderateScale, verticalScale } from "@/utils/scaling";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const AddressConfirmationScreen = () => {
  const [address, setAddress] = useState("123 Main Street");
  const [buildingName, setBuildingName] = useState("Empire State Building");
  const [addressLabel, setAddressLabel] = useState("Office");
  const [region, setRegion] = useState({
    latitude: 40.748817,
    longitude: -73.985428,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  return (
    <View style={styles.container}>
      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          provider="google"
          showsBuildings={true}
          showsTraffic={false}
          showsIndoors={false}
          mapType="standard"
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            pinColor="#2CDA9D" // Light teal color
          />
        </MapView>
      </View>

      {/* Address Form */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionHeader}>Confirm Your Location</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your full address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Building Name/Number</Text>
          <TextInput
            style={styles.input}
            value={buildingName}
            onChangeText={setBuildingName}
            placeholder="Building name or number"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Save As</Text>
          <TextInput
            style={styles.input}
            value={addressLabel}
            onChangeText={setAddressLabel}
            placeholder="home, office, etc."
          />
        </View>

        <Button
          label="Confirm Address"
          onPress={() => console.log("Address confirmed")}
          theme="primary"
        />
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  mapContainer: {
    height: height * 0.4,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionHeader: {
    fontSize: moderateScale(24),
    fontFamily: JostFont.medium,
    marginBottom: verticalScale(24),
  },
  inputGroup: {
    marginBottom: verticalScale(20),
  },
  inputLabel: {
    fontSize: moderateScale(16),
    marginBottom: 8,
    fontFamily: JostFont.normal,
  },
  input: {
    backgroundColor: "#F7FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: "#1A202C",
  },
  confirmButton: {
    marginTop: 16,
    backgroundColor: "#3182CE",
  },
});

export default AddressConfirmationScreen;
