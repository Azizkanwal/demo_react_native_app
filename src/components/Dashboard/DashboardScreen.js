import React, {useEffect, useState} from "react";
import {StyleSheet, View, StatusBar, Text, ScrollView} from "react-native";
import {TodayAttendance} from "./TodayAttendance";
import {ProjectDetail} from "./ProjectDetail";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {UpcomingBirthdays} from "./UpcomingBirthday";
import {getDashboardData, startLoader, stopLoader} from "../../redux/slices";
import Toast from "react-native-toast-message";

export const DashboardScreen = (props: any) => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    useEffect(() => {
        async function fetchData() {
            await dispatch(startLoader());
            await dispatch(getDashboardData(renderResponseMessage));
            await dispatch(stopLoader());
        }
        fetchData();
    }, [])

    const renderResponseMessage = (success, response) => {
        if (!success) {
            Toast.show({
                type: 'error',
                isVisible: true,
                text1: response.message,
                visibilityTime: 4000,
                position: 'top'
            });
        }
    }

    return (
        <View style={styles.mainView}>
            <StatusBar animated={true} backgroundColor="#172b4d"/>
            <ScrollView bounces={false}>
                <View style={styles.containerView}>
                    <Text style={styles.welcomeText}>
                        Welcome {`${user?.first_name ?? ""}${user?.last_name ? " " : ""}${user?.last_name ?? ""}`}!
                    </Text>
                    <TodayAttendance/>
                    <ProjectDetail/>
                </View>

                <View style={styles.upcomingBirthdays}>
                    <UpcomingBirthdays/>
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
    upcomingBirthdays: {
        marginTop: -90,
        marginBottom: 20,
        padding: 10,
        minHeight: 100,
    },
    welcomeText: {
        color: '#FFF',
        fontSize: 20,
        marginBottom: 10
    }
});
