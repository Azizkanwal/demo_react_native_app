import React, {useEffect, useState} from "react";
import {StyleSheet, View, StatusBar, Text, TouchableOpacity} from 'react-native';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import Toast from "react-native-toast-message";
import {Button} from "react-native-paper";
import {timeIn, timeOut} from "../../redux/slices";

export const TodayAttendance = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [timeout, setTimeoutEvent] = useState(false);
    const [timer, setTimer] = useState("00:00:00");
    const dispatch = useAppDispatch();
    const attendance = useAppSelector((state) => state.attendance.attendance);

    useEffect(() => {
        if (attendance && !!(attendance.time_in && !attendance.time_out)) {
            setTimer([new Date().toString(), attendance.time_in].timeDifference().strftime("%H:%M:%s %UTC"));
            clearTimeout(timeout);
            setTimeoutEvent(null);
            setTimeoutEvent(setInterval(() => {
                setTimer([new Date().toString(), attendance.time_in].timeDifference().strftime("%H:%M:%s %UTC"));
            }, 1000))
        } else {
            clearTimeout(timeout);
            setTimeoutEvent(null);
        }
    }, [attendance]);

    const handleTimeIn = async () => {
        if (loading) return null;
        await setLoading(true);
        await dispatch(timeIn(renderResponseMessage));
        await setLoading(false);
    }

    const handleTimeOut = async () => {
        if (loading) return null;
        await setLoading(true);
        await dispatch(timeOut(renderResponseMessage));
        await setLoading(false);
    }

    const renderResponseMessage = (success, response) => {
        if (success) {
            Toast.show({type: 'success', isVisible: true, text1: response.message, visibilityTime: 4000, position: 'top'})
        } else {
            Toast.show({type: 'error', isVisible: true, text1: response.message, visibilityTime: 4000, position: 'top'})
        }
    }

    return (
        <View>
            <View style={styles.attendanceMainView}>
                {
                    !!attendance ?
                        <View style={styles.attendanceView}>
                            {
                                !!(attendance.time_in && attendance.time_out) &&
                                <>
                                    <Text style={styles.timeInText}>
                                        Today's Total Working Hours
                                    </Text>
                                    <Text style={styles.timeInText}>
                                        {[attendance.time_out, attendance.time_in].timeDifference().strftime("%H:%M:%s %UTC")}
                                    </Text>
                                </>
                            }
                            <>
                                {
                                    !!(attendance.time_in && !attendance.time_out) &&
                                    <>
                                        <Text style={styles.timeInText}>
                                            Time In at: {attendance.time_in.strftime('%h:%M %P')}
                                        </Text>
                                        <Text style={styles.timerText}>
                                            Timing: {timer}
                                        </Text>
                                        <TimeInOutButton loading={loading} onPress={handleTimeOut}>
                                            Time Out
                                        </TimeInOutButton>
                                    </>
                                }
                            </>
                        </View>
                        :
                        <View style={styles.attendanceTimeInView}>
                            <TimeInOutButton loading={loading} onPress={handleTimeIn}>
                                Time In
                            </TimeInOutButton>
                        </View>

                }
            </View>
        </View>
    );
};

const TimeInOutButton = (props: any) => {
    const {loading, onPress, children} = props;
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <Button icon={loading ? "loading" : ''}
                    style={styles.timeInButton}
                    loading={loading}
                    color={'#05b1c5'}
                    mode="contained">
                {children}
            </Button>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    welcomeText: {
        color: '#FFF',
        fontSize: 20,
        marginBottom: 10
    },
    timeInText: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#111111"
    },
    timerText: {
        fontSize: 14,
        marginBottom: 8,
        color: "#111111"
    },
    timeInButton: {
        width: '90%',
        alignSelf: 'center'
    },
    attendanceMainView: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    attendanceTimeInView: {
        maxWidth: 180,
        minWidth: 150,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    attendanceView: {
        borderRadius: 5,
        maxWidth: 350,
        backgroundColor: "#FFF",
        minWidth: 200,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
