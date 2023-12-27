import { SafeAreaView, View, Text, StyleSheet, ScrollView, TextInput, Dimensions, ImageBackground, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from "react-native"
import Header from "../component/Header"
import Footer from "../component/Footer"
import { useState, useEffect } from "react"
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios';
import { jwtDecode } from "jwt-decode"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import LinearGradient from 'react-native-linear-gradient'
import config from "../config"

function Setting({ route, navigation }: { route: any, navigation: any }) {
    GoogleSignin.configure({
        webClientId: config.REACT_APP_googleClientId,
        scopes: ['profile', 'email'],
    });
    const [candecode, setCandecode] = useState<any>(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [testEmail, setTestEmail] = useState(false)
    const [seePassword, setSeePassword] = useState(false)
    const [islogin, setIsLogin] = useState(false)
    const [islogout, setIsLogout] = useState(false)
    const [refresh, setFresh] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loadGoogle, setLoadGoogle] = useState(false)
    const [googleFail, setGoogleFail] = useState(false)
    const [user, setUser] = useState<any>()
    var emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            getData()
            setGoogleFail(false)
            setUsername("")
            setPassword("")
            setFresh(false)
        }, 1000)
    }

    useEffect(() => {
        if (success) {
            setSeePassword(false)
            setUsername("")
            setPassword("")
            setSuccess(false)
        }
    }, [success])

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
        if (candecode) {
            if (candecode.userRole !== 1.5) {
                const configuration = {
                    method: "get",
                    url: "http://localhost:3000/GetDetailUser",
                    params: {
                        userid: candecode.userId
                    },
                }
                axios(configuration)
                    .then((res) => {
                        setUser(res.data.data)
                    }).catch((er) => {
                        console.log(er);
                    })
            }
        }
    }, [candecode])

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
                    setSuccess(true)
                    const decode: any = jwtDecode(result.data.token)
                    const jsonValue = JSON.stringify(result.data.token);
                    await AsyncStorage.setItem('TOKEN', jsonValue);
                    if (decode.userRole === 4) {
                        navigation.navigate("Admin")
                    }
                    else if (decode.userRole === 3) {
                        navigation.navigate("Manager")
                    }
                    else if (decode.userRole === 2) {
                        navigation.navigate("Employee")
                    } else {
                        getData()
                    }
                })
                .catch((err) => {
                    setIsLogin(false)
                    console.log(err);

                });
        }, 1000)
    }

    const logoutThis = async () => {
        setIsLogout(true)
        try {
            await AsyncStorage.removeItem("TOKEN");
            setTimeout(() => {
                setIsLogout(false)
                setCandecode(null)
            }, 1000)
        } catch (e) {
            setTimeout(() => {
                setIsLogout(false)
            }, 1000)
            console.log(e);
        }
    }

    async function logoutGoogle() {
        setIsLogout(true)
        try {
            await GoogleSignin.signOut();
            await AsyncStorage.removeItem("TOKEN");
            setTimeout(() => {
                setIsLogout(false)
                setCandecode(null)
            }, 1000)
            // Perform additional cleanup and logout operations.
        } catch (error) {
            setIsLogout(false)
            console.log('Google Sign-Out Error: ', error);
        }
    }

    const signInGoogle = async () => {
        try {
            setLoadGoogle(true)
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            if (userInfo) {
                const checkToke = {
                    method: 'get',
                    url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${userInfo.idToken}`,
                    withCredentials: true,
                }
                await axios(checkToke)
                    .then(() => {
                        const configuration9 = {
                            method: "get",
                            url: "http://localhost:3000/LoginWithGoogle",
                            params: {
                                id: userInfo.user.id,
                                name: userInfo.user.name,
                                email: userInfo.user.email,
                                picture: userInfo.user.photo
                            }
                        }
                        axios(configuration9).then(async (result) => {
                            setLoadGoogle(false)
                            const jsonValue = JSON.stringify(result.data.token);
                            await AsyncStorage.setItem('TOKEN', jsonValue);
                            getData()
                        }).catch((err) => {
                            setLoadGoogle(false)
                            console.log(err)
                        })
                    }).catch((err) => { setLoadGoogle(false); setGoogleFail(true) })
            }
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("cancel");
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("in progress");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("failed");
            } else {
                console.log("other");
            }
        }
    };

    const BgImage = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700307517/UI/e4onxrx7hmgzmrbel9jk.webp" }
    const google = { uri: "https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" }
    const imgUser = "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                {candecode ? (
                    <>
                        <LinearGradient
                            colors={['#0F172B', "#445377", "#8a97b6", "#fff"]}
                            style={settingStyle.header}
                            locations={[0, 0.4, 0.66, 1]}
                        >
                            <View style={settingStyle.textLogo}>
                                <Icon style={settingStyle.textDisplay} name="utensils" />
                                <Text style={[settingStyle.textDisplay, { fontWeight: "bold" }]}>EatCom</Text>
                            </View>
                        </LinearGradient>
                        <View style={settingStyle.container}>
                            <View style={{ position: "relative", height: 770 }}>
                                <View style={{ paddingHorizontal: 15, position: "absolute", width: "100%", top: -15 }}>
                                    <TouchableOpacity style={settingStyle.coverIt} onPress={() => navigation.navigate('UserDetail', { candecode: candecode })}>
                                        <View style={{ flexDirection: "row", gap: 10 }}>
                                            {user?.userimage ? (
                                                <Image source={{ uri: user?.userimage }} height={50} width={50} borderRadius={50} />
                                            ) : (
                                                candecode.userRole === 1.5 ? (
                                                    <Image source={{ uri: candecode.userImage }} height={50} width={50} borderRadius={50} />
                                                ) : (
                                                    <Image source={{ uri: imgUser }} height={50} width={50} borderRadius={50} />
                                                )
                                            )}
                                            <View>
                                                {candecode.userRole === 1.5 ? (
                                                    <>
                                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{candecode.userName}</Text>
                                                        <Text style={{ fontSize: 15 }}>Google account</Text>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{user?.fullname}</Text>
                                                        <Text style={{ fontSize: 15 }}>{user?.phonenumber}</Text>
                                                    </>
                                                )}
                                            </View>
                                        </View>
                                        <Icon name="edit" style={{ fontSize: 20 }} />
                                    </TouchableOpacity>
                                    <View style={{ marginVertical: 20 }}>
                                        <Text style={{ paddingBottom: 5, paddingLeft: 5, fontSize: 15, fontWeight: "bold" }}>Order management</Text>
                                        <View style={settingStyle.coverIt2}>
                                            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 5 }} onPress={() => navigation.navigate("ActiveCart", { userid: candecode.userId })}>
                                                <View style={{ flexDirection: "row", gap: 10 }}>
                                                    <Icon name="shopping-cart" color={"#0F172B"} size={18} />
                                                    <Text style={{ fontSize: 15 }}>Active order</Text>
                                                </View>
                                                <Text style={{ fontWeight: "bold" }}>ᐳ</Text>
                                            </TouchableOpacity>
                                            <View
                                                style={{
                                                    borderBottomColor: 'gray',
                                                    borderBottomWidth: 1,
                                                    opacity: 0.5,
                                                    left: 5,
                                                    right: 5,
                                                    paddingVertical: 10
                                                }}
                                            />
                                            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 17.5 }} onPress={() => navigation.navigate("HistoryCart", { userid: candecode.userId })}>
                                                <View style={{ flexDirection: "row", gap: 10 }}>
                                                    <Icon name="history" color={"#0F172B"} size={18} />
                                                    <Text style={{ fontSize: 15 }}>Order history</Text>
                                                </View>
                                                <Text style={{ fontWeight: "bold" }}>ᐳ</Text>
                                            </TouchableOpacity>
                                            <View
                                                style={{
                                                    borderBottomColor: 'gray',
                                                    borderBottomWidth: 1,
                                                    opacity: 0.5,
                                                    left: 5,
                                                    right: 5,
                                                    paddingVertical: 10
                                                }}
                                            />
                                            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 17.5, paddingBottom: 5 }} onPress={() => navigation.navigate("FindOrder", { userid: candecode.userId })}>
                                                <View style={{ flexDirection: "row", gap: 10 }}>
                                                    <Icon name="search" color={"#0F172B"} size={18} />
                                                    <Text style={{ fontSize: 15 }}>Find order</Text>
                                                </View>
                                                <Text style={{ fontWeight: "bold" }}>ᐳ</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ marginVertical: 15 }}>
                                        <Text style={{ paddingBottom: 5, paddingLeft: 5, fontSize: 15, fontWeight: "bold" }}>Booking management</Text>
                                        <View style={settingStyle.coverIt2}>
                                            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 5 }} onPress={() => navigation.navigate("ActiveBooking", { userid: candecode.userId })}>
                                                <View style={{ flexDirection: "row", gap: 10 }}>
                                                    <Icon name="calendar-alt" color={"#0F172B"} size={18} />
                                                    <Text style={{ fontSize: 15 }}>Active booking</Text>
                                                </View>
                                                <Text style={{ fontWeight: "bold" }}>ᐳ</Text>
                                            </TouchableOpacity>
                                            <View
                                                style={{
                                                    borderBottomColor: 'gray',
                                                    borderBottomWidth: 1,
                                                    opacity: 0.5,
                                                    left: 5,
                                                    right: 5,
                                                    paddingVertical: 10
                                                }}
                                            />
                                            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 17.5, paddingBottom: 5 }} onPress={() => navigation.navigate("HistoryBooking", { userid: candecode.userId })}>
                                                <View style={{ flexDirection: "row", gap: 10 }}>
                                                    <Icon name="history" color={"#0F172B"} size={18} />
                                                    <Text style={{ fontSize: 15 }}>Booking history</Text>
                                                </View>
                                                <Text style={{ fontWeight: "bold" }}>ᐳ</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ marginVertical: 15 }}>
                                        <Text style={{ paddingBottom: 5, paddingLeft: 5, fontSize: 15, fontWeight: "bold" }}>Other</Text>
                                        <View style={settingStyle.coverIt2}>
                                            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 5 }} onPress={() => navigation.navigate('PnT')}>
                                                <View style={{ flexDirection: "row", gap: 10 }}>
                                                    <Icon name="user-shield" color={"#0F172B"} size={18} />
                                                    <Text style={{ fontSize: 15 }}>Privacy and terms</Text>
                                                </View>
                                                <Text style={{ fontWeight: "bold" }}>ᐳ</Text>
                                            </TouchableOpacity>
                                            <View
                                                style={{
                                                    borderBottomColor: 'gray',
                                                    borderBottomWidth: 1,
                                                    opacity: 0.5,
                                                    left: 5,
                                                    right: 5,
                                                    paddingVertical: 10
                                                }}
                                            />
                                            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 17.5, paddingBottom: 5 }} onPress={() => navigation.navigate('Contact', { candecode: candecode })}>
                                                <View style={{ flexDirection: "row", gap: 10 }}>
                                                    <Icon name="phone" color={"#0F172B"} size={18} style={{ transform: [{ scaleX: -1 }] }} />
                                                    <Text style={{ fontSize: 15 }}>Contact for help</Text>
                                                </View>
                                                <Text style={{ fontWeight: "bold" }}>ᐳ</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={[settingStyle.coverIt2, { marginVertical: 15 }]}>
                                        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => candecode.userRole === 1.5 ? logoutGoogle() : logoutThis()}>
                                            {islogout ? (
                                                <ActivityIndicator size={21} color={"#FEA116"} />
                                            ) : (
                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Logout</Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </>
                ) : (
                    <>
                        <Header type={null} />
                        <View style={settingStyle.container}>
                            <ImageBackground source={BgImage} style={settingStyle.bgimage} />
                            <View style={settingStyle.borderLog}>
                                <View style={settingStyle.insideLog}>
                                    <Text style={settingStyle.loginText}>Login</Text>
                                    <View style={settingStyle.fatherInput}>
                                        <Text style={settingStyle.mochText}>Email</Text>
                                        <View style={{ backgroundColor: "rgb(243 244 246)", borderRadius: 10, }}>
                                            <TextInput style={{ width: "100%", padding: 10 }} value={username} onChange={(e) => setUsername(e.nativeEvent.text)} />
                                        </View>
                                        {username !== "" ? (
                                            testEmail ? (
                                                <Text style={{ paddingLeft: 10, color: "red" }}>Email is invalid!</Text>
                                            ) : null
                                        ) : null}
                                        <Text style={[settingStyle.mochText, { paddingTop: 15 }]}>Password</Text>
                                        <View style={{ backgroundColor: "rgb(243 244 246)", borderRadius: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <TextInput style={{ width: "90%", padding: 10 }} secureTextEntry={seePassword ? false : true} onChange={(e) => setPassword(e.nativeEvent.text)} value={password} />
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
                                                <ActivityIndicator size={21} color={"#fff"} />
                                            ) : (
                                                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Login</Text>
                                            )}
                                        </TouchableOpacity>
                                        <Text style={{ textAlign: "center", paddingVertical: 20, fontSize: 20, fontWeight: "bold", color: "#0F172B" }}>Or</Text>
                                        {loadGoogle ? (
                                            <ActivityIndicator size={50} color={"#FEA116"} />
                                        ) : (
                                            <TouchableOpacity style={{ alignItems: "center", paddingBottom: 20 }} onPress={() => signInGoogle()}>
                                                <Image source={google} style={{ width: 49, height: 50 }} />
                                            </TouchableOpacity>
                                        )}
                                        {googleFail ? (
                                            <Text style={{ color: "red", textAlign: "center" }}>Google account invalid!</Text>
                                        ) : null}
                                        <View style={{ display: "flex", flexDirection: "row", gap: 10, justifyContent: "center" }}>
                                            <Text style={{ fontSize: 15 }}>Don't have an account?</Text>
                                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                                <Text style={{ color: "#FEA116", fontSize: 15 }}>Sign up</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </>
                )}
                <Footer />
            </ScrollView>
        </SafeAreaView >
    )
}

const settingStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
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
    },

    coverIt: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    coverIt2: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
        borderWidth: 1,
        borderColor: "transparent",
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 5,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 15,
        width: "100%",
        height: 70,
        position: "relative"
    },

    textDisplay: {
        color: "#FEA116",
        fontSize: 20
    },

    textLogo: {
        color: "#FEA116",
        gap: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        left: "43%"
    },
})
export default Setting