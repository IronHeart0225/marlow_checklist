import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const PreDepartureItem = (props) => {
  const { categoryId, status, docName, docNumber, nation, optional, issueDate, expiryDate } = props;

  const renderDocumentIcon = () => {
    if (status === 'Pending') {
      if (categoryId === 0) {
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
    } else if (status === 'Done') {
      return <IonIcon name="checkmark-circle" color="#005AA5" size={20} />
    } else if (status === 'Skip') {
      return <IonIcon name="remove-circle" color="#005AA5" size={20} />
    }
    return <></>;
  }

  const renderSwipeButton = (name) => {
    const icon = name === 'Done' || name === 'Submitted' ? 'check-circle'
      : name === 'Skip' ? 'minus-circle'
        : name === 'Uncheck' ? 'circle'
          : '';
    const bgColor = name === 'Submitted' || name === 'Skip' ? '#002646' : '#4F9B90';
    return (
      <View style={{ width: 80, height: 88, backgroundColor: bgColor, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <FeatherIcon name={icon} color={"#ffffff"} size={24} />
        <Text style={styles.swipeText}>{name}</Text>
      </View>
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
      {status === 'Done' || status === 'Skip' ? (
        <View style={{ flexDirection: "row", marginLeft: 16 }}>
          {renderSwipeButton('Uncheck')}
        </View>
      ) : categoryId === 0 ? (
        <View style={{ flexDirection: "row", marginLeft: 16 }}>
          {renderSwipeButton('Submitted')}
        </View>
      ) : categoryId === 1 ? (
        <View style={{ flexDirection: "row", marginLeft: 16 }}>
          {renderSwipeButton('Done')}
          {renderSwipeButton('Skip')}
        </View>
      ) : (
        <View style={{ flexDirection: "row", marginLeft: 16 }}>
          {renderSwipeButton('Done')}
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
  swipeText: {
    fontFamily: "Roboto-Regular",
    color: "white",
    fontSize: 12,
    lineHeight: 21
  }
});

export default PreDepartureItem;