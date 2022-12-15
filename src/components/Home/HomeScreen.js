import React from 'react';
import {Alert, Text, TouchableOpacity, StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AttendanceScreen, DashboardScreen, DsrScreen, WeeklyStatusScreen} from '..';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppDispatch} from '../../redux/hooks';
import {logoutUser} from '../../redux/slices';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OctIcons from 'react-native-vector-icons/Octicons';

const Tab = createBottomTabNavigator();

export const HomeScreen = (props: any) => {
    const {navigation} = props;
    const dispatch = useAppDispatch();
    const onLogoutHandle = () => {
        Alert.alert(
            'Logout',
            `Are you sure you want to logout?`,
            [
                {
                    text: 'Yes',
                    onPress: () => dispatch(logoutUser()),
                },
                {
                    text: 'No',
                },
            ],
            {cancelable: false},
        );
    };

    return (
        <>
            <StatusBar barStyle={'light-content'}/>
            <Tab.Navigator>
                <Tab.Screen name="Dashboard"
                            options={{
                                unmountOnBlur: true,
                                title: 'Dashboard',
                                headerRight: () => {
                                    return (
                                        <TouchableOpacity activeOpacity={1}
                                                          onPress={onLogoutHandle}>
                                            <MaterialIcons name="logout"
                                                           size={24}
                                                           color={'white'}
                                                           style={{marginRight: 15}}/>
                                        </TouchableOpacity>);
                                },
                                headerTintColor: '#FFFFFF',
                                headerStyle: {
                                    backgroundColor: '#172b4d',
                                },
                                tabBarIcon: (tabInfo) => {
                                    return (
                                        <Ionicons
                                            name="md-home"
                                            size={24}
                                            color={tabInfo.focused ? '#172b4d' : '#8e8e93'}
                                        />
                                    );
                                },
                                tabBarLabel: ({focused, color}) => (
                                    <Text style={{color: focused ? '#172b4d' : color}}>Home</Text>
                                ),
                                navigationBarColor: '#172b4d',
                            }}>
                    {(props) => <DashboardScreen {...props} mainNavigation={navigation}/>}
                </Tab.Screen>
                <Tab.Screen name="Attendance"
                            options={{
                                unmountOnBlur: true,
                                title: 'Attendance',
                                headerTintColor: '#FFFFFF',
                                headerStyle: {
                                    backgroundColor: '#172b4d',
                                },
                                tabBarIcon: (tabInfo) => {
                                    return (
                                        <FontAwesome5 name="address-card"
                                                      size={24}
                                                      color={tabInfo.focused ? '#172b4d' : '#8e8e93'}/>
                                    );
                                },
                                tabBarLabel: ({focused, color}) => (
                                    <Text style={{color: focused ? '#172b4d' : color}}>Attendance</Text>
                                ),
                                navigationBarColor: '#172b4d',
                            }}>
                    {(props) => <AttendanceScreen {...props} mainNavigation={navigation}/>}
                </Tab.Screen>
                <Tab.Screen name="DSR"
                            options={{
                                unmountOnBlur: true,
                                title: 'DsrScreen',
                                headerTintColor: '#FFFFFF',
                                headerShown: false,
                                headerStyle: {
                                    backgroundColor: '#172b4d',
                                },
                                tabBarIcon: (tabInfo) => <OctIcons name="repo"
                                                                   size={24}
                                                                   color={tabInfo.focused ? '#172b4d' : '#8e8e93'}/>,
                                tabBarLabel: ({focused, color}) => (
                                    <Text style={{color: focused ? '#172b4d' : color}}>Daily Status</Text>
                                ),
                                tabBarStyle: {
                                    display: 'none',
                                },
                                navigationBarColor: '#172b4d',
                            }}>
                    {(props) => <DsrScreen {...props} mainNavigation={navigation}/>}
                </Tab.Screen>
                <Tab.Screen name="WeeklyStatus"
                            options={{
                                unmountOnBlur: true,
                                title: 'Weekly Status Screen',
                                headerTintColor: '#FFFFFF',
                                headerShown: false,
                                headerStyle: {
                                    backgroundColor: '#172b4d',
                                },
                                tabBarIcon: (tabInfo) => <MaterialCommunityIcons name="list-status"
                                                                                 size={24}
                                                                                 color={tabInfo.focused ? '#172b4d' : '#8e8e93'}/>,
                                tabBarLabel: ({focused, color}) => (
                                    <Text style={{color: focused ? '#172b4d' : color}}>Weekly Status</Text>
                                ),
                                tabBarStyle: {
                                    display: 'none',
                                },
                                navigationBarColor: '#172b4d',
                            }}>
                    {(props) => <WeeklyStatusScreen {...props} mainNavigation={navigation}/>}
                </Tab.Screen>
            </Tab.Navigator>
        </>
    );
};
