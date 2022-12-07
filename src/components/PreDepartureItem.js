import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Animated,
  ScrollView,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';

const PreDepartureItem = (props) => {
  return (
    <ScrollView style={{ width: "100%", height: 88 }} showsHorizontalScrollIndicator={false} horizontal>
      <View style={[styles.itemContainer, { width: Dimensions.get('window').width - 32 }]}>
        <View style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: "#005AA5",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 17
        }}>
          <Icon name="document-text" color={"#ffffff"} size={10} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.infoView}>
            <View>
              <Text style={styles.titleText}>GMDSS GOC</Text>
              <Text style={styles.titleText}>RUS, 6533/5563</Text>
            </View>
            <Text style={styles.descText}>(Optional)</Text>
          </View>
          <View style={[styles.infoView, { marginTop: 7 }]}>
            <Text style={styles.descText}>Issue date: N/A</Text>
            <Text style={styles.descText}>Exp. date: N/A</Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 16 }}>
        <View style={{ width: 80, height: 88, backgroundColor: "#4F9B90", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <AntIcon name="checkcircleo" color={"#ffffff"} size={24} />
          <Text style={styles.doneText}>Done</Text>
        </View>
        <View style={{ width: 80, height: 88, backgroundColor: "#002646", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <AntIcon name="minuscircleo" color={"#ffffff"} size={24} />
          <Text style={styles.doneText}>Skip</Text>
        </View>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 88,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#C7CBCE",
    borderBottomWidth: 1,
    borderStyle: "solid"
  },
  infoView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: "black"
  },
  descText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: "#707070"
  },
  doneText: {
    fontFamily: "Roboto-Regular",
    color: "white",
    fontSize: 12,
    lineHeight: 21
  }
});

export default PreDepartureItem;