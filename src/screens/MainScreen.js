import React, { useEffect } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PreDepartureChecklist from '../components/PreDepartureChecklist';
import PersonalCheckList from '../components/PersonalChecklist';
import { getDocumentList } from '../services/checklist-service';
import DATA from '../config/mockdata.json';

const MainScreen = (props) => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    loadPreDepartureCheckList();
  }, []);

  const loadPreDepartureCheckList = async () => {
    try {
      const res = await getDocumentList();
      console.log(res);
    } catch (error) {

    }
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
      <Image
        source={require('../assets/images/add_icon.png')}
        style={styles.addButton}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: "#eceef0" }}
      >
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Pre-Departure Douments List</Text>
          <Text style={styles.sectionDescription}>List of all required documents for your upcoming assignment</Text>
          <View style={{ marginTop: 12 }}>
            <Pressable onPress={() => props.navigation.navigate('PreDeparture')}>
              <PreDepartureChecklist percent={60} />
            </Pressable>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My Checklist</Text>
          <Text style={styles.sectionDescription}>Create your own personal checklist</Text>
          <View style={styles.sectionContent}>
            {DATA?.personalCheckList && DATA.personalCheckList.map((item, idx) => (
              <PersonalCheckList
                key={`personal-${idx}`}
                title={item.title}
                date={item.date}
                lastItem={item.lastItem}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#eceef0',
  },
  pageBack: {
    position: 'absolute',
    left: 16,
    top: 14,
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

export default MainScreen;
