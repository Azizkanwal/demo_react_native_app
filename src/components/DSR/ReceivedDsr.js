import React, {useEffect, useState} from "react";
import {StyleSheet, View, StatusBar, Text, ScrollView} from "react-native";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getReceivedDailyStatusReports, startLoader, stopLoader} from "../../redux/slices";
import {DailyStatusList} from "./DailyStatusList";
import Toast from "react-native-toast-message";

export const ReceivedDsrScreen = (props: any) => {
    const { navigation } = props;
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const itemPerPage = 10;
    const dispatch = useAppDispatch();
    const {rows, count, currentPage} = useAppSelector((state) => state.statusReport.receivedDailyStatusReports);

    const renderResponseMessage = (success, response) => {
        if (!success) {
            Toast.show({type: 'error', isVisible: true, text1: response.message, visibilityTime: 4000, position: 'top'})
        }
    }

    useEffect(() => {
        async function fetchData() {
            await dispatch(startLoader());
            await onPageChange(0);
            await dispatch(stopLoader());
        }
        fetchData();
    }, []);

    const onPageChange = async (page) => {
        await setLoading(true);
        await dispatch(getReceivedDailyStatusReports({page: page + 1, items: itemPerPage},renderResponseMessage));
        await setLoading(false);
    }


    return (
        <View style={styles.mainView}>
            <ScrollView bounces={false}>
                <View style={styles.containerView}>
                    <Text style={styles.dailyStatusText}>
                        Daily Status Received List
                    </Text>
                </View>
                <View style={styles.dailyStatusList}>
                    <DailyStatusList type={'received'}
                                     navigation={navigation}
                                     onChangeSearch={setSearch}
                                     search={search}
                                     rows={rows}
                                     count={count}
                                     onPageChange={onPageChange}
                                     itemPerPage={itemPerPage}
                                     currentPage={currentPage}/>
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
        paddingBottom: 80,
    },
    dailyStatusList: {
        padding: 10,
        marginTop: -70,
        minHeight: 100,
    },
    dailyStatusText: {
        color: '#FFF',
        margin: 5,
        fontSize: 20,
        marginBottom: 10
    }
});

