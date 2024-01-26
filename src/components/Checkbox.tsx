import React from 'react';
import {Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

interface Props {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  textCheckbox: string;
}

const CheckBoxComponent = (props: Props) => {
  const {state, setState, textCheckbox} = props;

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CheckBox value={state} onValueChange={setState} />
        <Text>{textCheckbox}</Text>
      </View>
    </View>
  );
};

export default CheckBoxComponent;
