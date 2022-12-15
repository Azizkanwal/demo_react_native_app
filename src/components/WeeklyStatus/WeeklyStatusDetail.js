import React, {useEffect, useState} from "react";
import {StyleSheet, View, StatusBar, Text, ScrollView, BackHandler} from "react-native";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getReceivedWeeklyStatusDetail, getSendWeeklyStatusDetail, startLoader, stopLoader} from "../../redux/slices";
import {Card} from "react-native-paper";
import {CustomHeader} from "../../helper/header";
import {SafeAreaView} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export const WeeklyStatusDetailScreen = (props: any) => {
    const {navigation, route} = props;
    const {params: {id, type}} = route;
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => (type === "send" ? state.statusReport.sendWeeklyStatusReportDetail : state.statusReport.receivedWeeklyStatusReportDetail));

    useEffect(() => {
        async function fetchData() {
            await dispatch(startLoader());
            await getData();
            await dispatch(stopLoader());
        }
        fetchData();

        BackHandler.addEventListener('hardwareBackPress', navigateGoBack)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', navigateGoBack)
        }
    }, []);

    const navigateGoBack = () => {
        const screenName = type === "send" ? "SendWeeklyStatus" : "ReceivedWeeklyStatus"
        navigation.navigate(screenName);
        return true;
    }

    const getData = async () => {
        await setLoading(true);
        if (type === "send") {
            await dispatch(getSendWeeklyStatusDetail(id,renderResponseMessage));
        } else {
            await dispatch(getReceivedWeeklyStatusDetail(id,renderResponseMessage));
        }
        await setLoading(false);
    }

    const renderResponseMessage = (success, response) => {
        if (!success) {
            navigateGoBack();
            Toast.show({type: 'error', isVisible: true, text1: response.message, visibilityTime: 4000, position: 'top'})
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#172b4d'}}>
            <StatusBar backgroundColor="#172b4d"/>
            <View style={styles.mainView}>
                <CustomHeader onPress={navigateGoBack} title={'Weekly Status Detail'}/>
                <ScrollView bounces={false}>
                    <View style={styles.containerView}>
                        <Text style={styles.dailyStatusText}>
                            Weekly Status Detail
                        </Text>
                    </View>
                    {
                        data &&
                        <View style={styles.dailyStatusDetailList}>
                            <Card style={styles.cardView}>
                                <ScrollView horizontal={false} bounces={false}>
                                    {
                                        data.weekly_status_reports && data.weekly_status_reports.map((reportDetail, index) => {
                                            const { project_name, description } = reportDetail;
                                            return (
                                                <View key={index} style={styles.bottomView}>
                                                    <Card.Title title={`Project: ${project_name ?? "N/A"}`}
                                                                titleStyle={styles.titleStyle}/>
                                                    <View style={styles.statusViewStyle}>
                                                        <Text style={styles.descriptionStyle}>
                                                            {description}
                                                        </Text>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                    {
                                        type === "send" ?
                                        <View style={styles.bottomView}>
                                            <Text style={styles.emailDetail}>
                                                <Text style={styles.fontBold}>To</Text>: {data.to_details ?? '-'}
                                            </Text>
                                            {
                                                data.cc_details.length > 0 &&
                                                <Text style={styles.emailDetail}>
                                                    <Text style={styles.fontBold}>Cc</Text>: {data.cc_details ?? "-"}
                                                </Text>
                                            }
                                        </View>
                                            :
                                        <View style={styles.bottomView}>
                                            <Text style={styles.emailDetail}>
                                                <Text style={styles.fontBold}>
                                                    Sender
                                                </Text>: {data?.user_name} ({data?.user_email})
                                            </Text>
                                        </View>
                                    }
                                </ScrollView>
                            </Card>
                        </View>
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
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
    dailyStatusDetailList: {
        marginTop: -90,
        marginBottom: 20,
        padding: 10,
        minHeight: 100,
    },
    dailyStatusText: {
        color: '#FFF',
        margin: 5,
        fontSize: 20,
        marginBottom: 10
    },
    cardView: {
        margin: 5,
        backgroundColor: "#FFF",
        border: 1,
    },
    bottomView: {
        borderTopWidth: 1,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    statusViewStyle: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    titleStyle: {
        marginLeft: -10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#32325d'
    },
    taskStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#32325d'
    },
    emailDetail: {
        fontSize: 14,
        marginBottom: 5,
        color: "#111111"
    },
    fontBold: {
        fontWeight: 'bold',
    },
    descriptionStyle: {
        fontSize: 14,
        marginTop: 5,
        marginBottom: 10,
        color: "#111111"
    },
    timeEstimateView: {
        marginLeft: -10,
        marginRight: -10,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        backgroundColor: "#eee",
        minHeight: 30,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});


