import { FlatList } from "react-native";
import DevicessItem from "./DevicesItem";

function renderDevicesItem(itemData) {
  return <DevicessItem {...itemData.item} />;
}
function DevicessList({ devices }) {
  return (
    <FlatList
      data={devices}
      renderItem={renderDevicesItem}
      keyExtractor={(item) => item.id}
    />
  );
}
export default DevicessList;
