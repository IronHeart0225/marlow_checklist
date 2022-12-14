import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { updatePersonalItem, deletePersonalItem } from '../store/actions/myChecklistActions';

const MyChecklistViewScreen = (props) => {
  const { route, navigation, myChecklist, updatePersonalItem, deletePersonalItem } = props;
  const { id, title } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const [checklist, setChecklist] = useState([{ title: '', done: false }]);
  const [completeList, setCompleteList] = useState([]);

  useEffect(() => {
    if (myChecklist.length > 0) {
      const personal = myChecklist.find(p => p.id === id);
      if (personal && personal.items) {
        let todos = [], dones = [];
        personal.items.forEach((item, index) => {
          if (item.done) {
            dones.push({ ...item, index });
          } else {
            todos.push({ ...item, index });
          }
        })
        setChecklist(todos);
        setCompleteList(dones);
      }
    }
  }, [myChecklist, id]);

  const handleEditList = () => {
    navigation.navigate('MyChecklistEdit', { id, title });
  }

  const handleDelete = (index) => {
    deletePersonalItem({
      id,
      index
    });
  }

  const handleDone = (index, done) => {
    updatePersonalItem({
      id,
      index,
      done,
    });
  }

  const renderItem = (item, idx) => (
    <ScrollView key={`item-${item.index}`} showsHorizontalScrollIndicator={false} horizontal>
      <View style={[styles.itemView, { borderTopWidth: idx === 0 ? 1 : 0, width: Dimensions.get('window').width }]}>
        <View style={styles.docIcon}>
          <IonIcon name="document-text" color="#ffffff" size={10} />
        </View>
        <Text style={styles.itemInput}>{item.title}</Text>
      </View>
      {item.done ? (
        <TouchableOpacity
          style={[styles.swipeButton, { backgroundColor: "#4F9B90" }]}
          onPress={() => handleDone(item.index, false)}
        >
          <FeatherIcon name="circle" color="#fff" size={24} />
          <Text style={styles.swipeText}>Uncheck</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            style={[styles.swipeButton, { backgroundColor: "#E6767F" }]}
            onPress={() => handleDelete(item.index)}
          >
            <MaterialIcon name="delete" color="#fff" size={24} />
            <Text style={styles.swipeText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.swipeButton, { backgroundColor: "#4F9B90" }]}
            onPress={() => handleDone(item.index, true)}
          >
            <FeatherIcon name="check-circle" color="#fff" size={24} />
            <Text style={styles.swipeText}>Done</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
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
          <Text style={styles.pageTitle}>{"Lists"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={handleEditList}
        >
          <Text style={styles.editText}>Edit List</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.titleTxt}>{title}</Text>
      </View>
      <ScrollView style={{ width: "100%" }}>
        {completeList.length > 0 && (
          <Text style={styles.subTitle}>To-do</Text>
        )}
        {checklist.length > 0 && checklist.map((item, idx) => (
          renderItem(item, idx)
        ))}
        {completeList.length > 0 && (
          <View style={{ marginTop: 32 }}>
            <Text style={styles.subTitle}>Completed tasks</Text>
            {completeList.map((item, idx) => (
              renderItem(item, idx)
            ))}
          </View>
        )}
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
  editBtn: {
    width: 88,
    height: 40,
    borderRadius: 20,
    borderColor: "#0093BB",
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  editText: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "Roboto-Bold",
    color: "#0093BB"
  },
  titleView: {
    width: "100%",
    marginLeft: 16,
    marginBottom: 18
  },
  titleTxt: {
    fontSize: 18,
    lineHeight: 24,
    color: "black",
    fontFamily: "Roboto-Bold",
  },
  subTitle: {
    fontSize: 14,
    lineHeight: 19,
    color: "black",
    fontFamily: "Roboto-Medium",
    marginLeft: 16,
    marginBottom: 12,
  },
  itemView: {
    paddingVertical: 22,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#CCCDCF",
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
  swipeButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 88,
  },
  swipeText: {
    fontFamily: "Roboto-Regular",
    color: "white",
    fontSize: 12,
    lineHeight: 21
  },
});

const mapStateToProps = (state) => ({
  myChecklist: state.myChecklist,
});
const mapDispatchToProps = {
  updatePersonalItem,
  deletePersonalItem,
}
export default connect(mapStateToProps, mapDispatchToProps)(MyChecklistViewScreen);
