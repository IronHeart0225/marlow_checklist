import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import PreDepartureChecklist from '../components/PreDepartureChecklist';
import PersonalCheckList from '../components/PersonalChecklist';
import DATA from '../config/mockdata.json';

const MainScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={"#eceef0"}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: "#eceef0" }}
      >
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Pre-Departure Douments List</Text>
          <Text style={styles.sectionDescription}>List of all required documents for your upcoming assignment</Text>
          <View style={{ marginTop: 12 }}>
            <PreDepartureChecklist percent={60} />
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
  }
});

export default MainScreen;
