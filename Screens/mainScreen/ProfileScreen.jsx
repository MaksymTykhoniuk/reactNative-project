import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../firebase/config";
import { useEffect, useState } from "react";

const ProfileScreen = () => {
  const { userId } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await firebase
      .firestore()
      .collection("Posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.postsGallery}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.galleryItem}>
            <View style={styles.userContainer}>
              <View style={styles.userInfo}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: item.userPhoto,
                  }}
                />

                <View>
                  <Text style={styles.userName}>{item.userName}</Text>
                </View>
              </View>
            </View>
            <Image
              source={{
                uri: item.photo,
              }}
              style={styles.galleryItemImage}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postsGallery: {
    paddingHorizontal: 16,
    paddingVertical: 22,
  },
  galleryItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  galleryItemImage: {
    width: 360,
    height: 200,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  userContainer: {
    display: "flex",
    marginTop: 32,
    marginHorizontal: 16,
    flexDirection: "row",
  },
  avatar: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 16,
    marginRight: 8,
  },
  userInfo: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
});

export default ProfileScreen;
