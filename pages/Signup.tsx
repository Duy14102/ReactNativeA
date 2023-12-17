import { SafeAreaView, View, Text, StyleSheet, ScrollView, TextInput, Dimensions, ImageBackground, TouchableOpacity, RefreshControl, ActivityIndicator } from "react-native"
import Header from "../component/Header"
import Footer from "../component/Footer"
import { useState, useEffect, useRef } from "react"
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from "axios"

function Signup({ navigation }: { navigation: any }) {
    const [stateName, setStateName] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [fullname, setFullname] = useState("")
    const [phone, setPhone] = useState("")
    const [seePassword, setSeePassword] = useState(false)
    const [load, setLoad] = useState(false)
    const [seePassword2, setSeePassword2] = useState(false)
    const [refresh, setFresh] = useState(false);
    const [fullyLoad, setFullyLoad] = useState(false);
    const [checkPhoneState, setCheckPhoneState] = useState(false)
    const scrollViewRef = useRef<any>(null);
    const BgImage = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700307517/UI/e4onxrx7hmgzmrbel9jk.webp" }
    var emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    var checkUpperCase = RegExp("(.*[A-Z].*)")
    var checkDigit = RegExp("(.*[0-9].*)")
    var checkPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g

    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            setUsername("")
            setPassword("")
            setConfirmPass("")
            setPhone("")
            setFullname("")
            setSeePassword(false)
            setSeePassword2(false)
            setFresh(false)
        }, 1000)
    }

    useEffect(() => {
        if (fullyLoad) {
            setUsername("")
            setPassword("")
            setConfirmPass("")
            setPhone("")
            setFullname("")
            setSeePassword(false)
            setSeePassword2(false)
            setTimeout(() => {
                setStateName(null)
                setFullyLoad(false)
            }, 3000)
        }
    }, [fullyLoad])

    useEffect(() => {
        if (phone !== "") {
            if (!checkPhone.test(phone)) {
                setCheckPhoneState(true)
            } else {
                setCheckPhoneState(false)
            }
        }
    }, [phone])

    const handleSubmit = () => {
        const configuration = {
            method: "post",
            url: "http://192.168.1.217:3000/Register",
            data: {
                email: username,
                password,
                fullname,
                phone,
            },
        };
        if (confirmPass !== password) {
            return false
        } if (!emailTest.test(username)) {
            return false
        } if (!checkDigit.test(password)) {
            return false
        } if (!checkUpperCase.test(password)) {
            return false
        }
        if (checkPhoneState) {
            console.log("Ye3");
            return false
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then((result) => {
                    setLoad(false)
                    if (scrollViewRef.current) {
                        scrollViewRef.current.scrollTo({ y: 0, animated: true })
                    }
                    setStateName(result.data.fullname)
                    setFullyLoad(true)
                })
                .catch((er) => {
                    setLoad(false)
                    console.log(er);
                });
        }, 1000);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView ref={scrollViewRef} contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <Header type={"Yes"} />
                <View style={settingStyle.container}>
                    {stateName ? (
                        <View style={{ position: "absolute", backgroundColor: "#03ba5f", top: 50, right: 5, zIndex: 10, padding: 12, borderRadius: 5, flexDirection: "column", gap: 5 }}>
                            <Text style={{ textAlign: "center", fontSize: 15, color: "#fff", fontWeight: "bold" }}>Signup successfully!</Text>
                            <Text style={{ textAlign: "center", fontSize: 15, color: "#fff", fontWeight: "bold" }}>Hi {stateName}</Text>
                        </View>
                    ) : null}
                    <ImageBackground source={BgImage} style={settingStyle.bgimage} />
                    <View style={settingStyle.borderLog}>
                        <View style={settingStyle.insideLog}>
                            <Text style={settingStyle.loginText}>Signup</Text>
                            <View style={settingStyle.fatherInput}>
                                <Text style={settingStyle.mochText}>Email</Text>
                                <TextInput style={settingStyle.input} onChange={(e) => setUsername(e.nativeEvent.text)} value={username} />
                                {username !== "" ? (
                                    !emailTest.test(username) ? (
                                        <Text style={{ paddingLeft: 10, color: "red" }}>Email is invalid!</Text>
                                    ) : null
                                ) : null}
                                <Text style={[settingStyle.mochText, { paddingTop: 15 }]}>Password</Text>
                                <View style={{ backgroundColor: "rgb(243 244 246)", borderRadius: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <TextInput style={{ width: "90%" }} secureTextEntry={seePassword ? false : true} value={password} onChange={(e) => setPassword(e.nativeEvent.text)} />
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
                                {password !== "" ? (
                                    <>
                                        {!checkUpperCase.test(password) ? (
                                            <Text style={{ paddingLeft: 10, color: "red" }}>Password must have at least 1 uppercase letter!</Text>
                                        ) : null}
                                        {!checkDigit.test(password) ? (
                                            <Text style={{ paddingLeft: 10, color: "red" }}>Password must have at least 1 digit!</Text>
                                        ) : null}
                                    </>
                                ) : null}
                                <Text style={[settingStyle.mochText, { paddingTop: 15 }]}>Confirm password</Text>
                                <View style={{ backgroundColor: "rgb(243 244 246)", borderRadius: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <TextInput style={{ width: "90%" }} secureTextEntry={seePassword2 ? false : true} value={confirmPass} onChange={(e) => setConfirmPass(e.nativeEvent.text)} />
                                    {seePassword2 ? (
                                        <TouchableOpacity style={{ width: "10%" }} onPress={() => setSeePassword2(false)}>
                                            <Icon name="eye-slash" style={{ width: "100%", fontSize: 18 }} />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={{ width: "10%" }} onPress={() => setSeePassword2(true)}>
                                            <Icon name="eye" style={{ width: "100%", fontSize: 18 }} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                                {confirmPass !== "" ? (
                                    confirmPass !== password ? (
                                        <Text style={{ paddingLeft: 10, color: "red" }}>Confirm password not match!</Text>
                                    ) : null
                                ) : null}
                                <Text style={[settingStyle.mochText, { paddingTop: 15 }]}>Full name</Text>
                                <TextInput style={settingStyle.input} onChange={(e) => setFullname(e.nativeEvent.text)} value={fullname} />
                                <View style={{ marginBottom: 30 }}>
                                    <Text style={[settingStyle.mochText, { paddingTop: 15 }]}>Phone number</Text>
                                    <TextInput style={settingStyle.input} onChange={(e) => setPhone(e.nativeEvent.text)} value={phone} />
                                    {phone !== "" ? (
                                        checkPhoneState ? (
                                            <Text style={{ paddingLeft: 10, color: "red" }}>Phone number is invalid!</Text>
                                        ) : null
                                    ) : null}
                                </View>
                                <TouchableOpacity style={settingStyle.loginButton} onPress={() => handleSubmit()}>
                                    {load ? (
                                        <ActivityIndicator size={21} color={"#fff"} />
                                    ) : (
                                        <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Signup</Text>
                                    )}
                                </TouchableOpacity>
                                <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center", paddingTop: 15 }}>
                                    <Text style={{ fontSize: 15 }}>Already have an account?</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                                        <Text style={{ color: "#FEA116", fontSize: 15 }}>Sign in</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
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

    input: {
        borderRadius: 10,
        backgroundColor: "rgb(243 244 246)",
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
        height: Dimensions.get('window').height / 0.75,
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
export default Signup