import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { deletePersonalChecklist } from '../store/actions/myChecklistActions';

const PersonalCheckList = (props) => {
  const { id, title, date, lastItem, deletePersonalChecklist, onEditPersonalChecklist } = props;

  const handleDelete = () => {
    deletePersonalChecklist({ id });
  }

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ marginTop: 8 }}>
      <View style={[styles.checkListContainer, { width: Dimensions.get('window').width - 32 }]}>
        <View style={styles.align}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.description, {
            marginTop: 4,
          }]}>Date created: {date}</Text>
          <Text style={[styles.description, {
            marginTop: 1,
          }]}>Last item added: {lastItem}</Text>
        </View>
        <TouchableOpacity onPress={() => onEditPersonalChecklist()}>
        <FeatherIcon name="chevron-right" color={'#aaaaaa'} size={20} style={{ marginLeft: 20, marginVertical: 20 }} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.swipeButton} onPress={handleDelete}>
        <MaterialIcon name="delete" color="#fff" size={24} />
      </TouchableOpacity>
    </ScrollView>
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
  swipeButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: "#E6767F",
  },
  swipeText: {
    fontFamily: "Roboto-Regular",
    color: "white",
    fontSize: 12,
    lineHeight: 21
  },
});

const mapDispatchToProps = {
  deletePersonalChecklist,
}
export default connect(null, mapDispatchToProps)(PersonalCheckList);