import React, { useEffect, useState } from "react";
import { View, Text} from "react-native";
import RadioForm from "react-native-simple-radio-button";
import Styles from "./style/Styles";

const SettingsScreen = ({setSelectedUnit}) => {

  const handleUnitChange = (value) => {
    setSelectedUnit(value);
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.containerSettings}>
        <Text style={Styles.header}>Select Units:</Text>
        <RadioForm
            style={Styles.radioButton}
            radio_props={[
                { label: "Kilometers", value: "kilometers" },
                { label: "Miles", value: "miles" },
            ]}
            initial={0}
            formHorizontal={false}
            onPress={(value) => handleUnitChange(value)}
        />
      </View>
      
    </View>
  );
};

export default SettingsScreen;