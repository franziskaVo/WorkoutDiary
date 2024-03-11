import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Alert, Pressable, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome6,MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Col, Row, Grid } from "react-native-easy-grid";
import { SegmentedButtons } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from './style/Styles';
import {useNavigation} from '@react-navigation/native';


export const LIST_KEY = '@list';


const AddWorkout = ({selectedUnit,setSelectedUnit, myfont}) => {
    // const values = ["Run", "Bike","Swim"];
    // const [value, setValue] = useState(values[0]);
    const [value, setValue] = React.useState('');
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


// Funktion zum Ändern des Datums
const handleDateChange = (event, selectedDate) => {
    // Überprüfen, ob das ausgewählte Datum in der Zukunft liegt
    const currentDate = new Date();
    if (selectedDate > currentDate) {
        // Wenn das ausgewählte Datum in der Zukunft liegt, zeige eine Alert-Nachricht an
        Alert.alert(
            'Error',
            'Please select a date in the past or today',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
        );
    } else {
        // Wenn das ausgewählte Datum in der Vergangenheit oder heute liegt, setzen Sie das Datum
        if (Platform.OS === 'ios') {
            setDate(selectedDate); // Für iOS direkt das Datum setzen
        } else {
            setShowDatePicker(false); // Für Android das DatePicker-Fenster schließen
            setDate(selectedDate); // Datum setzen
        }
    }
};

// Add a workout 
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

    // Convert distance based on selected unit before saving
    let convertedDistance = parseFloat(distance);
    if (selectedUnit === 'miles') {
        // Convert to kilometers if the selected unit is miles
        convertedDistance /= 0.621371;
    }

    const listData ={
        sportType: sportType,
        date: date,
        distance: convertedDistance, // Use the converted distance
        duration: numDuration,
    };

    try {
        // Load existing workouts from AsyncStorage
        const storedWorkouts = await AsyncStorage.getItem(LIST_KEY);
        let workouts = [];

        if (storedWorkouts) {
            workouts = JSON.parse(storedWorkouts);
        }

        // Add the new workout to the existing list
        workouts.push(listData);

        // Save the updated list back to AsyncStorage
        await AsyncStorage.setItem(LIST_KEY, JSON.stringify(workouts));

        // Navigieren zur 'List'-Seite nach dem Hinzufügen des Workouts
        navigation.navigate('List');

        // Reload the workouts in the list component
        //loadWorkouts();
    } catch (error) {
        console.log('Error saving workout:', error);
    };

  
    // Here you would save the workout into your context or state array
    // For now, let's just print the workout details
    console.log('Workout added:', {
      sportType,
      distance: numDistance,
      duration: numDuration,
      date: date
    });

    // Clear input fields after adding workout
    setSportType('');
    setDistance('');
    setDuration('');
  };


  return (
    <View style={Styles.containerAdd}>
      <Text style={Styles.header}>Add Workout</Text>
      <SegmentedButtons
        style={Styles.sportButton}
        //theme={{ colors: { primary: 'green' } }}
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
                // Wenn die Eingabe leer ist oder eine positive Zahl ist, setze die Distanz
                setDistance(text);
            } else {
                // Ansonsten setze die Distanz auf einen leeren String und zeige eine Fehlermeldung an
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
        //label='Duration'
        placeholder="Duration (min)"
        mode='outlined'
        value={duration}
        onChangeText={text => {
            if (text === '' || parseInt(text) >= 0) {
                // Wenn die Eingabe leer ist oder eine positive Zahl ist, setze die Distanz
                setDuration(text);
            } else {
                // Ansonsten setze die Distanz auf einen leeren String und zeige eine Fehlermeldung an
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
