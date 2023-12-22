import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl, TextInput, ActivityIndicator } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Picker } from '@react-native-picker/picker';
import DrawerHeader from "./DrawerHeader";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";

function CreateAccount() {
    const navigation = useNavigation<any>()
    const [refresh, setFresh] = useState(false);
    const [seePassword, setSeePassword] = useState(false)
    const [seePassword2, setSeePassword2] = useState(false)
    const [fullyLoad, setFullyLoad] = useState(false);
    const [load, setLoad] = useState(false)
    const [checkPhoneState, setCheckPhoneState] = useState(false)
    const [checkRole, setCheckRole] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [fullname, setFullname] = useState("")
    const [phone, setPhone] = useState("")
    const [role, setRole] = useState<any>()
    const scrollViewRef = useRef<any>(null);
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
            setRole(null)
            setSeePassword(false)
            setSeePassword2(false)
            setCheckRole(false)
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
            setRole(null)
            setSeePassword(false)
            setSeePassword2(false)
            setCheckRole(false)
            setTimeout(() => {
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
            url: "http://localhost:3000/AddAdmin",
            data: {
                email: username,
                password,
                fullname,
                phonenumber: phone,
                role
            },
        };
        if (!role) {
            setCheckRole(true)
            return false
        }
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
                .then(() => {
                    setLoad(false)
                    setFullyLoad(true)
                    if (scrollViewRef.current) {
                        scrollViewRef.current.scrollTo({ y: 0, animated: true })
                    }
                    setTimeout(() => {
                        navigation.goBack()
                    }, 3001);
                })
                .catch((err) => {
                    setLoad(false)
                    console.log(err);
                });
        }, 1000);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView ref={scrollViewRef} contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <DrawerHeader title={"Create account"} />
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10 }} onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 17 }}>{"<"} Back</Text>
                    </TouchableOpacity>
                    <View style={{ paddingHorizontal: 15, flexDirection: "column", gap: 20, paddingVertical: 25 }}>
                        {fullyLoad ? (
                            <Text style={{ fontSize: 15, color: "#03ba5f", textAlign: "center" }}>✅ Create account succeeded!</Text>
                        ) : null}
                        <View style={{ flexDirection: "column", gap: 5 }}>
                            <Text style={{ fontSize: 17, paddingLeft: 5 }}>Email</Text>
                            <TextInput style={{ borderWidth: 1, borderRadius: 6, borderColor: "gray", backgroundColor: "#fff", padding: 10 }} onChange={(e) => setUsername(e.nativeEvent.text)} value={username} />
                            {username !== "" ? (
                                !emailTest.test(username) ? (
                                    <Text style={{ paddingLeft: 10, color: "red" }}>Email is invalid!</Text>
                                ) : null
                            ) : null}
                        </View>
                        <View style={{ flexDirection: "column", gap: 5 }}>
                            <Text style={{ fontSize: 17, paddingLeft: 5 }}>Password</Text>
                            <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 6, backgroundColor: "#fff", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <TextInput style={{ width: "90%", padding: 10 }} secureTextEntry={seePassword ? false : true} value={password} onChange={(e) => setPassword(e.nativeEvent.text)} />
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
                        </View>
                        <View style={{ flexDirection: "column", gap: 5 }}>
                            <Text style={{ fontSize: 17, paddingLeft: 5 }}>Repeat password</Text>
                            <View style={{ borderColor: "gray", borderWidth: 1, borderRadius: 6, backgroundColor: "#fff", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <TextInput style={{ width: "90%", padding: 10 }} secureTextEntry={seePassword2 ? false : true} value={confirmPass} onChange={(e) => setConfirmPass(e.nativeEvent.text)} />
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
                        </View>
                        <View style={{ flexDirection: "column", gap: 5 }}>
                            <Text style={{ fontSize: 17, paddingLeft: 5 }}>Fullname</Text>
                            <TextInput style={{ borderWidth: 1, borderRadius: 6, borderColor: "gray", backgroundColor: "#fff", padding: 10 }} onChange={(e) => setFullname(e.nativeEvent.text)} value={fullname} />
                        </View>
                        <View style={{ flexDirection: "column", gap: 5 }}>
                            <Text style={{ fontSize: 17, paddingLeft: 5 }}>Phone number</Text>
                            <TextInput style={{ borderWidth: 1, borderRadius: 6, borderColor: "gray", backgroundColor: "#fff", padding: 10 }} onChange={(e) => setPhone(e.nativeEvent.text)} value={phone} />
                            {phone !== "" ? (
                                checkPhoneState ? (
                                    <Text style={{ paddingLeft: 10, color: "red" }}>Phone number is invalid!</Text>
                                ) : null
                            ) : null}
                        </View>
                        <View style={{ flexDirection: "column", gap: 5 }}>
                            <Text style={{ fontSize: 17, paddingLeft: 5 }}>Role</Text>
                            <View style={{ borderWidth: 1, borderColor: "gray", width: "100%", backgroundColor: "#fff", borderRadius: 6 }}>
                                <Picker
                                    selectedValue={role}
                                    onValueChange={(itemValue) =>
                                        setRole(itemValue)
                                    }>
                                    <Picker.Item label="Choose role" value={null} />
                                    <Picker.Item label="User" value={1} />
                                    <Picker.Item label="Employee" value={2} />
                                    <Picker.Item label="Manager" value={3} />
                                </Picker>
                            </View>
                            {checkRole ? (
                                <Text style={{ paddingLeft: 10, color: "red" }}>Role is needed!</Text>
                            ) : null}
                        </View>
                        <TouchableOpacity style={{ backgroundColor: "#FEA116", alignItems: "center", paddingVertical: 8 }} onPress={() => handleSubmit()}>
                            {load ? (
                                <ActivityIndicator size={21} color={"#fff"} />
                            ) : (
                                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Confirm</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateAccount