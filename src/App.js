import React from 'react';
import {Provider} from 'react-redux';
import {StyleSheet, View} from 'react-native';

import {store} from './redux/store';
import {persistStore} from "redux-persist";
import {PersistGate} from 'redux-persist/integration/react';
import Routes from "./Routes";
import './helper/timeConversion';
import Toast from "react-native-toast-message";
import { LogBox } from 'react-native';

const persistor = persistStore(store);

//Ignore all log notifications
LogBox.ignoreAllLogs();
const App: () => Node = () => {
    return (
        <Provider store={store}>
            <View style={styles.topView}>
                <Toast/>
            </View>
            <PersistGate loading={null} persistor={persistor}>
                <Routes />
            </PersistGate>
        </Provider>
    )
}

const styles = StyleSheet.create({
    topView: {
        zIndex: 99999,
        width: '100%',
        position: 'absolute',
        top: 100,
        elevation: 10,
    }
});


export default App;
