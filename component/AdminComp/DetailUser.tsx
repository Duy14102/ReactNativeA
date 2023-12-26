import { ScrollView, View, Text, TouchableOpacity, RefreshControl, Image, TextInput, ActivityIndicator } from "react-native";
import { useState } from "react";
import DrawerHeader from "./DrawerHeader";
import axios from "axios";

function DetailUser({ route, navigation }: { route: any, navigation: any }) {
    const { i } = route.params
    const [refresh, setFresh] = useState(false);
    const [confirm, setConfirm] = useState(false)
    const [load, setLoad] = useState(false)
    const [confirm2, setConfirm2] = useState(false)
    const [load2, setLoad2] = useState(false)
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            setConfirm(false)
            setConfirm2(false)
            setFresh(false)
        }, 1000)
    }

    function bannedAc(e: any) {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/BannedByAdmin",
            data: {
                id: i._id,
                status: e
            }
        };
        if (e === 1) {
            setLoad2(true)
            axios(configuration)
                .then(() => {
                    setLoad2(false)
                    setConfirm2(false)
                    navigation.goBack()
                })
                .catch((error) => {
                    setLoad2(false)
                    console.log(error);
                });
        }
        if (e === 2) {
            setLoad(true)
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    setConfirm(false)
                    navigation.goBack()
                })
                .catch((error) => {
                    setLoad(false)
                    console.log(error);
                });
        }
    }
    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
            <DrawerHeader title={"User Management"} />
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10 }} onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 17 }}>{"<"} Back</Text>
                </TouchableOpacity>
                <View style={{ marginVertical: 15, alignItems: "center" }}>
                    {i.userimage ? (
                        <Image source={{ uri: i.userimage }} style={{ width: 90, height: 90, borderRadius: 50 }} />
                    ) : (
                        <Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" }} style={{ width: 90, height: 90, borderRadius: 50 }} />
                    )}
                </View>
                <View style={{ backgroundColor: "#fff", borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingVertical: 20, paddingHorizontal: 20, flexDirection: "column", gap: 20 }}>
                    <View style={{ flexDirection: "column", gap: 5 }}>
                        <Text style={{ paddingLeft: 5, fontSize: 15 }}>Email</Text>
                        <TextInput style={{ pointerEvents: "none", borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} value={i.email} />
                    </View>
                    <View style={{ flexDirection: "column", gap: 5 }}>
                        <Text style={{ paddingLeft: 5, fontSize: 15 }}>Fullname</Text>
                        <TextInput style={{ pointerEvents: "none", borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} value={i.fullname} />
                    </View>
                    <View style={{ flexDirection: "column", gap: 5 }}>
                        <Text style={{ paddingLeft: 5, fontSize: 15 }}>Phone number</Text>
                        <TextInput style={{ pointerEvents: "none", borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} value={i.phonenumber} />
                    </View>
                    {i.status === 2 ? (
                        <>
                            <TouchableOpacity style={{ backgroundColor: "#03ba5f", alignItems: "center", paddingVertical: 8, borderRadius: 6 }} onPress={() => setConfirm2(true)}>
                                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Unban this account</Text>
                            </TouchableOpacity>
                            {confirm2 ? (
                                <>
                                    <Text style={{ fontSize: 17, fontWeight: "bold", textAlign: "center" }}>Are you sure ?</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                        <TouchableOpacity style={{ backgroundColor: "#FEA116", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => bannedAc(1)}>
                                            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Confirm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ backgroundColor: "gray", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => setConfirm2(false)}>
                                            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {load2 ? (
                                        <ActivityIndicator size={21} color={"#FEA116"} />
                                    ) : null}
                                </>
                            ) : null}
                        </>
                    ) : null}
                    {i.role !== 4 && i.status === 1 ? (
                        <>
                            <TouchableOpacity style={{ backgroundColor: "tomato", alignItems: "center", paddingVertical: 8, borderRadius: 6 }} onPress={() => setConfirm(true)}>
                                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Ban this account</Text>
                            </TouchableOpacity>
                            {confirm ? (
                                <>
                                    <Text style={{ fontSize: 17, fontWeight: "bold", textAlign: "center" }}>Are you sure ?</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                        <TouchableOpacity style={{ backgroundColor: "#FEA116", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => bannedAc(2)}>
                                            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Confirm</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ backgroundColor: "gray", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => setConfirm(false)}>
                                            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {load ? (
                                        <ActivityIndicator size={21} color={"#FEA116"} />
                                    ) : null}
                                </>
                            ) : null}
                        </>
                    ) : null}
                </View>
            </View>
        </ScrollView>
    )
}

export default DetailUser