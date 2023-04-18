import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
// import Add from "../assets/add.svg";
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
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignIn } from "../redux/auth/authActions";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardShown, setKeyboardShown] = useState(false);

  useEffect(() => {
    const showSection = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardShown(true);
    });
    const hideSection = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardShown(false);
    });

    return () => {
      showSection.remove();
      hideSection.remove();
    };
  }, []);

  const emailHandler = (value) => setEmail(value);
  const passwordHandler = (value) => setPassword(value);
  const handleSignUp = () => navigation.navigate("Registration");

  const handleSubmit = () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Заполните все поля");
      return;
    }
    // console.log({ email, password });
    dispatch(authSignIn({ email, password }));
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
            <Text style={styles.header}>Войти</Text>
            <TextInput
              value={email}
              onChangeText={emailHandler}
              onFocus={() => setKeyboardShown}
              placeholderTextColor="#BDBDBD"
              placeholder="Адрес электронной почты"
              style={{
                ...styles.input,
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              value={password}
              onChangeText={passwordHandler}
              onFocus={() => setKeyboardShown}
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
            <TouchableOpacity
              activeOpacity={0.7}
              title={"login"}
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={styles.text}>Войти</Text>
            </TouchableOpacity>
            <Text onPress={handleSignUp} style={styles.info}>
              Нет аккаунта? Зарегистрироваться
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
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 40,
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
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
    marginRight: 16,
    marginLeft: 16,
    marginTop: 16,
    height: 50,
    borderRadius: 10,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginRight: 16,
    marginLeft: 16,
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
    marginBottom: 110,
  },
  buttonWrapper: {
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
});

export default LoginScreen;
