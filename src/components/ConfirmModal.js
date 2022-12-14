import React from 'react';
import {
  View,
  Pressable,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

const ConfirmModal = ({
  setShowModal = () => {},
  handleDocument = () => {}
}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <Pressable style={styles.modalView} onPress={() => setShowModal(false)}>
      <View style={styles.dialogView}>
        <View style={styles.descView}>
          <Text style={styles.descTxt}>Have you informed your Manning Agency that this document is ready?</Text>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={[styles.ynBtn, { borderRightColor: '#D6D6D6', borderRightWidth: 1 }]} onPress={() => setShowModal(false)}>
            <Text style={styles.ynTxt}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ynBtn} onPress={() => {handleDocument(); setShowModal(false)}}>
            <Text style={styles.ynTxt}>Yes</Text>
          </TouchableOpacity>
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
    backgroundColor: "#002646",
    zIndex: 200,
    opacity: 0.9,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 56
  },
  dialogView: {
    backgroundColor: "white",
    borderRadius: 6
  },
  descView: {
    paddingHorizontal: 43,
    paddingTop: 43,
    paddingBottom: 36,
    borderBottomColor: '#D6D6D6',
    borderBottomWidth: 0.5
  },
  descTxt: {
    fontSize: 14,
    lineHeight: 16,
    color: "black",
    fontFamily: "Roboto-Bold",
    fontWeight: "bold",
    textAlign: "center"
  },
  btnView: {
    flexDirection: "row"
  },
  ynBtn: {
    width: "50%",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  ynTxt: {
    color: "#588BDD",
    fontSize: 12,
    lineHeight: 16
  }
});

export default ConfirmModal;