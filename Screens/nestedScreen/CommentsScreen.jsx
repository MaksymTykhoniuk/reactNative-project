import React from "react";
import { useState, useEffect } from "react";
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
  const id = route.params.postId;
  const image = route.params.image;
  const { userName } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    getAllComments();
  }, []);

  const createComment = async () => {
    await firebase
      .firestore()
      .collection("Posts")
      .doc(id)
      .collection("Comments")
      .add({ comment, userName });
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
        // console.log("data", data.docs.length);
        setCommentCount(data.docs.length);
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
  };

  // data?.["_delegate"]?.["_snapshot"].docChanges.length;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.galleryItem}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.galleryItemImage}
        />
      </View>

      <FlatList
        data={allComments}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text>{item.userName}</Text>
            <Text>{item.comment}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={comment}
          onChangeText={handleComment}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.sendBtn}>
          <AntDesign
            style={styles.sendLabel}
            name="arrowup"
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: "#20b2aa",
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
  },
  sendBtn: {
    position: "relative",
    bottom: 0,
    left: 0,
    height: 40,
    width: 40,
    borderRadius: 100,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
  },
  sendLabel: {
    color: "#FFF",
  },
  inputContainer: {
    flex: 1,
    position: "absolute",
    marginHorizontal: 10,
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "green",
    borderBottomColor: "#20b2aa",
    borderRadius: 30,
  },
  galleryItemImage: {
    width: 360,
    height: 200,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  galleryItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 32,
  },
});

export default CommentsScreen;
