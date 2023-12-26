import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, RefreshControl, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import DrawerHeader from "./DrawerHeader";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";

function EditAdminPass({ route, navigation }: { route: any, navigation: any }) {
    const { user } = route.params
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [load, setLoad] = useState(false)
    const [oldW, setOldW] = useState(false)
    const [success, setSuccess] = useState(false)
    const [checkOld, setCheckOld] = useState(false)
    const [checkNew, setCheckNew] = useState(false)
    const [checkDup, setCheckDup] = useState(false)
    const [checkUp, setCheckUp] = useState(false)
    const [refresh, setFresh] = useState(false)
    const [checkDig, setCheckDig] = useState(false)
    const [seePassword, setSeePassword] = useState(false)
    const [seePassword2, setSeePassword2] = useState(false)
    var checkUpperCase = RegExp("(.*[A-Z].*)")
    var checkDigit = RegExp("(.*[0-9].*)")
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {

            setFresh(false)
        }, 1000)
    }

    useEffect(() => {
        if (success) {
            setOldPassword("")
            setNewPassword("")
            setOldW(false)
            setCheckOld(false)
            setCheckNew(false)
            setCheckDup(false)
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
        }
    }, [success])

    useEffect(() => {
        if (newPassword !== "") {
            if (!checkUpperCase.test(newPassword)) {
                setCheckUp(true)
            } else {
                setCheckUp(false)
            }
            if (!checkDigit.test(newPassword)) {
                setCheckDig(true)
            } else {
                setCheckDig(false)
            }
        }
    }, [newPassword])

    const updatePassword = () => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/UpdatePasswordNative",
            data: {
                updateid: user._id,
                updatepassword: newPassword,
                oldPassword: oldPassword
            }
        }
        if (oldPassword === "") {
            setCheckOld(true)
            return false
        }
        if (newPassword === "") {
            setCheckNew(true)
            return false
        }
        if (oldPassword === newPassword) {
            setCheckDup(true)
            return false
        }
        if (checkUp) {
            return false
        } if (checkDig) {
            return false
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    setSuccess(true)
                }).catch((er) => {
                    setLoad(false)
                    setOldW(true)
                })
        }, 1000)
    }

    return (
        <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <DrawerHeader title={"Edit password"} />
                <TouchableOpacity style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10 }} onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 17 }}>{"<"} Back</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, padding: 15 }}>
                    <View style={{ paddingVertical: 15 }}>
                        <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5, paddingBottom: 3 }}>Old password</Text>
                        <View style={{ backgroundColor: "#E1E1E1", borderRadius: 8, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <TextInput style={{ width: "90%", padding: 10 }} secureTextEntry={seePassword2 ? false : true} onChange={(e) => setOldPassword(e.nativeEvent.text)} value={oldPassword} />
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
                        {oldW ? (
                            <Text style={{ color: "red" }}>Old password incorrect!</Text>
                        ) : null}
                        {checkOld ? (
                            <Text style={{ color: "red" }}>This field cant be blank!</Text>
                        ) : null}
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5, paddingBottom: 3 }}>New password</Text>
                        <View style={{ backgroundColor: "#E1E1E1", borderRadius: 8, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <TextInput style={{ width: "90%", padding: 10 }} secureTextEntry={seePassword ? false : true} onChange={(e) => setNewPassword(e.nativeEvent.text)} value={newPassword} />
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
                        {checkNew ? (
                            <Text style={{ color: "red" }}>This field cant be blank!</Text>
                        ) : null}
                        {checkDup ? (
                            <Text style={{ color: "red" }}>New password matches old password!</Text>
                        ) : null}
                        {newPassword !== "" ? (
                            <>
                                {checkUp ? (
                                    <Text style={{ color: "red" }}>Password must have at least 1 uppercase letter!</Text>
                                ) : null}
                                {checkDig ? (
                                    <Text style={{ color: "red" }}>Password must have at least 1 digit!</Text>
                                ) : null}
                            </>
                        ) : null}
                    </View>
                    <TouchableOpacity style={{ backgroundColor: "#FEA116", alignItems: "center", paddingVertical: 8, marginVertical: 15 }} onPress={() => updatePassword()}>
                        {load ? (
                            <ActivityIndicator size={21} color={"#fff"} />
                        ) : (
                            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Submit</Text>
                        )}
                    </TouchableOpacity>
                    {success ? (
                        <Text style={{ fontSize: 15, color: "#03ba5f" }}>✅ Edit password succeeded!</Text>
                    ) : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default EditAdminPass