import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {vibrate} from './utils';



class Timer extends Component {
  state = {
    resetStudyCount: 1500,
    resetBreakCount: 300,
    count: 1500,
    studyTime: true,
    
    
  }
  // convert to minutes: seconds format
  conversion = time => {
    const minutes = Math.floor(time/60)
    console.log(minutes)
    const seconds = time % 60
    return `${minutes}:${seconds}`
  }
  
  startTimer = () => {
    // clear interval initially to keep number of setIntervals to 0 when restarting
    clearInterval(this.interval)
    this.interval = setInterval(this.decrement, 1000)
  }

  stopTimer = () => {
    clearInterval(this.interval)
  }
  
  resetTimer = () => {
    if (this.state.studyTime) {
    this.setState(prevState => ({
      count: 1500,
    }))
  } 
    else {
      this.setState(prevState => ({
        count: 300
      }))
    }
  
  }

  decrement = () => {
    if (this.state.count == 0 && this.state.studyTime) {
    this.setState(prevState => ({
      count: this.state.resetBreakCount,
      studyTime: !this.state.studyTime,
      
    }))
    vibrate()
  }
    if (this.state.count == 0) {
      this.setState(prevState => ({
        count: this.state.resetStudyCount,
        studyTime: !this.state.studyTime,
      }))
      vibrate()
    }
    else {
      this.setState(prevState => ({
        count: prevState.count - 1,
      }))
    }
  }

  componentWillUnmount() {
     clearInterval(this.interval)
   }
  
  render() {
    return (
    <View style={styles.container}>
    <Button onPress={() => this.startTimer()} title="Start" />
    <Button onPress={() => this.stopTimer()} title="Stop" />
    <Button onPress={() => this.resetTimer()} title="Reset" />
    <Text>Time left: {this.conversion(this.state.count)}</Text>
    </View>
    )
  }
}


export default class App extends Component {
  render() { 
    return (
      <View style={styles.container}>
        <Timer />
      </View>
      
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
