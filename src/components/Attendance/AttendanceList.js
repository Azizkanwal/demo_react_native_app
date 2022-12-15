import React, {useEffect, useState} from "react";
import {StyleSheet, View, Text, ScrollView} from "react-native";
import {DataTable, Card, Title} from "react-native-paper";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getAttendancesData, startLoader, stopLoader} from "../../redux/slices";

export const AttendanceList = (props: any) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const itemPerPage = 10;
    const {rows, count, currentPage} = useAppSelector((state) => state.attendance.attendances);
    const statusNames = { is_working: "Working", is_absent: "Absent", is_present: "Present", on_leave: "Leave" }

    useEffect(() => {
        async function loadData() {
            await dispatch(startLoader());
            await onPageChange(0);
            await dispatch(stopLoader());
        }

        loadData();
    }, []);


    const onPageChange = async (page) => {
        await setLoading(true);
        await dispatch(getAttendancesData({page: page + 1, items: 10}));
        await setLoading(false);
    }

    return (
        <Card style={styles.mainView}>
            <Card.Title title={'Attendance List'} titleStyle={styles.titleStyle}/>
            <ScrollView horizontal={false} bounces={false}>
                <DataTable style={styles.dataTableStyle}>
                    <DataTable.Row>
                        <DataTable.Title style={styles.serialNumber}>
                            <Text>Sr No</Text>
                        </DataTable.Title>
                        <DataTable.Title style={styles.dateStyle}>
                            <Text>   Date</Text>
                        </DataTable.Title>
                        <DataTable.Title style={styles.timeInStyle}>
                            <Text> Time In  </Text>
                        </DataTable.Title>
                        <DataTable.Title style={styles.timeOutStyle}>
                            <Text> Time Out </Text>
                        </DataTable.Title>
                        <DataTable.Title numeric style={styles.statusStyle}>
                            <Text>Status</Text>
                        </DataTable.Title>
                    </DataTable.Row>
                    {
                        (rows && rows.length > 0) ?
                            <>
                                {
                                    rows.map(({date, time_in, time_out, status}, index) => {
                                        return (
                                            <DataTable.Row key={index}>
                                                <DataTable.Cell textStyle={styles.textStyle}
                                                                style={styles.serialNumber}>
                                                    {index + 1 + ((currentPage - 1) * 10)}
                                                </DataTable.Cell>
                                                <DataTable.Cell textStyle={styles.textStyle} style={styles.dateStyle}>
                                                    {(date && date.strftime("%d-%m-%Y")) ?? "-"}
                                                </DataTable.Cell>
                                                <DataTable.Cell textStyle={styles.textStyle} style={styles.timeInStyle}>
                                                    {(time_in && time_in.strftime("%h:%M %P")) ?? "-"}
                                                </DataTable.Cell>
                                                <DataTable.Cell textStyle={styles.textStyle} style={styles.timeOutStyle}>
                                                    {(time_out && time_out.strftime("%h:%M %P")) ?? "-"}
                                                </DataTable.Cell>
                                                <DataTable.Cell textStyle={styles.textStyle} style={styles.statusStyle}
                                                                numeric>
                                                    {(status && statusNames[status]) ?? "-"}
                                                </DataTable.Cell>
                                            </DataTable.Row>)
                                    })
                                }
                            </>
                            :
                            <>
                                <DataTable.Row>
                                    <DataTable.Cell textStyle={styles.textStyle}>No Record Found</DataTable.Cell>
                                </DataTable.Row>
                            </>
                    }
                    {
                        count > 10 &&
                        <DataTable.Pagination page={currentPage - 1}
                                              numberOfPages={Math.ceil(count / itemPerPage)}
                                              onPageChange={onPageChange}
                                              label={`${((currentPage - 1) * 10 + 1)} - ${(itemPerPage * currentPage) > count ? count : (itemPerPage * currentPage)} of ${Math.ceil(count)}`}
                                              itemsPerPage={itemPerPage}
                                              showFastPagination={true}
                                              showFastPaginationControls={count > 20}/>
                    }
                </DataTable>
            </ScrollView>
        </Card>
    );
};

const styles = StyleSheet.create({
    mainView: {
        margin: 5,
        backgroundColor: "#FFF",
        border: 1,
    },
    dataTableStyle: {
        width: "100%",
    },
    serialNumber: {
        flex: 1,
        maxWidth: 40
    },
    dateStyle: {
        flex: 3,
        alignSelf: 'center',
    },
    timeInStyle: {
        alignSelf: 'center',
        flex: 2,
    },
    timeOutStyle: {
        alignSelf: 'center',
        flex: 2,
    },
    statusStyle: {
        alignSelf: 'center',
        flex: 2,
    },
    headerTextStyle: {
        alignSelf: 'center',
        marginLeft: 10,
    },
    cardStyle: {
        marginTop: 20,
        margin: 5,
    },
    titleStyle: {
        fontSize: 16,
    },
    textStyle: {
        fontSize: 12,
        color: '#111111'
    },
    quoteCardStyle: {
        marginTop: 20,
        margin: 5,
        padding: 15
    },
    quoteSubtitleStyle: {
        fontSize: 12,
        color: '#111111',
        fontStyle: 'italic'
    },
    assignedProjectIcon: {
        marginRight: 10,
    }
});
