import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route, navigation }) => {
  const latitudeData = route.params.posts[0].geoData.latitude;
  const longitudeData = route.params.posts[0].geoData.longitude;
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitudeData,
          longitude: longitudeData,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitudeData,
            longitude: longitudeData,
          }}
        />
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
