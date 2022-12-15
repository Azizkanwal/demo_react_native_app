import React, {useState} from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const TimePicker = (props) => {
    const [isVisible, setVisible] = useState(false);
    const {onChange, defaultValue, name, value, textStyle, ...otherProps} = props;
    const textValue = (value ? value.toString() : '').strftime('%h:%M %P');
    return (<>
            <TouchableOpacity activeOpacity={1} onPress={() => setVisible(true)}>
                <Text style={[styles.textStyle, textStyle, textValue.length > 0 ? {} : styles.placeholderText]}>
                    {textValue.length > 5 ? textValue : '00:00'}
                </Text>
            </TouchableOpacity>
            <DateTimePicker {...otherProps}
                            date={value ?? defaultValue}
                            isVisible={isVisible}
                            is24Hour={true}
                            mode={'time'}
                            onCancel={() => setVisible(false)}
                            onConfirm={(value) => {
                                onChange(value, name);
                                setVisible(false);
                            }}/>
        </>
    );
};


TimePicker.propTypes = {
    name: PropTypes.string.isRequired, // check true false conditions
    value: PropTypes.any, // check true false conditions
    defaultValue: PropTypes.any, // check true false conditions
    onChange: PropTypes.func.isRequired, // check true false conditions
    textStyle: PropTypes.object, // check true false conditions
};

TimePicker.defaultProps = {
    isVisible: false, // check true false conditions
    value: null, // check true false conditions
    defaultValue: null, // check true false conditions
    name: 'date', // check true false conditions
    onChange: (value: Date, name: string) => {
    }, // check true false conditions
    onCancel: () => {
    }, // check true false conditions
    textStyle: {},
};

const styles = StyleSheet.create({
    textStyle: {
        width: '100%',
        color: '#111111',
        padding: 10,
        marginTop: 10,
        fontWeight: '700',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 0.5,
        borderRadius: 10,
    },
    placeholderText: {
        color: 'grey',
    },

});

export default TimePicker;
