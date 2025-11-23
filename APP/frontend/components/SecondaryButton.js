import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import globalStyles from '../theme/styles';
import colors from '../theme/colors';

const SecondaryButton = ({ title, onPress, disabled, style, textStyle }) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                globalStyles.secondaryButton,
                disabled && styles.disabled,
                pressed && !disabled && styles.pressed,
                style,
            ]}
        >
            <Text style={[globalStyles.secondaryButtonText, textStyle]}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
        backgroundColor: '#F0F0F0',
    },
    disabled: {
        opacity: 0.5,
    },
});

export default SecondaryButton;
