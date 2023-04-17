import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { authSignUp } from "../redux/auth/authActions";
import { useDispatch } from "react-redux";

const RegistrationScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const loginHandler = (value) => setLogin(value);
  const emailHandler = (value) => setEmail(value);
  const passwordHandler = (value) => setPassword(value);
  const handleLogIn = () => navigation.navigate("Login");

  const handleAddProfileImg = () => {
    Alert.alert("ПОпавсь????");
  };

  const handleSubmit = () => {
    if (login.trim() === "" || email.trim() === "" || password.trim() === "") {
      Alert.alert("Заполните все поля");
      return;
    }
    // console.log({ login, email, password });
    dispatch(authSignUp({ login, email, password }));
    clearForm();
  };

  const clearForm = () => {
    setLogin("");
    setEmail("");
    setPassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../images/photoBG.jpg")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.form}
          >
            <View
              style={[
                styles.box,
                {
                  transform: [{ translateX: -35 }],
                },
              ]}
            >
              <View style={styles.iconContainer}>
                <Ionicons
                  name="ios-add-circle-outline"
                  size={36}
                  color="#FF6C00"
                  onPress={handleAddProfileImg}
                />
              </View>
            </View>
            <Text style={styles.header}>Регистрация</Text>
            <TextInput
              value={login}
              onChangeText={loginHandler}
              placeholderTextColor="#BDBDBD"
              placeholder="Логин"
              style={styles.input}
            />
            <TextInput
              value={email}
              onChangeText={emailHandler}
              placeholderTextColor="#BDBDBD"
              placeholder="Адрес электронной почты"
              style={styles.input}
              keyboardType="email-address"
            />
            <TextInput
              value={password}
              onChangeText={passwordHandler}
              placeholder="Пароль"
              placeholderTextColor="#BDBDBD"
              secureTextEntry={true}
              style={{
                ...styles.input,
                marginBottom: 30,
              }}
            />
          </KeyboardAvoidingView>

          <View style={styles.buttonWrapper}>
            <Pressable
              on
              title={"login"}
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.text}>Регистрация</Text>
            </Pressable>
            <Text onPress={handleLogIn} style={styles.info}>
              Уже есть аккаунт ? Войти
            </Text>
          </View>
          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  form: {
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    width: "100%",
    paddingTop: 60,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "relative",
  },
  header: {
    color: "#212121",
    fontWeight: 500,
    fontSize: 30,
    alignSelf: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
    marginTop: 16,
    height: 50,
    borderRadius: 10,
  },

  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginTop: 13,
  },
  text: {
    fontSize: 16,
    lineHeight: 18,
    color: "white",
  },
  info: {
    fontSize: 16,
    lineHeight: 18,
    color: "#1B4371",
    marginTop: 16,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 80,
  },

  box: {
    position: "absolute",
    top: -60,
    left: "48%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  iconContainer: {
    position: "absolute",
    bottom: 13,
    right: -19,
  },
  buttonWrapper: {
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    position: "relative",
  },
});

export default RegistrationScreen;
