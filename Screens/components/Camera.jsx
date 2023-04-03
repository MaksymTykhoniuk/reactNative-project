import { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../../firebase/config";
import { useSelector } from "react-redux";

const CameraScreen = ({ onClose, onSnap }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (photo) {
      uploadImageToStoradge();
    }
  }, [photo]);

  const uploadImageToStoradge = async () => {
    setUploading(true);
    // onClose();
    const uniquePostId = Date.now().toString();

    const response = await fetch(photo);
    const blob = await response.blob();
    var ref = firebase.storage().ref(`postImage/${uniquePostId}`).put(blob);

    try {
      await ref;
    } catch (error) {
      console.log(error);
    }

    // const processedPhoto = await firebase
    //   .storage()
    //   .ref("postImage")
    //   .child(uniquePostId)
    //   .getDownloadURL();
    // console.log(processedPhoto);
    setUploading(false);
    alert("image uploaded");

    return processedPhoto;
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ratio="1:1"
        style={styles.camera}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        {photo && (
          <View style={styles.recentPhoto}>
            <Image
              style={{ flex: 1 }}
              source={{
                uri: photo,
              }}
            />
          </View>
        )}

        <View style={styles.photoView}>
          <TouchableOpacity
            // onPress={uploadImageToStoradge}
            onPress={onClose}
            style={styles.iconClose}
          >
            <Ionicons name="close" size={36} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();

                await MediaLibrary.createAssetAsync(uri);
                setPhoto(uri);
                onSnap(uri);
              }
            }}
          >
            <View style={styles.takePhotoOut}>
              <View style={styles.takePhotoInner}></View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Ionicons name="camera-reverse-outline" size={36} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4f4",
    justifyContent: "flex-end",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  photoView: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
  },

  flipContainer: {
    position: "absolute",
    bottom: 5,
    right: 35,
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
  iconClose: {
    position: "absolute",
    top: 8,
    left: 35,
    zIndex: 20,
  },
  recentPhoto: {
    position: "absolute",
    top: 20,
    left: 20,
    borderColor: "white",
    borderWidth: 0.5,
    borderRadius: 10,
    overflow: "hidden",
    width: 100,
    height: 100,
  },
});

export default CameraScreen;
