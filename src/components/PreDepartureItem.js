import React from "react";
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { setPreDepartureDocumentStatus } from '../store/actions/documentActions';

const PreDepartureItem = (props) => {
  const {
    id,
    status,
    docName,
    docNumber,
    nation,
    optional,
    followUp,
    issueDate,
    expiryDate,
    setPreDepartureDocumentStatus,
  } = props;

  const renderDocumentIcon = () => {
    if (status === 'Active') {
      if (followUp) {
        return <FeatherIcon name="alert-circle" color="#cb3c47" size={20} />
      } else {
        return (
          <View style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: "#005AA5",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <IonIcon name="document-text" color="#ffffff" size={10} />
          </View>
        );
      }
    } else if (status === 'Done' || status === 'Submitted') {
      return <IonIcon name="checkmark-circle" color="#005AA5" size={20} />
    } else if (status === 'Skipped') {
      return <IonIcon name="remove-circle" color="#005AA5" size={20} />
    }
    return <></>;
  }

  const handleDocument = async (status) => {
    const res = await setPreDepartureDocumentStatus(id, status);
    if (res.code !== 200) {
      console.log(res);
    }
  }

  const renderSwipeButton = (name, status) => {
    const icon = name === 'Done' || name === 'Submitted' ? 'check-circle'
      : name === 'Skip' ? 'minus-circle'
        : name === 'Uncheck' ? 'circle'
          : '';
    const bgColor = name === 'Submitted' || name === 'Skip' ? '#002646' : '#4F9B90';
    return (
      <TouchableOpacity
        style={[styles.swipeButton, { backgroundColor: bgColor }]}
        onPress={() => handleDocument(status)}
      >
        <FeatherIcon name={icon} color={"#ffffff"} size={24} />
        <Text style={styles.swipeText}>{name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView style={{ width: "100%", height: 88 }} showsHorizontalScrollIndicator={false} horizontal>
      <View style={[styles.itemContainer, { width: Dimensions.get('window').width - 32 }]}>
        {renderDocumentIcon()}
        <View style={{ flex: 1, marginLeft: 17 }}>
          <View style={styles.infoView}>
            <View>
              <Text style={styles.titleText}>{docName}</Text>
              <Text style={styles.titleText}>{nation}, {docNumber}</Text>
            </View>
            {optional && (
              <Text style={styles.descText}>(Optional)</Text>
            )}
          </View>
          <View style={[styles.infoView, { marginTop: 7 }]}>
            <Text style={styles.descText}>Issue date: {issueDate}</Text>
            <Text style={styles.descText}>Exp. date: {expiryDate}</Text>
          </View>
        </View>
      </View>
      {status === 'Done' || status === 'Skipped' || status === 'Submitted' ? (
        <View style={{ flexDirection: "row", marginLeft: 16 }}>
          {renderSwipeButton('Uncheck', 'Active')}
        </View>
      ) : followUp ? (
        <View style={{ flexDirection: "row", marginLeft: 16 }}>
          {renderSwipeButton('Submitted', 'Submitted')}
        </View>
      ) : optional ? (
        <View style={{ flexDirection: "row", marginLeft: 16 }}>
          {renderSwipeButton('Done', 'Done')}
          {renderSwipeButton('Skip', 'Skipped')}
        </View>
      ) : (
        <View style={{ flexDirection: "row", marginLeft: 16 }}>
          {renderSwipeButton('Done', 'Done')}
        </View>
      )}
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 88,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#C7CBCE",
    borderBottomWidth: 1,
    borderStyle: "solid"
  },
  infoView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: "black"
  },
  descText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: "#707070"
  },
  swipeButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 88,
  },
  swipeText: {
    fontFamily: "Roboto-Regular",
    color: "white",
    fontSize: 12,
    lineHeight: 21
  },
});

const mapDispatchToProps = {
  setPreDepartureDocumentStatus,
}
export default connect(null, mapDispatchToProps)(PreDepartureItem);
