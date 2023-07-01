import { StyleSheet, View, Image, TextInput, FlatList } from "react-native";
import { Slogan } from "../../components/Ui/Title";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Styles";
import { CATEGORIES } from "../../data/dummy-data";
import CategoryGirdItem from "../../components/Menu/CategoryGirdItem";
import IconsButton from "../../components/Ui/IconsButton";

function HomeScreen() {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("MealsOverview", {
        categoryId: itemData.item.id,
        categoryTitle: itemData.item.title,
      });
    }
    return (
      <CategoryGirdItem
        title={itemData.item.title}
        image={itemData.item.image}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.slogan}>
          <Slogan
            titleLabel="Hi, Smart Things"
            contentLabel="Bắt đầu một ngày mới năng động"
          />
        </View>
        <IconsButton isImage />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.search}
          name="search"
          placeholder="Tìm kiếm"
          onChangeText={(newUser) => setuser(newUser)}
        />
        <Ionicons style={styles.searchIcon} name="search-sharp" size={30} />
      </View>
      <View style={styles.body}>
        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          numColumns={2}
        />
      </View>
    </View>
  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 70,
    paddingHorizontal: 20,
  },
  slogan: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },

  searchContainer: {
    marginVertical: 20,
  },
  search: {
    backgroundColor: "#F2F2F2",
    height: 52,
    paddingLeft: 50,
    fontSize: 20,
    borderRadius: 15,
  },
  searchIcon: {
    position: "absolute",
    left: 10,
    color: "gray",
    lineHeight: 50,
  },
  body: {
    height: 500,
  },
});
