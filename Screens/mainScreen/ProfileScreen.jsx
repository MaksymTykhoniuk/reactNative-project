import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../firebase/config";
import { useEffect, useState } from "react";
import { authSignOutUser } from "../../redux/auth/authActions";
import { Ionicons } from "@expo/vector-icons";

const backgroundImage = require("../../images/photoBG.jpg");

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userId, userName, userPhoto } = useSelector((state) => state.auth);
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
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.image}>
        <View style={styles.form}>
          <View
            style={[
              styles.box,
              {
                transform: [{ translateX: -23 }],
              },
            ]}
          >
            <ImageBackground
              style={[
                styles.boxPhoto,
                {
                  overflow: "hidden",
                },
              ]}
              source={{
                uri: userPhoto,
              }}
            />
          </View>
          <Text style={styles.userProfileName}>{userName}</Text>
          <TouchableOpacity
            style={styles.logoutIcon}
            activeOpacity={0.8}
            onPress={signOut}
          >
            <Ionicons
              name="log-out-outline"
              size={24}
              color="rgba(189, 189, 189, 1)"
            />
          </TouchableOpacity>

          <FlatList
            style={styles.posts}
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.gallery}>
                <View style={styles.galleryPost}>
                  <Image
                    source={{ uri: item.photo }}
                    style={styles.postImage}
                  />

                  <Text style={styles.postName}>{item.name}</Text>

                  <View style={styles.postInfo}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.commentWrapper}
                      onPress={() =>
                        navigation.navigate("Comments", {
                          postId: item.id,
                          image: item.photo,
                        })
                      }
                    >
                      <Ionicons
                        name="chatbubble-outline"
                        size={24}
                        color="#FF6C00"
                        style={styles.commentIcon}
                      />

                      <Text style={styles.commentText}>13</Text>

                      <Ionicons
                        name="thumbs-up-outline"
                        size={24}
                        color="#FF6C00"
                      />

                      <Text style={styles.likeText}>200</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.locationWrapper}
                      onPress={() =>
                        navigation.navigate("Map", {
                          geo: item.geo,
                        })
                      }
                    >
                      <Ionicons
                        name="location-outline"
                        size={24}
                        color="#BDBDBD"
                        style={styles.locationIcon}
                      />

                      <Text style={styles.locationText}>{item.location}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
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
    flex: 1,
    backgroundColor: "#FFFFFF",
    width: "100%",

    marginTop: 100,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "relative",
  },
  boxPhoto: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  box: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  userProfileName: {
    marginTop: 92,
    textAlign: "center",
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  logoutIcon: {
    position: "absolute",
    paddingHorizontal: 16,
    top: 22,
    right: 0,
  },
  postsContainer: {
    backgroundColor: "#fff",
    marginTop: 32,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  userProfileName: {
    marginTop: 92,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
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
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  gallery: {
    marginHorizontal: 16,
  },
  galleryPost: {
    marginTop: 32,
  },
  postImage: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  postName: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },
  postInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  commentWrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationWrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  commentText: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    marginRight: 24,
  },
  locationText: {
    color: "#212121",
    textDecorationLine: "underline",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  logoutIcon: {
    position: "absolute",
    paddingHorizontal: 16,
    top: 22,
    right: 0,
  },
  box: {
    position: "absolute",
    top: -60,
    left: "45%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  boxPhoto: {
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
  commentIcon: {
    color: "#FF6C00",
  },
  likeText: {
    marginLeft: 6,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
});

export default ProfileScreen;
