import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const latitude = route.params.geo.latitude;
  const longitude = route.params.geo.longitude;
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default MapScreen;
