import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import SimpleGradientProgressbarView from "react-native-simple-gradient-progressbar-view";
import PreDepartureTab from '../components/PreDepartureTab';
import PreDepartureItem from '../components/PreDepartureItem';
import * as TYPES from '../store/constants';
import { getPercentage } from '../utils/percentage';

const PreDepartureScreen = (props) => {
  const { navigation, documents } = props;
  const isDarkMode = useColorScheme() === 'dark';
  const [currentTab, setCurrentTab] = useState("STCW National");
  const [percentage, setPercentage] = useState(0);
  const [pendingItems, setPendingItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);

  useEffect(() => {
    if (documents.document?.items?.length > 0) {
      const { document } = documents;
      setPendingItems(
        document.items.filter(item => item.status === 'Pending')
          .sort((a, b) => a.documentInfo.categoryId - b.documentInfo.categoryId)
      );
      setCompletedItems(
        document.items.filter(item => item.status !== 'Pending')
          .sort((a, b) => a.documentInfo.categoryId - b.documentInfo.categoryId)
      );
      setPercentage(getPercentage(document.percentage, document.total));
    }
  }, [documents]);

  return (
    <SafeAreaView style={{ position: 'relative', height: '100%' }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={"#fff"}
      />
      <View style={{ width: "100%", backgroundColor: "#fff" }}>
        <View style={styles.titleBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.pageBack}>
            <Icon name="chevron-left" color={'#000'} size={28} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Pre-Departure Documents List</Text>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 16, marginTop: 4 }}>
          <Text style={styles.completeTitle}>{percentage}% completed</Text>
          <View style={styles.barContainer}>
            <SimpleGradientProgressbarView
              style={styles.progressBar}
              fromColor='#0091BA'
              toColor='#85C9BF'
              progress={percentage / 100}
              maskedCorners={[1, 0, 1, 0]}
              cornerRadius={5}
            />
          </View>
        </View>
        <View style={{ width: "100%", marginTop: 8, paddingVertical: 20, paddingLeft: 15 }}>
          <ScrollView style={{ width: "100%" }} horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={{ marginRight: 24 }} onPress={() => setCurrentTab("STCW National")}>
              <PreDepartureTab isAlert={true} title={"STCW National"} currentTab={currentTab} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 24 }} onPress={() => setCurrentTab("Flag State")}>
              <PreDepartureTab isAlert={true} title={"Flag State"} currentTab={currentTab} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 24 }} onPress={() => setCurrentTab("GDPR Documents")}>
              <PreDepartureTab isAlert={false} title={"GDPR Documents"} currentTab={currentTab} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 24 }} onPress={() => setCurrentTab("Training")}>
              <PreDepartureTab isAlert={false} title={"Training"} currentTab={currentTab} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 16 }} onPress={() => setCurrentTab("Technical")}>
              <PreDepartureTab isAlert={false} title={"Technical"} currentTab={currentTab} />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      <ScrollView style={{ width: "100%", paddingHorizontal: 16, paddingVertical: 18 }}>
        <Text style={styles.descText}>
          Items should only be ticked off once the corresponding original paper document has been added to your Blue Pouch in preparation for departure.
        </Text>
        <View style={{ width: "100%", paddingTop: 22 }}>
          <Text style={styles.sectionTitle}>Pending</Text>
          <View style={styles.sectionContent}>
            {pendingItems.length === 0 ? (
              <Text style={styles.emptyText}>No pending documents</Text>
            ) : pendingItems.map(item => (
              <PreDepartureItem
                key={item.id}
                id={item.id}
                status={item.status}
                categoryId={item.documentInfo.categoryId}
                docName={item.documentInfo.description}
                docNumber={item.documentInfo.documentNumber}
                nation={item.documentInfo.nation}
                optional={item.documentInfo.optional}
                issueDate={item.documentInfo.unlimited ? 'N/A' : moment(item.documentInfo.issueDate).format('DD.MM.YY')}
                expiryDate={item.documentInfo.unlimited ? 'N/A' : moment(item.documentInfo.expiryDate).format('DD.MM.YY')}
              />
            ))}
          </View>
        </View>
        <View style={{ width: "100%", paddingTop: 22 }}>
          <Text style={styles.sectionTitle}>Completed</Text>
          <View style={styles.sectionContent}>
            {completedItems.length === 0 ? (
              <Text style={styles.emptyText}>No completed documents</Text>
            ) : completedItems.map(item => (
              <PreDepartureItem
                key={item.id}
                id={item.id}
                status={item.status}
                categoryId={item.documentInfo.categoryId}
                docName={item.documentInfo.description}
                docNumber={item.documentInfo.documentNumber}
                nation={item.documentInfo.nation}
                optional={item.documentInfo.optional}
                issueDate={item.documentInfo.unlimited ? 'N/A' : moment(item.documentInfo.issueDate).format('DD.MM.YY')}
                expiryDate={item.documentInfo.unlimited ? 'N/A' : moment(item.documentInfo.expiryDate).format('DD.MM.YY')}
              />
            ))}
          </View>
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
    paddingHorizontal: 6,
    paddingVertical: 16,
    backgroundColor: '#fff',
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
  emptyText: {
    fontSize: 12,
    lineHeight: 16,
    color: 'black',
    marginLeft: 11,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    lineHeight: 19,
    color: "black",
    fontFamily: "Roboto-Bold",
    marginLeft: 7
  },
  sectionContent: {
    flexDirection: 'column',
    marginTop: 4,
  },
});

const mapStateToProps = (state) => ({
  documents: state.documents,
});
export default connect(mapStateToProps)(PreDepartureScreen);
