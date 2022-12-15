import React from "react";
import {StyleSheet, View, StatusBar, Text, ScrollView} from "react-native";
import {AttendanceList} from "./AttendanceList";

export const AttendanceScreen = (props: any) => {
    return (
        <View style={styles.mainView}>
            <StatusBar backgroundColor="#172b4d"/>
            <ScrollView bounces={false}>
                <View style={styles.containerView}>
                    <Text style={styles.attendanceText}>
                        Attendance List
                    </Text>
                </View>
                <View style={styles.attendanceList}>
                    <AttendanceList/>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    containerView: {
        padding: 10,
        backgroundColor: '#172b4d',
        paddingBottom: 100,
    },
    attendanceList: {
        marginTop: -90,
        marginBottom: 20,
        padding: 10,
        minHeight: 100,

    },
    attendanceText: {
        color: '#FFF',
        margin: 5,
        fontSize: 20,
        marginBottom: 10
    }
});
