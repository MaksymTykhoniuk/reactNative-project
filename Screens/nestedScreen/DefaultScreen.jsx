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

  const getAllPosts = async () => {
    await firebase
      .firestore()
      .collection("Posts")
      .orderBy("date", "desc")
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
          <View style={styles.gallery}>
            <View style={styles.userContainer}>
              <Image source={{ uri: item.userPhoto }} style={styles.avatar} />

              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.userName}</Text>

                <Text style={styles.userEmail}>{item.userName}@mail.com</Text>
              </View>
            </View>

            <View style={styles.galleryPost}>
              <Image source={{ uri: item.photo }} style={styles.postImage} />

              <Text style={styles.postName}>{item.name}</Text>

              <View style={styles.postInfo}>
                <TouchableOpacity
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
                    color="#BDBDBD"
                    style={styles.commentIcon}
                  />

                  <Text style={styles.commentText}>
                    {Math.ceil(Math.random() * 2.5)}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
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
    fontFamily: "Roboto-Medium",
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
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  locationText: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
    fontSize: 16,
    lineHeight: 19,
  },
  userContainer: {
    display: "flex",
    marginTop: 32,
    // marginHorizontal: 16,
    flexDirection: "row",
  },
  avatar: {
    marginLeft: 0,
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
    fontFamily: "Roboto-Bold",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});

export default DefaultScreen;
