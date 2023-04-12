import { useState, useEffect, useRef } from "react";

import * as Location from "expo-location";
import {
  Text,
  View,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StatusBar,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CameraScreen from "../components/Camera";

import firebase from "../../firebase/config";
import * as ImagePicker from "expo-image-picker";

const CreateScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  // const [location, setLocation] = useState("");
  const [locationText, setLocationText] = useState("");
  const [activeCamera, setActiveCamera] = useState(false);
  const [uploading, setUploading] = useState(false);

  const condition = name.trim() !== "" && locationText.trim() !== "";

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // useEffect(() => {
  //   if (photo) {
  //     uploadImageToStoradge();
  //   }
  // }, [photo]);

  const handleNameChange = (value) => setName(value);
  const handleLocationChange = (value) => setLocationText(value);

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const cleanForm = () => {
    setName("");
    setLocation("");
  };

  const clearData = () => {
    setName("");
    setPhoto(null);
    setLocation("");
  };

  const handleSubmit = async () => {
    if (name.trim() === "" || locationText.trim() === "") {
      Alert.alert("Заполните все поля");
      return;
    }
    hideKeyboard();
    clearData();
    cleanForm();

    await navigation.navigate("DefaultScreen", { location, name, photo });
  };

  const uploadImageToStoradge = async () => {
    setUploading(true);

    const uniquePostId = Date.now().toString();

    const response = await fetch(photo);
    const blob = await response.blob();
    var ref = firebase.storage().ref(`postImage/${uniquePostId}`).put(blob);

    try {
      await ref;
    } catch (error) {
      console.log(error);
    }

    const processedPhoto = await firebase
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();

    console.log("processedPhoto", processedPhoto);
    setPhoto(processedPhoto);
    setUploading(false);
    alert("image uploaded");
  };

  const switchShowCamera = () => {
    setActiveCamera(!activeCamera);
  };

  const getPhoto = (uri) => {
    setPhoto(uri);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = result.uri;
    console.log("source:", result);
    setPhoto(source);
  };

  return activeCamera ? (
    <CameraScreen onClose={switchShowCamera} onSnap={getPhoto} />
  ) : (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.arrowBackIconWrapper}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Post")}
          >
            <Ionicons
              name="ios-arrow-back-sharp"
              size={32}
              color="rgba(33, 33, 33, 0.6)"
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Создать публикацию</Text>
        </View>

        {!photo ? (
          <View
            style={{
              ...styles.addImage,
              paddingVertical: isShowKeyboard ? 45 : 70,
            }}
          >
            <TouchableOpacity
              onPress={switchShowCamera}
              // onPress={pickImage}
              style={styles.photoIcon}
            >
              <Ionicons name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        ) : (
          <ImageBackground
            style={{
              ...styles.loadedImage,
              paddingVertical: isShowKeyboard ? 45 : 70,
              overflow: "hidden",
            }}
            source={{
              uri: photo,
            }}
          >
            <TouchableOpacity
              onPress={switchShowCamera}
              // onPress={pickImage}
              style={{
                ...styles.photoIcon,
                opacity: !photo ? 1 : 0.5,
              }}
            >
              <Ionicons name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </ImageBackground>
        )}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            onPress={pickImage}
            style={{ ...styles.addText, marginBottom: 48 }}
          >
            Загрузить фото из галереи
          </Text>

          <Text
            onPress={uploadImageToStoradge}
            style={{ ...styles.addText, marginBottom: 48 }}
          >
            Редактировать
          </Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={{ ...styles.inputContainer, marginBottom: 32 }}>
            <TextInput
              style={styles.inputText}
              placeholder="Название..."
              placeholderTextColor="#BDBDBD"
              value={name}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={handleNameChange}
            ></TextInput>
          </View>
          <View style={{ ...styles.inputContainer, marginBottom: 32 }}>
            <Ionicons
              style={styles.locationIcon}
              name="location-outline"
              size={24}
              color="#BDBDBD"
            />
            <TextInput
              style={{ ...styles.inputText, paddingLeft: 25 }}
              placeholder="Местность..."
              placeholderTextColor="#BDBDBD"
              value={locationText}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={handleLocationChange}
            ></TextInput>
          </View>
        </KeyboardAvoidingView>

        <TouchableOpacity
          style={{
            ...styles.btn,
            backgroundColor: condition ? "#FF6C00" : "#F6F6F6",
          }}
          activeOpacity={0.8}
          onPress={handleSubmit}
        >
          <Text
            style={{
              ...styles.btnText,
              color: condition ? "#FFF" : "#BDBDBD",
            }}
          >
            Опубликовать
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.btn,
            backgroundColor: "#FAFAFA",
            alignItems: "center",
            marginHorizontal: 140,

            backgroundColor: condition ? "#FF6C00" : "#F6F6F6",
          }}
          activeOpacity={0.8}
          onPress={clearData}
        >
          <Ionicons name="trash-bin-outline" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

// const handlePostToServer = async () => {
//   const post = await firebase
//     .firestore()
//     .collection("posts")
//     .add({ photo, name, location: location.coords });
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    position: "relative",
    paddingTop: 35,
    paddingBottom: 11,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  arrowBackIconWrapper: {
    position: "absolute",
    bottom: 4,
    left: 10,
    paddingTop: 5,
    paddingHorizontal: 5,
    zIndex: 999,
  },
  headerText: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  addImage: {
    objectFit: "containe",
    backgroundColor: "#F6F6F6",
    boderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginTop: 32,
    marginHorizontal: 16,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 240,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginHorizontal: 16,
  },
  addText: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginHorizontal: 16,
  },
  inputText: {
    position: "relative",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    paddingBottom: 13,
  },
  btn: {
    marginBottom: 160,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginHorizontal: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  btnText: {
    textAlign: "center",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  photoIcon: {
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 100,
    zIndex: 999,
  },
  locationIcon: {
    position: "absolute",
    bottom: 10,
    left: 0,
  },
  text: {
    color: "#FFF",
  },
  loadedImage: {
    paddingVertical: 90,
    backgroundColor: "#F6F6F6",
    boderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginTop: 32,
    marginHorizontal: 16,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 240,
  },
});

export default CreateScreen;
