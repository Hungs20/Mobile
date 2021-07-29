import React from 'react'
import { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native'
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from './../../../styles';
const labels = ["Thông tin","Địa chỉ","Tiện ích","Xác nhận"];
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Colors.blue,
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: Colors.blue,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: Colors.blue,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: Colors.blue,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: Colors.blue,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: Colors.blue,
}

  
class Step extends Component {
  constructor(props) {
      super(props)
      this.state = {
          currentPage: this.props.currentStep,
      }
  }
  getStepIndicatorIconConfig = ({position, stepStatus}) => {
    
    const iconConfig = {
      name: 'room',
      color: stepStatus === 'finished' ? '#ffffff' : Colors.blue,
      size: 15
    };
    switch (position) {
      case 0: {
        iconConfig.name = 'info';
        break;
      }
      case 1: {
        iconConfig.name = 'room';
        break;
      }
      case 2: {
        iconConfig.name = 'extension';
        break;
      }
      case 3: {
        iconConfig.name = 'check';
        break;
      }
      default: {
        break;
      }
    }
    return iconConfig;
  };
  onStepPress = (position) => {
    //this.setState({currentPage: position})
    this.props.setStep(position)
  }
  renderViewPagerPage = (data) => {
    return (
      <View key={data} style={styles.page}>
        <Text>{data}</Text>
      </View>
    )
  }
  renderStepIndicator = (params) => (
    //console.log(this.getStepIndicatorIconConfig(params))

    <Icon {...this.getStepIndicatorIconConfig(params)}></Icon>
    
  )
  renderLabel = (position, label, currentPosition) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }
      >
        {label}
      </Text>
    )
  }
  render() {

    return (
      <View style={styles.stepIndicator}>
        <StepIndicator
            customStyles={customStyles}
            stepCount={this.props.maxStep}
            currentPosition={this.props.currentStep}
            renderStepIndicator={this.renderStepIndicator}
            labels={labels}
            onPress={this.onStepPress}
        />
      </View>

    )
  }

  onPageChange(position){
      this.setState({currentPage: position});
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    marginVertical: 10,
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999',
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f',
  },
});
export default Step;
