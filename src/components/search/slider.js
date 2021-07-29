import React, { Component, useState } from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import styled from 'styled-components/native'
import { Platform } from 'react-native'


const SliderWrapper = styled.View`
  margin: 20px;
  width: 280px;
  height: 100px;
  justify-content: center;
`

const ViewContainer = styled.View`
  align-self: center;
  justify-content: center;
`
const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
`

const LabelText = styled.Text`
  font-size: 20px;
`

class Slider extends Component {
  constructor(props){
    super(props)
    this.state={
      multiSliderValue: [0.5,15],

    }
  }
  multiSliderValuesChange = (values) => {
    //setMultiSliderValue(values)
    this.setState({multiSliderValue: values})
    this.props.changeCost(values)
  }
  render(){
  return (
    <ViewContainer>
      <SliderWrapper>
        <LabelWrapper>
          <LabelText>{this.state.multiSliderValue[0]} triệu VND</LabelText>
          <LabelText>{this.state.multiSliderValue[1]} triệu VND</LabelText>
        </LabelWrapper>
        <MultiSlider
          markerStyle={{
            ...Platform.select({
              ios: {
                height: 30,
                width: 30,
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowRadius: 1,
                shadowOpacity: 0.1
              },
              android: {
                height: 30,
                width: 30,
                borderRadius: 50,
                backgroundColor: '#1792E8'
              }
            })
          }}
          pressedMarkerStyle={{
            ...Platform.select({
              android: {
                height: 30,
                width: 30,
                borderRadius: 20,
                backgroundColor: '#148ADC'
              }
            })
          }}
          selectedStyle={{
            backgroundColor: '#1792E8'
          }}
          trackStyle={{
            backgroundColor: '#CECECE'
          }}
          touchDimensions={{
            height: 40,
            width: 40,
            borderRadius: 20,
            slipDisplacement: 40
          }}
          values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
          sliderLength={280}
          onValuesChange={this.multiSliderValuesChange}
          min={0.5}
          max={15}
          step={0.5}
          allowOverlap={false}
          minMarkerOverlapDistance={10}
        />
      </SliderWrapper>
    </ViewContainer>
  )
        }
}

export default Slider