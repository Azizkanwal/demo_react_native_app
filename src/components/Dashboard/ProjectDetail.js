import React from "react";
import {StyleSheet, View} from "react-native";
import {Avatar, Card, Paragraph, Title} from "react-native-paper";
import {useAppSelector} from "../../redux/hooks";

export const ProjectDetail = () => {
    const {
        total_assigned_projects,
        total_dsr_received,
        total_dsr_send,
        today_quote,
    } = useAppSelector((state) => state.dashboard);


    return (
        <View style={styles.mainView}>
            <Card style={styles.cardStyle}>
                <Card.Title title="TOTAL ASSIGNED PROJECTS"
                            subtitle={String(total_assigned_projects ?? 0)}
                            titleStyle={styles.cardTitleStyle}
                            subtitleStyle={styles.cardSubtitleStyle}
                            rightStyle={styles.assignedProjectIcon}
                            right={() => <Avatar.Icon size={40} backgroundColor={'#F55442'} icon="clipboard-text"/>}/>
            </Card>
            <Card style={styles.cardStyle}>
                <Card.Title title="TOTAL DSR SENT"
                            subtitle={String(total_dsr_send ?? 0)}
                            titleStyle={styles.cardTitleStyle}
                            subtitleStyle={styles.cardSubtitleStyle}
                            rightStyle={styles.assignedProjectIcon}
                            right={() => <Avatar.Icon size={40} backgroundColor={'#FB8A40'}
                                                      icon="database-arrow-right"/>}/>
            </Card>
            <Card style={styles.cardStyle}>
                <Card.Title title="TOTAL DSR RECEIVED"
                            subtitle={String(total_dsr_received ?? 0)}
                            titleStyle={styles.cardTitleStyle}
                            subtitleStyle={styles.cardSubtitleStyle}
                            rightStyle={styles.assignedProjectIcon}
                            right={() => <Avatar.Icon size={40} backgroundColor={'#2BCE9D'}
                                                      icon="database-arrow-left"/>}/>
            </Card>
            <Card style={styles.quoteCardStyle}>
                <Title style={styles.cardTitleStyle}>
                    QUOTE OF THE DAY
                </Title>
                <Paragraph style={styles.quoteSubtitleStyle}>
                    {today_quote ?? "The best way to predict the future is to create it."}
                </Paragraph>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {},
    cardStyle: {
        marginTop: 20,
        margin: 5,
    },
    cardTitleStyle: {
        marginTop: -5,
        fontSize: 12,
        color: '#8898A9'
    },
    cardSubtitleStyle: {
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
