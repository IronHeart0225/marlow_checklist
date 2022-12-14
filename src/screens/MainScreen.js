import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Pressable,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { faker } from '@faker-js/faker';
import PreDepartureChecklist from '../components/PreDepartureChecklist';
import PersonalCheckList from '../components/PersonalChecklist';
import { getPreDepartureChecklist } from '../store/actions/documentActions';
import { getPercentage } from '../utils/percentage';
import AddModal from '../components/AddModal';

const MainScreen = (props) => {
  const { navigation, getPreDepartureChecklist, documents, myChecklist } = props;
  const isDarkMode = useColorScheme() === 'dark';
  const [percentage, setPercentage] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getPreDepartureChecklist();
  }, []);

  useEffect(() => {
    if (documents.document?.items?.length > 0) {
      const { document } = documents;
      setPercentage(getPercentage(document.percentage, document.total));
    }
  }, [documents]);

  const addPersonalChecklist = (title) => {
    setOpenModal(false);
    navigation.navigate('MyChecklistEdit', {
      id: faker.datatype.uuid(),
      title,
    });
  }

  const editPersonalChecklist = (id, title) => {
    navigation.navigate('MyChecklistView', { id, title });
  }

  return (
    <SafeAreaView style={{ position: 'relative', height: '100%' }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={"#eceef0"}
      />
      <View style={styles.titleBar}>
        <Icon name="chevron-left" color={'#000'} size={28} style={styles.pageBack} />
        <Text style={styles.pageTitle}>Checklists</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => setOpenModal(true)}>
        <Image
          source={require('../assets/images/add_icon.png')}
        />
      </TouchableOpacity>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: "#eceef0" }}
      >
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Pre-Departure Douments List</Text>
          <Text style={styles.sectionDescription}>List of all required documents for your upcoming assignment</Text>
          <View style={{ marginTop: 12 }}>
            <Pressable onPress={() => navigation.navigate('PreDeparture')}>
              <PreDepartureChecklist percent={percentage} />
            </Pressable>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My Checklist</Text>
          <Text style={styles.sectionDescription}>Create your own personal checklist</Text>
          <View style={styles.sectionContent}>
            {myChecklist.length > 0 && myChecklist.map(item => (
              <View
                key={item.id}
              >
                <PersonalCheckList
                  id={item.id}
                  title={item.title}
                  date={item.created}
                  lastItem={item.items ? item.items[item.items.length - 1].title : ''}
                  onEditPersonalChecklist={() => editPersonalChecklist(item.id, item.title)}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      {openModal && (
        <AddModal
          setShowModal={setOpenModal}
          onClickDone={(val) => addPersonalChecklist(val)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 6,
    paddingVertical: 16,
    backgroundColor: '#eceef0',
  },
  pageBack: {
    position: 'absolute',
    left: 6,
    top: 14,
    zIndex: 10,
  },
  pageTitle: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: 'black',
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 4,
    fontFamily: 'Roboto-Regular',
    fontStyle: 'italic',
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
  },
  sectionContent: {
    flexDirection: 'column',
    marginTop: 4,
  },
  addButton: {
    position: 'absolute',
    // resizeMode: 'stretch',
    // width: 56,
    // height: 56,
    right: 16,
    bottom: 28,
    zIndex: 100,
  },
});

const mapStateToProps = (state) => ({
  documents: state.documents,
  myChecklist: state.myChecklist,
});
const mapDispatchToProps = {
  getPreDepartureChecklist,
}
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
