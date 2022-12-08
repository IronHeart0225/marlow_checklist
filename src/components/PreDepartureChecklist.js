import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const PreDepartureChecklist = (props) => {
  const { percent } = props;

  return (
    <View style={styles.checkListContainer}>
      <View style={styles.align}>
        <AnimatedCircularProgress
          size={40}
          width={4}
          fill={percent}
          rotation={0}
          tintColor="#005aa5"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#fff">
          {(fill) => (
            <Text style={styles.percent}>{fill.toFixed(0)}%</Text>
          )}
        </AnimatedCircularProgress>
        <Text style={styles.title}>Review List</Text>
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
    paddingVertical: 20,
  },
  align: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: 'black',
    marginLeft: 12,
  },
  percent: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
  },
});

export default PreDepartureChecklist;
