import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  useColorScheme,
  ScrollView,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

const SaveListScreen = ({
  route,
  navigation
}) => {
  const title = route.params.title;
  const isDarkMode = useColorScheme() === 'dark';
  const [checkList, setCheckList] = useState(['']);

  const onEnterPress = () => {
    setCheckList([...checkList, '']);
  }

  const onChangeIndText = (ind, val) => {
    let tchecklist = checkList;
    tchecklist[ind] = val;
    setCheckList([...tchecklist]);
  }

  return (
    <SafeAreaView style={{ position: 'relative', height: '100%', backgroundColor: '#ECEEF0'}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={"#eceef0"}
      />
      <View style={styles.titleBar}>
        <TouchableOpacity style={{
            flexDirection: "row",
            alignItems: "center"
          }}
          onPress={() => navigation.navigate("Main")}
        >
          <Icon name="chevron-left" color={'#000'} size={28} />
          <Text style={styles.pageTitle}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveTxt}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.titleTxt}>{ title }</Text>
      </View>
      <ScrollView style={{ width: "100%" }}>
        {
          checkList.length > 0 && checkList.map((item, index) => {
            return (
              <View style={styles.itemView} key={index}>
                <View style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "#005AA5",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 18
                }}>
                  <IonIcon name="document-text" color="#ffffff" size={10} />
                </View>
                <TextInput style={{
                    padding: 0,
                    fontSize: 16,
                    lineHeight: 24,
                    color: "black",
                    fontFamily: "Roboto-Regular"
                  }}
                  autoFocus={true}
                  value={item}
                  onChangeText={(e) => onChangeIndText(index, e)}
                  onSubmitEditing={() => onEnterPress(index)}
                />
              </View>
            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: '#eceef0',
    justifyContent: "space-between"
  },
  pageTitle: {
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: 'black',
  },
  saveBtn: {
    width: 88,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#0093BB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  saveTxt: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "Roboto-Bold",
    color: "white"
  },
  titleView: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCDCF",
    paddingLeft: 16,
    paddingBottom: 22
  },
  titleTxt: {
    fontSize: 18,
    lineHeight: 24,
    color: "black",
    fontFamily: "Roboto-Bold",
  },
  itemView: {
    paddingVertical: 22,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCDCF"
  }
});

export default SaveListScreen;