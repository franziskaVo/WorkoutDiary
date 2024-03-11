import React, { useState} from 'react';
import { View, Text, TextInput, Alert, Pressable, Platform, Keyboard } from 'react-native';
import { FontAwesome6} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SegmentedButtons } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from './style/Styles';
import {useNavigation} from '@react-navigation/native';


export const LIST_KEY = '@list';


const AddWorkout = ({selectedUnit}) => {
    const [sportType, setSportType] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState(new Date());
    const navigation = useNavigation();


//Run Icon
 const RunIcon = () => {
     return (
         <FontAwesome6
             style={Styles.runIcon}
             name="person-running"
         />
     );
 };

 //Bike Icon
 const BikeIcon = () => {
    return (
        <FontAwesome6
            style={Styles.runIcon}
            name="person-biking"
        />
    );
};

 //Swim Icon
 const SwimIcon = () => {
    return (
        <FontAwesome6
            style={Styles.runIcon}
            name="person-swimming"
        />
    );
};


// Calendar --> select a date 
const handleDateChange = (event, selectedDate) => {
    // selected date should not be in the future
    const currentDate = new Date();
    if (selectedDate > currentDate) {
        Alert.alert(
            'Error',
            'Please select a date in the past or today',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
        );
    } else {
        if (Platform.OS === 'ios') {
            setDate(selectedDate);
        } else {
            setShowDatePicker(false);
            setDate(selectedDate);
        }
    }
};

// Add a workout to async storage
    const addWorkout = async () => {
        if (!sportType || !distance || !duration) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
    }

    const numDistance = parseFloat(distance);
    const numDuration = parseFloat(duration);

    if (numDistance < 0 || numDuration < 0 || isNaN(numDistance) || isNaN(numDuration)) {
      Alert.alert('Error', 'Distance and duration should be positive numbers');
      return;
    }

    // Convert distance
    let convertedDistance = parseFloat(distance);
    if (selectedUnit === 'miles') {
        convertedDistance /= 0.621371;
    }

    const listData ={
        sportType: sportType,
        date: date,
        distance: convertedDistance,
        duration: numDuration,
    };

    try {
        // Load existing workouts from AsyncStorage
        const storedWorkouts = await AsyncStorage.getItem(LIST_KEY);
        let workouts = [];

        if (storedWorkouts) {
            workouts = JSON.parse(storedWorkouts);
        }
        workouts.push(listData); // Add the new workout to the existing list and save the updated list back to AsyncStorage
        await AsyncStorage.setItem(LIST_KEY, JSON.stringify(workouts));
        navigation.navigate('List');
    } catch (error) {
        console.log('Error saving workout:', error);
    };

    setSportType(''); // Clear input fields after adding the workout
    setDistance('');
    setDuration('');
  };


  return (
    <View style={Styles.containerAdd}>
      <Text style={Styles.header}>Add Workout</Text>
      <SegmentedButtons
        style={Styles.sportButton}
        value={sportType}
        onValueChange={(value)=> setSportType(value)}
        buttons={[
          {
            value: 'run',
            label: 'Run',
            checkedColor:'#ffffff',
            uncheckedColor:'#ffffff',
            fontFamily:'Avenir',
            icon: RunIcon 
          },
          {
            value: 'bike',
            label: 'Bike',
            checkedColor:'#ffffff',
            uncheckedColor:'#ffffff',
            fontFamily:'Avenir',
            icon: BikeIcon
          },
          { value: 'swim', 
            label: 'Swim',
            checkedColor:'#ffffff',
            uncheckedColor:'#ffffff',
            fontFamily:'Avenir',
            icon: SwimIcon
        }
        ]}
      />
      <TextInput
        style={Styles.durationAndDistance}
        placeholder={`Distance (${
            selectedUnit === "miles" ? "miles" : "km"
          })`}
        mode='outlined'
        value={distance}
        onChangeText={text => {
            if (text === '' || parseInt(text) >= 0) {
                setDistance(text);
            } else {
                setDistance('');
                alert('Please enter a positive number');
            }
        }}
        keyboardType="numeric"
        maxLength={3}
        returnKeyType='done'
        onSubmitEditing={Keyboard.dismiss}
      />
      <TextInput
        style={Styles.durationAndDistance}
        placeholder="Duration (min)"
        mode='outlined'
        value={duration}
        onChangeText={text => {
            if (text === '' || parseInt(text) >= 0) {
                setDuration(text);
            } else {
                setDuration('');
                alert('Please enter a positive number');
            }
        }}
        keyboardType="numeric"
        maxLength={3}
        returnKeyType='done'
        onSubmitEditing={Keyboard.dismiss}
      />
      <Text style={Styles.dateHeader}>Select a date</Text>
      <DateTimePicker
                style={Styles.calendar}
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
        />
      <Pressable style={Styles.button} onPress={addWorkout}>
        <Text style={Styles.button}>Add Workout</Text>
      </Pressable>
    </View>
  );
};


export default AddWorkout;
