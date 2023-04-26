import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import firebase from "../../firebase/config";
import { AntDesign } from "@expo/vector-icons";

const CommentsScreen = ({ route, navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const id = route.params.postId;
  const image = route.params.image;
  const { userName } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const date = new Date().toLocaleString();

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

  useEffect(() => {
    getAllComments();
  }, []);

  const createComment = async () => {
    await firebase
      .firestore()
      .collection("Posts")
      .doc(id)
      .collection("Comments")
      .add({ comment, userName, date });
  };

  const handleComment = (value) => setComment(value);
  const handleSubmit = () => {
    createComment();
    setComment("");
  };

  const getAllComments = async () => {
    firebase
      .firestore()
      .collection("Posts")
      .doc(id)
      .collection("Comments")
      .onSnapshot((data) => {
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
  };
  const flatListRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.galleryItem}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.galleryItemImage}
        />
      </View>

      <FlatList
        ref={flatListRef}
        data={allComments}
        style={styles.commentContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Image source={{ uri: item.userPhoto }} style={styles.userPhoto} />

            <View style={styles.commentTextWrapper}>
              <Text style={styles.commentText}>{item.comment}</Text>

              <Text style={styles.commentData}>{item.date}</Text>
            </View>
          </View>
        )}
      />
      <KeyboardAvoidingView
        style={styles.inputContainer}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TextInput
          value={comment}
          onChangeText={handleComment}
          style={{
            ...styles.input,
          }}
          placeholder="Комментировать..."
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.sendBtn}>
          <AntDesign
            style={styles.sendIcon}
            name="arrowup"
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    position: "relative",
    paddingTop: 55,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  headerText: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  arrowleftIcon: {
    position: "absolute",
    paddingHorizontal: 16,
    top: 54,
  },
  // comments gallery
  galleryItem: {
    marginHorizontal: 16,
    marginVertical: 32,
  },
  galleryItemImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  userPhoto: {
    width: 32,
    height: 32,
    borderRadius: 50,
  },
  commentContainer: {
    display: "flex",
    gap: 24,
    marginHorizontal: 16,
    marginBottom: 31,
  },
  comment: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  commentTextWrapper: {
    width: "100%",
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  commentData: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  // form
  inputContainer: {
    position: "relative",
    marginHorizontal: 16,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingVertical: 16,
    paddingLeft: 16,
    marginBottom: 16,
  },
  sendBtn: {
    position: "absolute",
    top: 9,
    right: 9,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    width: 34,
    height: 34,
  },
  // container: {
  //   flex: 1,
  // },
  // commentContainer: {
  //   borderWidth: 1,
  //   borderColor: "#20b2aa",
  //   marginHorizontal: 10,
  //   padding: 10,
  //   marginBottom: 10,
  // },
  // sendBtn: {
  //   position: "relative",
  //   bottom: 0,
  //   left: 0,
  //   height: 40,
  //   width: 40,
  //   borderRadius: 100,
  //   marginTop: 20,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#FF6C00",
  // },
  // sendLabel: {
  //   color: "#FFF",
  // },
  // inputContainer: {
  //   flex: 1,
  //   position: "absolute",
  //   marginHorizontal: 10,
  // },
  // input: {
  //   height: 50,
  //   width: "100%",
  //   borderWidth: 1,
  //   borderColor: "green",
  //   borderBottomColor: "#20b2aa",
  //   borderRadius: 30,
  // },
  // galleryItemImage: {
  //   width: 360,
  //   height: 200,
  //   marginHorizontal: 16,
  //   borderRadius: 12,
  //   marginBottom: 8,
  // },
  // galleryItem: {
  //   display: "flex",
  //   alignItems: "center",
  //   marginBottom: 32,
  //   marginTop: 32,
  // },
});

export default CommentsScreen;
