import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Card, DataTable} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';

export const DailyStatusList = (props: any) => {
    const {rows, count, currentPage, type, onChangeSearch, search, onPageChange, itemPerPage, navigation} = props;
    const [searchText, setSearchText] = useState(search);


    useEffect(() => {
        setSearchText(search);
    }, [search]);

    const navigateToDetail = (id, type) => {
        navigation.navigate('DsrDetail', {id, type});
    };

    return (
        <Card style={styles.mainView}>
            <Searchbar placeholder="Search"
                       inputStyle={styles.searchBarViewStyle}
                       style={styles.searchBarInputStyle}
                       onChangeText={onChangeSearch}
                       value={searchText}/>

            <ScrollView horizontal={false} bounces={false}>
                <DataTable style={styles.dataTableStyle}>
                    {
                        (rows && rows.length > 0) ?
                            <>
                                {
                                    rows.map(({id, title, project_name, date, user_name}, index) => {
                                        return (
                                            <TouchableOpacity activeOpacity={1}
                                                              key={index}
                                                              onPress={() => navigateToDetail(id, type)}>
                                                <DataTable.Row>
                                                    {
                                                        (type === 'received') &&
                                                        <DataTable.Cell style={styles.dateNameStyle}>
                                                            <View>
                                                                <Text style={styles.userNameStyle}>
                                                                    {user_name ?? 'N-A'}
                                                                </Text>
                                                            </View>
                                                        </DataTable.Cell>
                                                    }
                                                    <DataTable.Cell style={styles.dateStyle}>
                                                        <View>
                                                            <Text style={styles.projectNameStyle}>
                                                                {project_name ?? 'N/A'}
                                                            </Text>
                                                            <Text numberOfLines={1} style={styles.projectTitleStyle}>
                                                                {title ?? 'N/A'}
                                                            </Text>
                                                        </View>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell textStyle={styles.textStyle}
                                                                    style={styles.statusDateStyle}
                                                                    numeric>
                                                        {(date && date.strftime('%d-%m-%Y')) ?? '-'}
                                                    </DataTable.Cell>
                                                </DataTable.Row>
                                            </TouchableOpacity>
                                        );
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
                        (count > itemPerPage) &&
                        <DataTable.Pagination page={currentPage - 1}
                                              numberOfPages={Math.ceil(count / itemPerPage)}
                                              onPageChange={onPageChange}
                                              label={`${((currentPage - 1) * itemPerPage + 1)} - ${(itemPerPage * currentPage) > count ? count : (itemPerPage * currentPage)} of ${Math.ceil(count)}`}
                                              itemsPerPage={itemPerPage}
                                              showFastPagination={true}
                                              showFastPaginationControls={(count > (itemPerPage * 2))}/>
                    }
                </DataTable>
            </ScrollView>
        </Card>
    );
};

const styles = StyleSheet.create({
    mainView: {
        margin: 5,
        backgroundColor: '#FFF',
        border: 1,
    },
    dataTableStyle: {
        marginTop: 5,
        width: '100%',
    },
    mainDataTableRow: {
        height: 50,
    },
    serialNumber: {
        flex: 1,
        maxWidth: 40,
    },
    dateNameStyle: {
        flex: 1,
        alignSelf: 'center',
    },
    statusDateStyle: {
        flex: 1,
        alignSelf: 'center',
    },
    dateStyle: {
        flex: 3,
        alignSelf: 'center',
    },
    headerTextStyle: {
        alignSelf: 'center',
        marginLeft: 10,
    },
    cardStyle: {
        marginTop: 20,
        margin: 5,
    },
    textStyle: {
        minWidth: 80,
        fontSize: 12,
        color: '#111111',
    },
    projectNameStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#111111',
    },
    userNameStyle: {
        maxWidth: 60,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#111111',
    },
    projectTitleStyle: {
        marginTop: 5,
        fontSize: 12,
        color: '#111111',
    },
    searchBarInputStyle: {
        width: '100%',
        height: 50,
    },
    searchBarViewStyle: {
        width: '100%',
    },
});
