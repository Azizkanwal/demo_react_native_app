import React, {useState} from "react";
import {StyleSheet, TextInput, View, TouchableOpacity, Text, Image, StatusBar} from "react-native";
import * as images from '../../assets/images'
import {useAppDispatch} from "../../redux/hooks";
import {login} from "../../redux/slices";
import Toast from 'react-native-toast-message';
import {Button} from "react-native-paper";
import {convertError, validateEmail} from "../../helper/convertError";
import {SafeAreaView} from "react-native-safe-area-context";

export const LoginScreen = (props: any) => {
    const {navigation} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({email: '', password: ''});
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const validate = () => {
        let error = false;
        setError(prevState => ({...prevState, email: '', password: ''}));
        if (email.length === 0) {
            setError(prevState => ({...prevState, email: "Email is required"}));
            setError(prevState => ({...prevState, email: convertError('email.required')}));
            error = true;
        } else if (!validateEmail(email)) {
            setError(prevState => ({...prevState, email: convertError('email.invalid')}));
            error = true;
        }
        if (password.length === 0) {
            setError(prevState => ({...prevState, password: convertError('password.required')}));
            error = true;
        }
        return !error;
    }

    const resetErrorMessage = (name) => {
        setError(prevState => ({...prevState, [name]: ""}))
    }

    const loginUser = async () => {
        if (!validate()) return null;
        await setLoading(true);
        await dispatch(login(email, password, (status, data) => {
            if (status) {
                navigation.replace('Home');
                Toast.show({type: 'success', text1: 'Logged In Successfully'});
            } else {
                Toast.show({type: 'error', text1: data.message});
            }
        }));
        await setLoading(false);
    }

    return (
        <>
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.mainView}>
                    <View style={styles.containerView}>
                        <View style={styles.headerLogo}>
                            <Image style={styles.logo} source={images.LogoSvg}/>
                        </View>
                        <Text style={styles.headerText}>LOGIN TO YOUR ACCOUNT</Text>
                        <View style={styles.inputView}>
                            <Text style={styles.textLabel}>Email Address</Text>
                            <TextInput style={[styles.textInput, {borderColor: error.email ? 'red' : 'black'}]}
                                       placeholder="Email"
                                       autoComplete={'email'}
                                       autoCapitalize={'none'}
                                       placeholderTextColor={"#A9A9A9"}
                                       editable={!loading}
                                       autoCorrect={false}
                                       selectTextOnFocus={false}
                                       keyboardType={"email-address"}
                                       onFocus={() => resetErrorMessage('email')}
                                       onChangeText={(email) => setEmail(email)}/>
                            {error.email && <Text style={styles.errorText}>{error.email}</Text>}
                        </View>

                        <View style={styles.inputView}>
                            <Text style={styles.textLabel}>Password</Text>
                            <TextInput style={[styles.textInput, {borderColor: error.password ? 'red' : 'black'}]}
                                       placeholder="Password"
                                       placeholderTextColor={"#A9A9A9"}
                                       secureTextEntry={true}
                                       editable={!loading}
                                       selectTextOnFocus={false}
                                       onFocus={() => resetErrorMessage('password')}
                                       onChangeText={(password) => setPassword(password)}/>
                            {error.password && <Text style={styles.errorText}>{error.password}</Text>}
                        </View>

                        {/*<View style={styles.forgotPasswordView}>*/}
                        {/*    <TouchableOpacity disabled={loading}>*/}
                        {/*        <Text style={styles.forgotButton}>Forgot Password?</Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*</View>*/}

                        <TouchableOpacity activeOpacity={1} onPress={loginUser}>
                            <Button icon={loading ? "loading" : ''}
                                    style={styles.loginBtn}
                                    loading={loading}
                                    color={'#05b1c5'}
                                    disabled={loading}
                                    labelStyle={{fontSize: 16}}
                                    mode="contained">
                                LOGIN
                            </Button>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};


const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        // backgroundColor: "#172b4d",
        backgroundColor: "#FFFFFF",
    },
    mainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFFFFF",
    },
    headerLogo: {
        alignItems: 'center',
        minHeight: 100,
        maxHeight: 120,
        marginBottom: 20,
    },
    logo: {
        flex: 1,
        resizeMode: 'contain',
        minHeight: 50,
        maxHeight: 110,
        aspectRatio: 180/5,
        maxWidth: "100%",
    },
    containerView: {
        width: "80%"
    },
    inputView: {
        marginBottom: 20,
    },
    headerText: {
        alignSelf: 'center',
        fontWeight: '500',
        fontSize: 20,
        textTransform: 'uppercase',
        marginBottom: 20,
        color: "#172b4d",
    },
    textLabel: {
        color: "#111111",
        marginBottom: 5,
        fontSize: 16,
    },
    textInput: {
        width: '100%',
        height: 40,
        borderRadius: 5,
        fontSize: 16,
        padding: 5,
        backgroundColor: "#FFF",
        color: "#111111",
        borderWidth: 1,
        borderColor: "#111111",
    },
    forgotPasswordView: {
        alignSelf: 'flex-end'
    },
    forgotButton: {
        fontSize: 16,
        color: '#05b1c5',
        height: 30,
        alignContent: 'flex-end'
    },
    loginBtn: {
        width: '100%',
        borderRadius: 5,
        justifyContent: "center",
    },
    loginText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: 'bold'
    },
    errorText: {
        color: "red",
        marginTop: 5,
        fontSize: 14,
    }
});
