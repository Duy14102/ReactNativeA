import { SafeAreaView, View, Text, StyleSheet, ScrollView, TextInput, Dimensions, ImageBackground, TouchableOpacity, Image } from "react-native"
import Header from "../component/Header"
import Footer from "../component/Footer"
import { useState, useEffect } from "react"
import Icon from 'react-native-vector-icons/FontAwesome5'

function Signup({ navigation }: { navigation: any }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [phone, setPhone] = useState("")
    const [seePassword, setSeePassword] = useState(false)
    const [seePassword2, setSeePassword2] = useState(false)
    const [testEmail, setTestEmail] = useState(false)
    const [testPhone, setTestPhone] = useState(false)
    const [testConfirm, setTestConfirm] = useState(false)
    const [testPasswordUpper, setTestPasswordUpper] = useState(false)
    const [testPasswordDigit, setPasswordDigit] = useState(false)
    const BgImage = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700307517/UI/e4onxrx7hmgzmrbel9jk.webp" }
    var emailTest = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    var checkUpperCase = RegExp("(.*[A-Z].*)")
    var checkDigit = RegExp("(.*[0-9].*)")
    var checkPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g

    useEffect(() => {
        if (username !== "") {
            if (!emailTest.test(username)) {
                setTestEmail(true)
            } else {
                setTestEmail(false)
            }
        }
    }, [username])

    useEffect(() => {
        if (password !== "") {
            if (!checkUpperCase.test(password)) {
                setTestPasswordUpper(true)
            } else {
                setTestPasswordUpper(false)
            }
            if (!checkDigit.test(password)) {
                setPasswordDigit(true)
            } else {
                setPasswordDigit(false)
            }
        }
    }, [password])

    useEffect(() => {
        if (confirmPass !== "") {
            if (confirmPass !== password) {
                setTestConfirm(true)
            } else {
                setTestConfirm(false)
            }
        }
    }, [confirmPass])

    useEffect(() => {
        if (phone !== "") {
            if (!checkPhone.test(phone)) {
                setTestPhone(true)
            } else {
                setTestPhone(false)
            }
        }
    }, [phone])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
                <Header type={"Yes"} />
                <View style={settingStyle.container}>
                    <ImageBackground source={BgImage} style={settingStyle.bgimage} />
                    <View style={settingStyle.borderLog}>
                        <View style={settingStyle.insideLog}>
                            <Text style={settingStyle.loginText}>Signup</Text>
                            <View style={settingStyle.fatherInput}>
                                <Text style={settingStyle.mochText}>Email</Text>
                                <TextInput style={settingStyle.input} onChange={(e) => setUsername(e.nativeEvent.text)} />
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
                                {password !== "" ? (
                                    <>
                                        {testPasswordUpper ? (
                                            <Text style={{ paddingLeft: 10, color: "red" }}>Password must have at least 1 uppercase letter!</Text>
                                        ) : null}
                                        {testPasswordDigit ? (
                                            <Text style={{ paddingLeft: 10, color: "red" }}>Password must have at least 1 digit!</Text>
                                        ) : null}
                                    </>
                                ) : null}
                                <Text style={[settingStyle.mochText, { paddingTop: 15 }]}>Confirm password</Text>
                                <View style={{ backgroundColor: "rgb(243 244 246)", borderRadius: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <TextInput style={{ width: "90%" }} secureTextEntry={seePassword2 ? false : true} onChange={(e) => setConfirmPass(e.nativeEvent.text)} />
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
                                    testConfirm ? (
                                        <Text style={{ paddingLeft: 10, color: "red" }}>Confirm password not match!</Text>
                                    ) : null
                                ) : null}
                                <Text style={[settingStyle.mochText, { paddingTop: 15 }]}>Full name</Text>
                                <TextInput style={settingStyle.input} />
                                <View style={{ marginBottom: 30 }}>
                                    <Text style={[settingStyle.mochText, { paddingTop: 15 }]}>Phone number</Text>
                                    <TextInput style={settingStyle.input} onChange={(e) => setPhone(e.nativeEvent.text)} />
                                    {phone !== "" ? (
                                        testPhone ? (
                                            <Text style={{ paddingLeft: 10, color: "red" }}>Phone number is invalid!</Text>
                                        ) : null
                                    ) : null}
                                </View>
                                <TouchableOpacity style={settingStyle.loginButton}>
                                    <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Signup</Text>
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