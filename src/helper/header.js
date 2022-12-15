import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

export const CustomHeader = (props: any) =>{
    const { onPress, title } = props;

    return(
        <View style={styles.headerStyle}>
            <View style={styles.headerStyleBackButtonView}>
                <TouchableOpacity activeOpacity={1} onPress={onPress}>
                <Ionicons size={24}
                          style={styles.backButton}
                          name="arrow-back"
                          color={'#FFFFFF'}/>
                </TouchableOpacity>
            </View>
            <View style={styles.headerStyleTitleView}>
                <Text style={styles.headerTextStyle}>{title}</Text>
            </View>
            <View style={styles.headerStyleBackButtonView}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#172b4d',
        borderBottomWidth: 0.2,
        borderBottomColor: "#eee",
    },
    headerStyleBackButtonView: {
        flex: 1
    },
    headerStyleTitleView: {
        width: '100%',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTextStyle: {
        width: '100%',
        textAlign: 'center',
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: '500'
    },
    backButton: {
        marginLeft: 5,
    }
});
