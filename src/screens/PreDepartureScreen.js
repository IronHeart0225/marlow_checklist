import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import SimpleGradientProgressbarView from "react-native-simple-gradient-progressbar-view";

import PreDepartureTap from '../components/PreDepartureTap';
import PreDepartureItem from '../components/PreDepartureItem';

const PreDepartureScreen = (props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentTap, setCurrentTap] = useState("STCW National");

  return (
    <SafeAreaView style={{ position: 'relative', height: '100%' }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={"#fff"}
      />
      <View style={{ width: "100%", backgroundColor: "#fff" }}>
        <View style={styles.titleBar}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon name="chevron-left" color={'#000'} size={28} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Pre-Departure Documents List</Text>
          <View></View>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 16, marginTop: 4 }}>
          <Text style={styles.completeTitle}>52% completed</Text>
          <View style={styles.barContainer}>
            <SimpleGradientProgressbarView
              style={styles.progressBar}
              fromColor='#0091BA'
              toColor='#85C9BF'
              progress={0.52}
              maskedCorners={[1, 0, 1, 0]}
              cornerRadius={5}
            />
          </View>
        </View>
        <View style={{ width: "100%", marginTop: 8, paddingVertical: 20, paddingLeft: 15 }}>
          <ScrollView style={{ width: "100%" }} horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={{ marginRight: 24 }} onPress={() => setCurrentTap("STCW National")}>
              <PreDepartureTap isAlert={true} title={"STCW National"} currentTap={currentTap} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 24 }} onPress={() => setCurrentTap("Flag State")}>
              <PreDepartureTap isAlert={true} title={"Flag State"} currentTap={currentTap} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 24 }} onPress={() => setCurrentTap("GDPR Documents")}>
              <PreDepartureTap isAlert={false} title={"GDPR Documents"} currentTap={currentTap} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 24 }} onPress={() => setCurrentTap("Training")}>
              <PreDepartureTap isAlert={false} title={"Training"} currentTap={currentTap} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 16 }} onPress={() => setCurrentTap("Technical")}>
              <PreDepartureTap isAlert={false} title={"Technical"} currentTap={currentTap} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      <ScrollView style={{ width: "100%", paddingHorizontal: 16, paddingTop: 18 }}>
        <Text style={ styles.descText }>
          Items should only be ticked off once the corresponding original paper document has been added to your Blue Pouch in preparation for departure.
        </Text>
        <View style={{ width: "100%",  paddingTop: 22}}>
          <Text style={styles.pendingText}>Pending</Text>
          <View>
            <PreDepartureItem />
          </View>
        </View>
        <View style={{ width: "100%",  paddingTop: 22}}>
          <Text style={styles.pendingText}>Completed</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: "space-between",
    paddingVertical: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 6
  },
  pageTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: 'black',
  },
  completeTitle: {
    width: "100%",
    textAlign: "right",
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: "black"
  },
  barContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#C7CBCE",
    borderRadius: 5,
    borderStyle: "dashed",
    marginTop: 4,
  },
  progressBar: {
    width: "100%",
    height: 8,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 4
  },
  descText: {
    fontSize: 12,
    lineHeight: 16,
    color: "black",
    fontStyle: "italic",
    marginLeft: 11,
    marginRight: 3
  },
  pendingText: {
    fontSize: 14,
    lineHeight: 19,
    color: "black",
    fontFamily: "Roboto-Bold",
    marginLeft: 7
  }
});

export default PreDepartureScreen;