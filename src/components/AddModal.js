import React, { useState } from 'react';
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
  Pressable,
  Dimensions,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import AntIcon from 'react-native-vector-icons/AntDesign';

const AddModal = ({
  setShowModal = () => {},
  onClickDone = () => {}
}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [title, SetTitle] = useState('');

  return (
    <Pressable style={ styles.modalView } onPress={() => setShowModal(false)}>
      <View style={{
        paddingTop: 16,
        paddingHorizontal: 16
      }}>
        <View style={styles.topBar}>
          <Pressable onPress={() => setShowModal(false)}>
            <View style={styles.backView}>
              <Icon name='chevron-left' size={25} color={"#000000"} />
            </View>
          </Pressable>
          { title.length > 0 ?
            <TouchableOpacity style={styles.doneBtn} onPress={() => onClickDone(title)}>
              <Text style={styles.doneTxt}>Done</Text>
            </TouchableOpacity>
            : <View></View>
          }
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={SetTitle}
            value={title}
            placeholder={"Insert list's title"}
          />
          { title.length > 0 &&
            <TouchableOpacity onPress={() => SetTitle('')}>
              <AntIcon name='close' size={20} color={"#000000"} />
            </TouchableOpacity>
          }
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  modalView: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: '#002646',
    zIndex: 200,
    opacity: 0.9
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  doneBtn: {
    width: 88,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#0093BB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  backView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    width: "100%",
    borderRadius: 7,
    marginTop: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  inputStyle: {
    borderRadius: 7,
    paddingVertical: 30,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "black"
  },
  doneTxt: {
    fontSize: 14,
    lineHeight: 19,
    color: "white",
    fontFamily: "Roboto-Bold"
  }
});

export default AddModal;