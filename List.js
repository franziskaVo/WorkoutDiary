import { Text, View, FlatList, ScrollView, Pressable, Button } from "react-native";
import { LIST_KEY } from "./AddWorkout";
import {useFocusEffect} from '@react-navigation/native';
import Styles from "./style/Styles";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome6 } from '@expo/vector-icons';


export default List = ({selectedUnit, navigation}) => {

    //const {selectedUnit: selectedUnit} = route.params;
    const [workouts, setWorkouts] = useState([]);
    //const [totalDistance, setTotalDistance] = useState(0);
    const [totalRunDistance, setTotalRunDistance] = useState(0);
    const [totalSwimDistance, setTotalSwimDistance] = useState(0);
    const [totalBikeDistance, setTotalBikeDistance] = useState(0);


    useFocusEffect(
        React.useCallback(() => {
          loadWorkouts();
        }, [])
      );

    useEffect(() => {
        // Beim ersten Laden der App das voreingestellte Workout hinzufügen
        addDefaultWorkout();
        // Workouts laden
        loadWorkouts();
    }, []);


    // Voreingestelltes Workout hinzufügen
    const addDefaultWorkout = async () => {
        try {
            // Voreingestelltes Workout erstellen
            const defaultWorkout1 = {
                sportType: 'run',
                date: '2024-02-02T00:00:00.000Z',
                distance: 10,
                duration: 60
            };
            const defaultWorkout2 = {
                sportType: 'swim',
                date: '2024-02-04T00:00:00.000Z',
                distance: 8,
                duration: 50
            };

            const defaultWorkouts = [defaultWorkout1, defaultWorkout2];
             // AsyncStorage aktualisieren
            await AsyncStorage.setItem(LIST_KEY, JSON.stringify(defaultWorkouts));
        } catch (error) {
            console.log("Error adding default workout: ", error);
        }
    };


   

    //--------get scoreboard data from async storage------
    const loadWorkouts = async () => {
        try {
            const storedWorkouts = await AsyncStorage.getItem(LIST_KEY);
            if (storedWorkouts) {
                const parsedWorkouts = JSON.parse(storedWorkouts);
                setWorkouts(parsedWorkouts);
                calculateTotalDistanceBySport(parsedWorkouts);
            }
        } catch (error) {
            console.log("Error loading workouts: ", error);
        }
    };

    // Funktion zum Berechnen der Gesamtdistanz aller Workouts für jede Sportart
    const calculateTotalDistanceBySport = (workouts) => {
        let totalRunDistance = 0;
        let totalSwimDistance = 0;
        let totalBikeDistance = 0;

        workouts.forEach((workout) => {
            switch (workout.sportType) {
                case 'run':
                    totalRunDistance += workout.distance;
                    break;
                case 'swim':
                    totalSwimDistance += workout.distance;
                    break;
                case 'bike':
                    totalBikeDistance += workout.distance;
                    break;
                default:
                    break;
            }
        });

        setTotalRunDistance(totalRunDistance);
        setTotalSwimDistance(totalSwimDistance);
        setTotalBikeDistance(totalBikeDistance);
    };


    // Render-Item-Funktion für jedes Workout in der FlatList
    const renderWorkoutItem = ({ item }) => {
        // Umwandeln des ISO-Datums in ein Date-Objekt
        const workoutDate = new Date(item.date);
        // Extrahieren des Datums im gewünschten Format TT.MM.JJJJ
        const formattedDate = workoutDate.toLocaleDateString('de-DE');

        return (
        <View style={Styles.workoutItem}>
            {renderSportIcon(item.sportType)}
            <Text>Date: {formattedDate}</Text>
            <Text>Distance: {convertDistance(item.distance, selectedUnit)} {selectedUnit}</Text>
            <Text>Duration: {item.duration} min</Text>
        </View>
        );
    };

    

    // Funktion zur Rendern des Sport-Icons basierend auf dem Sporttyp
    const renderSportIcon = (sportType) => {
        switch (sportType) {
            case 'run':
                return <FontAwesome6 name="person-running" size={24} color={"#476369"} />;
            case 'bike':
                return <FontAwesome6 name="person-biking" size={24} color={"#476369"} />;
            case 'swim':
                return <FontAwesome6 name="person-swimming" size={24} color={"#476369"} />;
            default:
                return null; // Fallback, falls der Sporttyp nicht erkannt wird
        }
    };

    const convertDistance = (distance, selectedUnit) => {
        if (selectedUnit === 'miles') {
            return (distance * 0.621371).toFixed(2);
        } else {
            return distance.toFixed(2);
        }
    };



    // Function to clear the list
     const clearList = async () => {
         try {
            await AsyncStorage.removeItem(LIST_KEY);
            setWorkouts([]);
            setTotalRunDistance(0);
            setTotalSwimDistance(0);
            setTotalBikeDistance(0);
         } catch (error) {
             console.log("Error clearing list: ", error);
         }
     };


    return (
        <View style={Styles.containerList}>
            <View style={Styles.distances}>
                <Pressable style={Styles.distanceButton}>
                    <FontAwesome6 name="person-running" size={24} color={"#ffffff"} marginTop={10} />
                    <Text style={Styles.textDistance}>Distance: {'\n'} {convertDistance(totalRunDistance, selectedUnit)} {selectedUnit}</Text>
                </Pressable>
                <Pressable style={Styles.distanceButton}>
                    <FontAwesome6 name="person-biking" size={24} color={"#ffffff"} marginTop={10} />
                    <Text style={Styles.textDistance}>Distance: {'\n'} {convertDistance(totalBikeDistance, selectedUnit)} {selectedUnit}</Text>
                </Pressable>
                <Pressable style={Styles.distanceButton}>
                    <FontAwesome6 name="person-swimming" size={24} color={"#ffffff"} marginTop={10} />
                    <Text style={Styles.textDistance}>Distance: {'\n'} {convertDistance(totalSwimDistance, selectedUnit)} {selectedUnit}</Text>
                </Pressable>
            </View>
            <FlatList
                data={workouts}
                renderItem={renderWorkoutItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <Pressable style={Styles.button} onPress={clearList}>
                <Text style={Styles.button}>Clear List</Text>
            </Pressable>
        </View>
    );
}