import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, {useState} from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Styles from './style/Styles';
import { FontAwesome6 } from '@expo/vector-icons';
import AddWorkout from './AddWorkout';
import List from './List';
import Settings from './Settings';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [selectedUnit, setSelectedUnit] = useState("kilometers");
  const [checkUnit, setCheckUnit] = React.useState("kilometers")

  return (
      <NavigationContainer>
        <View style={Styles.container}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({ color }) => {
              let iconName;

              if (route.name === 'AddWorkout') {
                iconName = 'add';
              } else if (route.name === 'List') {
                iconName = 'list';
              } else if (route.name === 'Settings') {
                iconName = 'gear';
              }

              if (route.name === 'AddWorkout') {
                return <FontAwesome6 name={iconName} size={24} color={color} />;
              } else if (route.name === 'List') {
                return <FontAwesome6 name={iconName} size={24} color={color} />;
              } else if (route.name === 'Settings') {
                return <FontAwesome6 name={iconName} size={24} color={color} />;
              }
            },
            tabBarActiveTintColor:'#476369',
            tabBarInactiveTintColor: '#b6b6b6',
          })}
        >
          <Tab.Screen name="AddWorkout" >
            {() => (
              <AddWorkout
              selectedUnit={selectedUnit}
              setSelectedUnit={setSelectedUnit}
              checkUnit={checkUnit}
              setCheckUnit={setCheckUnit}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="List" >
          {() => (
            <List
            selectedUnit={selectedUnit}
            setSelectedUnit={setSelectedUnit}
            checkUnit={checkUnit}
            setCheckUnit={setCheckUnit}
            />
            )}
          </Tab.Screen>
          <Tab.Screen name="Settings" >
            {() => (
            <Settings
            selectedUnit={selectedUnit}
            setSelectedUnit={setSelectedUnit}
            checkUnit={checkUnit}
            setCheckUnit={setCheckUnit}
            />
            )}
          </Tab.Screen>
        </Tab.Navigator>
        </View>
      </NavigationContainer>
  );
}
