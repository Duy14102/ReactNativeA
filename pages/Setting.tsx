import { SafeAreaView, View, Text, StyleSheet, ScrollView, TextInput, Dimensions, ImageBackground, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import Header from "../component/Header"
import Footer from "../component/Footer"
import { useState, useEffect } from "react"
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios';
import { jwtDecode } from "jwt-decode"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from "base-64";
global.atob = decode

function Setting({ navigation }: { navigation: any }) {
    const [candecode, setCandecode] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [testEmail, setTestEmail] = useState(false)
    const [seePassword, setSeePassword] = useState(false)
    const [islogin, setIsLogin] = useState(false)
    var emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN');
            if (token) {
                setCandecode(jwtDecode(token))
            } else {
                setCandecode(null)
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (username !== "") {
            if (!emailTest.test(username)) {
                setTestEmail(true)
            } else {
                setTestEmail(false)
            }
        }
    }, [username])

    const handleSubmit = () => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/Login",
            data: {
                email: username,
                password: password,
            },
        }
        if (testEmail) {
            return false
        }
        setIsLogin(true)
        setTimeout(() => {
            axios(configuration)
                .then(async (result) => {
                    setIsLogin(false)
                    const jsonValue = JSON.stringify(result.data.token);
                    await AsyncStorage.setItem('TOKEN', jsonValue);
                    getData()
                })
                .catch((err) => {
                    console.log(err);

                });
        }, 1000)
    }

    const logoutThis = async () => {
        try {
            await AsyncStorage.clear();
            setCandecode(null)
        } catch (e) {
            console.log(e);
        }
    }

    const BgImage = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700307517/UI/e4onxrx7hmgzmrbel9jk.webp" }
    const google = { uri: "https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
                <Header />
                <View style={settingStyle.container}>
                    {candecode ? (
                        <>
                            <TouchableOpacity onPress={() => logoutThis()}>
                                <Text>Logout</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <ImageBackground source={BgImage} style={settingStyle.bgimage} />
                            <View style={settingStyle.borderLog}>
                                <View style={settingStyle.insideLog}>
                                    <Text style={settingStyle.loginText}>Login</Text>
                                    <View style={settingStyle.fatherInput}>
                                        <Text style={settingStyle.mochText}>Email</Text>
                                        <View style={{ backgroundColor: "rgb(243 244 246)", borderRadius: 10, }}>
                                            <TextInput style={{ width: "100%" }} value={username} onChange={(e) => setUsername(e.nativeEvent.text)} />
                                        </View>
                                        {username !== "" ? (
                                            testEmail ? (
                                                <Text style={{ paddingLeft: 10, color: "red" }}>Email is invalid!</Text>
                                            ) : null
                                        ) : null}
                                        <Text style={[settingStyle.mochText, { paddingTop: 15 }]}>Password</Text>
                                        <View style={{ backgroundColor: "rgb(243 244 246)", borderRadius: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <TextInput style={{ width: "90%" }} secureTextEntry={seePassword ? false : true} onChange={(e) => setPassword(e.nativeEvent.text)} />
                                            {seePassword ? (
                                                <TouchableOpacity style={{ width: "10%" }} onPress={() => setSeePassword(false)}>
                                                    <Icon name="eye-slash" style={{ width: "100%", fontSize: 18 }} />
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity style={{ width: "10%" }} onPress={() => setSeePassword(true)}>
                                                    <Icon name="eye" style={{ width: "100%", fontSize: 18 }} />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        <TouchableOpacity style={{ alignItems: "flex-end", marginBottom: 25 }}>
                                            <Text style={{ fontSize: 15, paddingTop: 5 }}>Forgot password ?</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={settingStyle.loginButton} onPress={() => handleSubmit()}>
                                            {islogin ? (
                                                <ActivityIndicator size="large" color={"#fff"} />
                                            ) : (
                                                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Login</Text>
                                            )}
                                        </TouchableOpacity>
                                        <Text style={{ textAlign: "center", paddingVertical: 20, fontSize: 20, fontWeight: "bold", color: "#0F172B" }}>Or</Text>
                                        <TouchableOpacity style={{ alignItems: "center", paddingBottom: 20 }}>
                                            <Image source={google} style={{ width: 49, height: 50 }} />
                                        </TouchableOpacity>
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10, justifyContent: "center" }}>
                                            <Text style={{ fontSize: 15 }}>Don't have an account?</Text>
                                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                                <Text style={{ color: "#FEA116", fontSize: 15 }}>Sign up</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </>
                    )}
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

const settingStyle = StyleSheet.create({
    container: {
        flex: 1,
    },

    loginText: {
        color: "#0F172B",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center"
    },

    borderLog: {
        borderWidth: 1,
        alignItems: "center",
        paddingVertical: 15,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(15, 23, 43, .9)',
    },

    insideLog: {
        backgroundColor: "#fff",
        top: "35%",
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingVertical: 25
    },

    fatherInput: {
        paddingTop: 15,
        paddingHorizontal: 15,
        width: "100%"
    },

    mochText: {
        color: "#0F172B",
        paddingLeft: 10,
        paddingBottom: 5,
        fontSize: 15,
    },

    bgimage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 0.9,
        resizeMode: "cover",
        backgroundColor: "black",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
    },

    loginButton: {
        alignItems: "center",
        backgroundColor: "#FEA116",
        paddingVertical: 12,
        borderRadius: 10
    }
})
export default Setting