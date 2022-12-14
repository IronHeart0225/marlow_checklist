import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { updatePersonalChecklist } from '../store/actions/myChecklistActions';

const MyChecklistEditScreen = (props) => {
  const { route, navigation, myChecklist, updatePersonalChecklist } = props;
  const { id, title } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const [checklist, setChecklist] = useState([{ title: '', done: false }]);
  const [completeList, setCompleteList] = useState([]);

  useEffect(() => {
    if (myChecklist.length > 0) {
      const personal = myChecklist.find(p => p.id === id);
      if (personal) {
        setCompleteList(personal.items.filter(item => item.done));
        setChecklist([...personal.items.filter(item => !item.done), { title: '', done: false }]);
      }
    }
  }, [myChecklist]);

  const onChangeText = (index, value) => {
    const newChecklist = checklist.map((item, idx) => (
      idx === index ? { ...item, title: value } : item
    ));
    setChecklist(newChecklist);
  }

  const onEnterText = () => {
    const newChecklist = checklist.filter(item => !!item.title);
    setChecklist([...newChecklist, { title: '', done: false }]);
  }

  const handleSave = () => {
    const newChecklist = checklist.filter(item => !!item.title);
    const personal = {
      id,
      title,
      items: [...completeList, ...newChecklist],
    };
    updatePersonalChecklist(personal);
    navigation.navigate('Main');
  }

  const renderItem = (item, index) => (
    <View key={`personal-${index}`} style={styles.itemView}>
      <View style={styles.docIcon}>
        <IonIcon name="document-text" color="#ffffff" size={10} />
      </View>
      <TextInput
        autoFocus={true}
        value={item.title}
        style={styles.itemInput}
        onChangeText={(e) => onChangeText(index, e)}
        onSubmitEditing={onEnterText}
      />
    </View>
  )

  return (
    <SafeAreaView style={{ position: 'relative', height: '100%', backgroundColor: '#ECEEF0' }}>
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
          <FeatherIcon name="chevron-left" color={'#000'} size={28} />
          <Text style={styles.pageTitle}>{"Cancel"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.titleTxt}>{title}</Text>
      </View>
      <ScrollView style={{ width: "100%" }}>
        {checklist.length > 0 && checklist.map((item, index) => (
          renderItem(item, index)
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

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
  saveText: {
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
    borderBottomColor: "#CCCDCF",
  },
  docIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#005AA5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },
  itemInput: {
    padding: 0,
    fontSize: 16,
    lineHeight: 24,
    color: "black",
    fontFamily: "Roboto-Regular",
  },
});

const mapStateToProps = (state) => ({
  myChecklist: state.myChecklist,
});
const mapDispatchToProps = {
  updatePersonalChecklist,
}
export default connect(mapStateToProps, mapDispatchToProps)(MyChecklistEditScreen);
