import { FlatList } from "react-native";
import UserItem from "./UserItem";

function renderUsersItem(itemData) {
  return <UserItem {...itemData.item} />;
}
function UserItemList({ users }) {
  return (
    <FlatList
      data={users}
      renderItem={renderUsersItem}
      keyExtractor={(item) => item.id}
    />
  );
}
export default UserItemList;
