import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {MotiView} from 'moti';
import {Easing} from 'react-native-reanimated';

const _colors = {
  active: '#2C2C2C',
  inactive: '#DCDCDC',
};

const transition = {
  type: 'timing',
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};

const Switch = ({size, onPress, isActive}) => {
  const trackWidth = useMemo(() => {
    return size * 1.5;
  }, [size]);
  const trackHeight = useMemo(() => {
    return size * 0.4;
  }, [size]);
  const knobSize = useMemo(() => {
    return size * 0.6;
  }, [size]);

  return (
    <Pressable onPress={onPress}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {/* track */}
        <MotiView
          transition={transition}
          animate={{
            backgroundColor: isActive ? _colors.active : _colors.inactive,
          }}
          style={{
            position: 'absolute',
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
            backgroundColor: _colors.active,
          }}
        />
        {/* knob container */}
        <MotiView
          transition={transition}
          animate={{
            translateX: isActive ? trackWidth / 4 : -trackWidth / 4,
          }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* knob indicator */}
          <MotiView
            transition={transition}
            animate={{
              width: isActive ? 0 : knobSize,
              borderColor: isActive ? _colors.active : _colors.inactive,
            }}
            style={{
              width: knobSize,
              height: knobSize,
              borderRadius: knobSize / 2,
              borderWidth: size * 0.1,
              borderColor: _colors.active,
            }}
          />
        </MotiView>
      </View>
    </Pressable>
  );
};

const App = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.container}>
      <Switch
        size={120}
        onPress={() => setIsActive(prevState => !prevState)}
        isActive={isActive}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
