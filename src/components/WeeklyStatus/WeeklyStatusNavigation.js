import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AddWeeklyStatus} from './AddWeeklyStatus';
import {SendWeeklyStatusScreen} from './SendWeeklyStatus';
import {ReceivedWeeklyStatusScreen} from './ReceivedWeeklyStatus';
import EnTypo from 'react-native-vector-icons/Entypo';
import {WeeklyStatusDetailScreen} from './WeeklyStatusDetail';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export const WeeklyStatusScreen = (props: any) => {
    const {navigation, route} = props;
    const [lastRoute, setLastRoute] = useState(getFocusedRouteNameFromRoute(route));

    useEffect(() => {
        let routeName = getFocusedRouteNameFromRoute(route);
        if (lastRoute !== routeName) {
            setLastRoute(routeName);
        }
    }, [route]);

    const navigateBack = () => {
        navigation.goBack();
    };

    const navigationChange = () => {
        navigation.jumpTo(lastRoute);
    };

    return (
        <Tab.Navigator initialRouteName={'AddStatus'}>
            <Tab.Screen name="AddStatus"
                        options={{
                            unmountOnBlur: true,
                            title: 'Add Weekly Status',
                            headerTintColor: '#FFFFFF',
                            headerStyle: {
                                backgroundColor: '#172b4d',
                            },
                            headerLeft: (na) => <BackButton onPress={() => navigateBack(na)}/>,
                            tabBarIcon: (tabInfo) => <EnTypo name="plus"
                                                             size={24}
                                                             color={tabInfo.focused ? '#172b4d' : '#8e8e93'}/>,
                            tabBarLabel: ({focused, color}) => (
                                <Text style={{color: focused ? '#172b4d' : color}}>Add Status</Text>
                            ),
                            navigationBarColor: '#172b4d',
                        }}>
                {(props) => <AddWeeklyStatus {...props}/>}
            </Tab.Screen>
            <Tab.Screen name="SendWeeklyStatus"
                        component={SendWeeklyStatusScreen}
                        options={{
                            unmountOnBlur: true,
                            title: 'Send Weekly Status',
                            headerTintColor: '#FFFFFF',
                            headerStyle: {
                                backgroundColor: '#172b4d',
                            },
                            headerLeft: () => <BackButton onPress={navigateBack}/>,
                            tabBarIcon: (tabInfo) => <EnTypo name="paper-plane"
                                                             size={24}
                                                             color={tabInfo.focused ? '#172b4d' : '#8e8e93'}/>,
                            tabBarLabel: ({focused, color}) => (
                                <Text style={{color: focused ? '#172b4d' : color}}>Send Status</Text>
                            ),
                            navigationBarColor: '#172b4d',
                        }}/>
            <Tab.Screen name="ReceivedWeeklyStatus"
                        component={ReceivedWeeklyStatusScreen}
                        options={{
                            unmountOnBlur: true,
                            title: 'Received Weekly Status',
                            headerTintColor: '#FFFFFF',
                            headerStyle: {
                                backgroundColor: '#172b4d',
                            },
                            headerLeft: () => <BackButton onPress={navigateBack}/>,
                            tabBarIcon: (tabInfo) => <EnTypo name="database" size={24}
                                                             color={tabInfo.focused ? '#172b4d' : '#8e8e93'}/>,
                            tabBarLabel: ({focused, color}) => (
                                <Text style={{color: focused ? '#172b4d' : color}}>Received Status</Text>
                            ),
                            navigationBarColor: '#172b4d',
                        }}/>
            <Tab.Screen name="WeeklyStatusDetail"
                        component={WeeklyStatusDetailScreen}
                        options={{
                            unmountOnBlur: true,
                            title: 'Weekly Status Detail',
                            headerShown: false,
                            tabBarVisible: false, //like this
                            headerTintColor: '#FFFFFF',
                            headerStyle: {
                                backgroundColor: '#172b4d',
                            },
                            tabBarStyle: {
                                display: 'none',
                            },
                            headerLeft: () => <BackButton onPress={navigationChange}/>,
                            tabBarButton: (props) => null,
                            navigationBarColor: '#172b4d',
                        }}/>
        </Tab.Navigator>
    );
};

const BackButton = ({onPress}) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <Ionicons size={24}
                      style={styles.backButton}
                      name="arrow-back"
                      color={'#FFFFFF'}/>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
        backButton: {
            marginLeft: 5,
        },
    },
);

