import React, {useEffect, useRef} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {HomeScreen, LoginScreen} from "../components";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useAppSelector} from "../redux/hooks";
import {SafeAreaView} from "react-native-safe-area-context";
import {Dimensions, Image, StyleSheet, View} from "react-native";
import * as images from "../assets/images";
import {Provider} from "react-redux";

const Stack = createNativeStackNavigator();

const Routes = () => {
    const user = useAppSelector((state) => state.auth.user);
    const loading = useAppSelector((state) => state.loading.loader);
    let navigationRef = useRef();
    useEffect(() => {
        if (!user) {
            try {
                var current = navigationRef && navigationRef.current;
                if (current && current.isReady()) {
                    current.reset({ index: 0, routes: [{ name: 'Login' }]});
                }
            } catch (e) {

            }
        }
    }, [user])
    return (
        <SafeAreaView style={styles.displayFlex} pointerEvents={loading ? "none" : undefined}>
            {  loading &&
            <>
                <View style={styles.mainView}>
                </View>
                <View style={styles.loaderView}>
                    <Image source={images.LoadingGif} style={{width: 40, height: 40}}/>
                </View>
            </>
            }
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
                    <Stack.Screen name="Login"
                                  component={LoginScreen}
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="Home"
                                  component={HomeScreen}
                                  options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    displayFlex: {
        flex: 1
    },
    mainView: {
        elevation: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        opacity: 0.2,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
    },
    loaderView: {
        elevation: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999999,
    },
});

export default Routes;
