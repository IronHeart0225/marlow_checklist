import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const PersonalCheckList = (props) => {
  const { title, date, lastItem } = props;

  return (
    <View style={styles.checkListContainer}>
      <View style={styles.align}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.description, {
          marginTop: 4,
        }]}>Date created: {date}</Text>
        <Text style={[styles.description, {
          marginTop: 1,
        }]}>Last item added: {lastItem}</Text>
      </View>
      <Icon name="chevron-right" color={'#aaaaaa'} size={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  checkListContainer: {
    backgroundColor: 'white',
    boxShadow: '0px 1px 15px #000',
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  align: {
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: 'black',
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: '#aaaaaa',
  },
});

export default PersonalCheckList;
