import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const PreDepartureTab = (props) => {
  const { isAlert = false, title = '', isSelected = false } = props;

  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: 5,
      borderBottomWidth: isSelected ? 2 : 0,
      borderBottomColor: "#005AA5"
    }}>
      {isAlert && <Icon style={{ marginRight: 4 }} name='alert-circle' color={"#CB3C47"} size={12} />}
      <Text style={ isSelected ? styles.titleStyle : styles.unvisibleTitle}>{ title }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'Roboto-Bold',
    color: "#005AA5"
  },
  unvisibleTitle: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'Roboto-Bold',
    color: "#8FAABF"
  }
});

export default PreDepartureTab;
