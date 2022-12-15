import React from "react";
import {StyleSheet, View,} from "react-native";
import {DataTable, Card, Title} from "react-native-paper";
import {useAppSelector} from "../../redux/hooks";

export const UpcomingBirthdays = (props: any) => {
    const { upcoming_birthdays } = useAppSelector((state) => state.dashboard);
    return (
        <Card style={styles.mainView}>
            <Card.Title title={'Upcoming Birthdays'} titleStyle={styles.cardStyle}/>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Sr No</DataTable.Title>
                    <DataTable.Title>Employee Name</DataTable.Title>
                    <DataTable.Title numeric>Date</DataTable.Title>
                </DataTable.Header>
                {
                    (upcoming_birthdays && upcoming_birthdays.length > 0) ?
                        <>
                            {
                                upcoming_birthdays.map((user, index)=>{
                                    return(
                                        <DataTable.Row key={index}>
                                            <DataTable.Cell textStyle={styles.textStyle}>
                                                {index+1}
                                            </DataTable.Cell>
                                            <DataTable.Cell textStyle={styles.textStyle}>
                                                {`${user.first_name ?? ""}${user.last_name ? " " : ""}${user.last_name ?? ""}`}
                                            </DataTable.Cell>
                                            <DataTable.Cell textStyle={styles.textStyle} numeric>
                                                {`${user.dob ?? ""}`}
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    )
                                })
                            }
                        </>
                        :
                        <DataTable.Row>
                            <DataTable.Cell textStyle={styles.textStyle}>No Record Found</DataTable.Cell>
                        </DataTable.Row>
                }
            </DataTable>
        </Card>
    );
};

const styles = StyleSheet.create({
    mainView: {
        margin: 5,
        backgroundColor: "#FFF",
        border: 1,
    },
    cardStyle: {
        fontSize: 16
    },
    titleStyle: {
        fontSize: 16,
    },
    textStyle: {
        fontSize: 12
    }
});
