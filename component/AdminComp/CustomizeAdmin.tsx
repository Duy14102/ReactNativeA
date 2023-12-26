import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl, Image, TextInput, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import DrawerHeader from "./DrawerHeader";
import axios from "axios";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import Icon from "react-native-vector-icons/FontAwesome5";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

function CustomizeAdmin() {
    const navigation = useNavigation<any>()
    const isfocused = useIsFocused()
    const [refresh, setFresh] = useState(false);
    const [editIn4, setEditIn4] = useState(false)
    const [load, setLoad] = useState(false)
    const [updateimage, setUpdateImage] = useState<any>("")
    const [success, setSuccess] = useState(false)
    const [reload, setReload] = useState(false)
    const [updatefullname, setUpdateFullname] = useState("")
    const [updatephone, setUpdatePhone] = useState("")
    const [chooseImg, setChooseImg] = useState(false)

    const [data, setData] = useState<any>()
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            setReload(true)
            setFresh(false)
        }, 1000)
    }

    const getData = async () => {
        const token = await AsyncStorage.getItem("TOKEN")
        if (token) {
            const called: any = jwtDecode(token)
            const configuration = {
                method: "get",
                url: "http://192.168.1.216:3000/GetDetailUser",
                params: {
                    userid: called.userId
                }
            }
            axios(configuration)
                .then((res) => {
                    setData(res.data.data)
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    useEffect(() => {
        if (reload) {
            setUpdateFullname("")
            setUpdatePhone("")
            setUpdateImage("")
            getData()
            setEditIn4(false)
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
            setReload(false)
        }
    }, [reload])

    useEffect(() => {
        if (isfocused) {
            getData()
        }
    }, [isfocused])

    const updateUser = (id: any, nameHH: any, numberHH: any) => {
        var updateN = updatefullname
        var updateP = updatephone
        if (updatefullname === "") {
            updateN = nameHH
        }
        if (updatephone === "") {
            updateP = numberHH
        }
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/UpdateUserDetailNative",
            data: {
                updateid: id,
                updatefullname: updateN,
                updatephone: updateP,
                base64: updateimage
            },
        };
        setLoad(true)
        axios(configuration)
            .then(() => {
                setLoad(false)
                setSuccess(true)
                setReload(true)
            })
            .catch((e) => {
                setLoad(false)
                console.log(e);
            });
    }

    const openImagePicker = () => {
        launchImageLibrary({ mediaType: "photo", includeBase64: true }, (response) => {
            if (response.assets) {
                response.assets?.map((i) => {
                    const imagesss = `data:${i.type};base64,${i.base64}`;
                    setUpdateImage(imagesss)
                })
            } else {
                console.log("Bug");
            }
        });
    };

    const handleCameraLaunch = () => {
        launchCamera({ mediaType: "photo", includeBase64: true }, (response) => {
            if (response.assets) {
                response.assets?.map((i) => {
                    setUpdateImage(i.base64)
                })
            } else {
                console.log("Bug");
            }
        });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <DrawerHeader title={"Customize account"} />
                <View style={{ flex: 1 }}>
                    <View style={{ marginVertical: 15, alignItems: "center" }}>
                        {editIn4 ? (
                            <>
                                {chooseImg ? (
                                    <TouchableOpacity style={{ padding: 5, backgroundColor: "#FFFFFF", borderRadius: 50 }} onPress={() => setChooseImg(false)}>
                                        {data?.userimage ? (
                                            <Image source={{ uri: data?.userimage }} style={{ width: 90, height: 90, borderRadius: 50 }} />
                                        ) : (
                                            <>
                                                {updateimage ? (
                                                    <Image source={{ uri: updateimage }} style={{ width: 90, height: 90, borderRadius: 50 }} />
                                                ) : (
                                                    <Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" }} style={{ width: 90, height: 90, borderRadius: 50 }} />
                                                )}
                                            </>
                                        )}
                                        <Icon name="ban" size={20} style={{ position: "absolute", bottom: 5, right: 0, zIndex: 1 }} solid />
                                        <TouchableOpacity style={{ position: "absolute", top: 10, right: -110, zIndex: 1, flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#FFFFFF", paddingVertical: 5, paddingHorizontal: 13, width: 100 }} onPress={() => openImagePicker()}>
                                            <Icon name="book-open" style={{ fontSize: 15 }} />
                                            <Text style={{ fontSize: 15 }}>Library</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ position: "absolute", top: 55, right: -110, zIndex: 1, flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#FFFFFF", paddingVertical: 5, paddingHorizontal: 13, width: 100 }} onPress={() => handleCameraLaunch()}>
                                            <Icon name="camera" style={{ fontSize: 15 }} />
                                            <Text style={{ fontSize: 15 }}>Camera</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={{ padding: 5, backgroundColor: "#FFFFFF", borderRadius: 50 }} onPress={() => setChooseImg(true)}>
                                        {data?.userimage ? (
                                            <Image source={{ uri: data?.userimage }} style={{ width: 90, height: 90, borderRadius: 50 }} />
                                        ) : (
                                            <>
                                                {updateimage ? (
                                                    <Image source={{ uri: updateimage }} style={{ width: 90, height: 90, borderRadius: 50 }} />
                                                ) : (
                                                    <Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" }} style={{ width: 90, height: 90, borderRadius: 50 }} />
                                                )}
                                            </>
                                        )}
                                        <Icon name="edit" size={20} style={{ position: "absolute", bottom: 5, right: 0, zIndex: 1 }} solid />
                                    </TouchableOpacity>
                                )}
                            </>
                        ) : (
                            <View style={{ padding: 5, backgroundColor: "#FFFFFF", borderRadius: 50 }}>
                                {data?.userimage ? (
                                    <Image source={{ uri: data?.userimage }} style={{ width: 90, height: 90, borderRadius: 50 }} />
                                ) : (
                                    <Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" }} style={{ width: 90, height: 90, borderRadius: 50 }} />
                                )}
                            </View>
                        )}
                    </View>
                    <View style={{ pointerEvents: editIn4 ? "auto" : "none" }}>
                        <View style={{ backgroundColor: "#fff", borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingVertical: 20, paddingHorizontal: 20, flexDirection: "column", gap: 20 }}>
                            <View style={{ flexDirection: "column", gap: 5 }}>
                                <Text style={{ paddingLeft: 5, fontSize: 15 }}>Fullname</Text>
                                <TextInput style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} defaultValue={data?.fullname} onChange={(e) => setUpdateFullname(e.nativeEvent.text)} />
                            </View>
                            <View style={{ flexDirection: "column", gap: 5 }}>
                                <Text style={{ paddingLeft: 5, fontSize: 15 }}>Phone number</Text>
                                <TextInput style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} defaultValue={data?.phonenumber} onChange={(e) => setUpdatePhone(e.nativeEvent.text)} />
                            </View>
                            {editIn4 ? (
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                    <TouchableOpacity style={{ backgroundColor: "#FEA116", paddingHorizontal: 10, paddingVertical: 8 }} onPress={() => updateUser(data?._id, data?.fullname, data?.phonenumber)}>
                                        <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Confirm</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: "gray", paddingHorizontal: 10, paddingVertical: 8 }} onPress={() => setEditIn4(false)}>
                                        <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null}
                            {load ? (
                                <ActivityIndicator size={21} color={"#FEA116"} />
                            ) : null}
                            {success ? (
                                <Text style={{ fontSize: 15, color: "#03ba5f", textAlign: "center", backgroundColor: "#fff", paddingBottom: 15 }}>✅ Submit succeeded!</Text>
                            ) : null}
                        </View>
                    </View>
                    <View style={{ marginTop: 25 }}>
                        <Text style={{ paddingBottom: 5, paddingLeft: 5, fontSize: 15, fontWeight: "bold" }}>Options</Text>
                        <View style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 15 }}>
                            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 5 }} onPress={() => setEditIn4(true)}>
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <Icon name="info-circle" color={"#0F172B"} size={18} />
                                    <Text style={{ fontSize: 15 }}>Edit information</Text>
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
                            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 17.5 }} onPress={() => navigation.navigate("EditAdminPass", { user: data })}>
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <Icon name="key" color={"#0F172B"} size={18} />
                                    <Text style={{ fontSize: 15 }}>Edit password</Text>
                                </View>
                                <Text style={{ fontWeight: "bold" }}>ᐳ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CustomizeAdmin