import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const PostScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Публикации</Text>
        <TouchableOpacity
          style={styles.arrowBackIconWrapper}
          activeOpacity={0.8}
          onPress={() => alert("kekw")}
        >
          <Ionicons name="log-out-outline" size={32} color="#BDBDBD" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.postsGallery}>
        <View style={styles.galleryItem}>
          <ImageBackground
            // source={require("../../img/avatar.jpg")}
            style={styles.galleryItemImage}
          ></ImageBackground>

          <View style={styles.galleryItemDescription}>
            <Text style={styles.galleryItemNickname}>Natali Romanova</Text>
            <Text style={styles.galleryItemEmail}>e-mail@example.com</Text>
          </View>
        </View>

        <View style={styles.galleryItem}>
          <ImageBackground
            // source={require("../../img/avatar.jpg")}
            style={styles.galleryItemImage}
          ></ImageBackground>

          <View style={styles.galleryItemDescription}>
            <Text style={styles.galleryItemNickname}>Natali Romanova</Text>
            <Text style={styles.galleryItemEmail}>e-mail@example.com</Text>
          </View>
        </View>

        <View style={styles.galleryItem}>
          <ImageBackground
            // source={require("../../img/avatar.jpg")}
            style={styles.galleryItemImage}
          ></ImageBackground>

          <View style={styles.galleryItemDescription}>
            <Text style={styles.galleryItemNickname}>Natali Romanova</Text>
            <Text style={styles.galleryItemEmail}>e-mail@example.com</Text>
          </View>
        </View>

        <View style={styles.galleryItem}>
          <ImageBackground
            // source={require("../../img/avatar.jpg")}
            style={styles.galleryItemImage}
          ></ImageBackground>

          <View style={styles.galleryItemDescription}>
            <Text style={styles.galleryItemNickname}>Natali Romanova</Text>
            <Text style={styles.galleryItemEmail}>e-mail@example.com</Text>
          </View>
        </View>

        <View style={styles.galleryItem}>
          <ImageBackground
            // source={require("../../img/avatar.jpg")}
            style={styles.galleryItemImage}
          ></ImageBackground>

          <View style={styles.galleryItemDescription}>
            <Text style={styles.galleryItemNickname}>Natali Romanova</Text>
            <Text style={styles.galleryItemEmail}>e-mail@example.com</Text>
          </View>
        </View>

        <View style={styles.galleryItem}>
          <ImageBackground
            // source={require("../../img/avatar.jpg")}
            style={styles.galleryItemImage}
          ></ImageBackground>

          <View style={styles.galleryItemDescription}>
            <Text style={styles.galleryItemNickname}>Natali Romanova</Text>
            <Text style={styles.galleryItemEmail}>e-mail@example.com</Text>
          </View>
        </View>

        <View style={styles.galleryItem}>
          <ImageBackground
            // source={require("../../img/avatar.jpg")}
            style={styles.galleryItemImage}
          ></ImageBackground>

          <View style={styles.galleryItemDescription}>
            <Text style={styles.galleryItemNickname}>Natali Romanova</Text>
            <Text style={styles.galleryItemEmail}>e-mail@example.com</Text>
          </View>
        </View>
      </ScrollView>
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  galleryItemImage: {
    width: 60,
    height: 60,
    marginRight: 8,
    backgroundColor: "green",
    borderRadius: 10,
  },
  galleryItemDescription: {},
  galleryItemNickname: {
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  galleryItemEmail: {
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});

export default PostScreen;
