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
  FlatList,
} from "react-native";
import firebase from "../../firebase/config";

const CommentsScreen = ({ route }) => {
  const id = route.params.postId;
  const { userName } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    getAllPosts();
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

  const getAllPosts = async () => {
    firebase
      .firestore()
      .collection("Posts")
      .doc(id)
      .collection("Comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
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
          <Text style={styles.sendLabel}>add comment</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: "#20b2aa",
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: "#20b2aa",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendLabel: {
    color: "#20b2aa",
    fontSize: 20,
  },
  inputContainer: {
    marginHorizontal: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#20b2aa",
  },
});

export default CommentsScreen;
