import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
} from "react-native";
import { authSignOutUser } from "../../redux/auth/authActions";
import firebase from "../../firebase/config";

const DefaultScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  // const [allComments, setAllComments] = useState([]);

  // const getAllComments = async () => {
  //   if (posts !== []) {
  //     for (let i = 0; i < posts.length; i += 1) {
  //       // console.log("allComments", posts[i].id);
  //       firebase
  //         .firestore()
  //         .collection("Posts")
  //         .doc(posts[i].id)
  //         .collection("Comments")
  //         .onSnapshot((data) => {
  //           console.log("data", data.docs.length);
  //           setAllComments(data.docs.length);
  //         });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getAllComments();
  // }, []);

  const getAllPosts = async () => {
    await firebase
      .firestore()
      .collection("Posts")
      .onSnapshot((data) => {
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Публикации</Text>
        <TouchableOpacity
          style={styles.arrowBackIconWrapper}
          activeOpacity={0.8}
          onPress={signOut}
        >
          <Ionicons name="log-out-outline" size={32} color="#BDBDBD" />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.postsGallery}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.galleryItem}>
            <View style={styles.userContainer}>
              <Image
                style={styles.avatar}
                source={{
                  uri: item.userPhoto,
                }}
              />

              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.userName}</Text>
              </View>
            </View>

            <Image
              source={{
                uri: item.photo,
              }}
              style={styles.galleryItemImage}
            />

            <Text style={styles.galleryItemNickname}>{item.name}</Text>
            <View style={styles.postDetails}>
              <View style={styles.commentsWrapper}>
                <Ionicons
                  onPress={() =>
                    navigation.navigate("Comments", {
                      postId: item.id,
                      image: item.photo,
                    })
                  }
                  name="chatbubble-outline"
                  size={24}
                  color="black"
                />
                <Text style={styles.commentsText}>0</Text>
              </View>

              <View style={styles.locationWrapper}>
                <Ionicons
                  onPress={() => navigation.navigate("Map", { geo: item.geo })}
                  style={styles.locationIcon}
                  name="location-outline"
                  size={24}
                  color="#BDBDBD"
                />
                <Text style={styles.locationText}>{item.location}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

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
  headerText: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: "#212121",
  },
  arrowBackIconWrapper: {
    position: "absolute",
    bottom: 4,
    right: 10,
    paddingTop: 5,
    paddingHorizontal: 5,
    zIndex: 999,
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
  galleryItemDescription: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  galleryItemNickname: {
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
    marginRight: 80,
  },
  galleryItemEmail: {
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  user: {
    paddingHorizontal: 16,
  },
  userItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: "black",
  },
  userName: {
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postDetails: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentsWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  commentsText: {
    marginRight: 49,
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 6,
  },
  locationWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    marginLeft: 4,
  },
  userPgotoProf: {
    width: 40,
    height: 40,
  },
  userContainer: {
    display: "flex",
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

export default DefaultScreen;
