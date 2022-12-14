import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

const CheckItem = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/check.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: '#002646',
    zIndex: 200,
    opacity: 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default CheckItem;