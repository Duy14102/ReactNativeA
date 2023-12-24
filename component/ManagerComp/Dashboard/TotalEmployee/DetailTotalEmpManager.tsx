import { ScrollView, View, Text, TouchableOpacity, RefreshControl, Image, TextInput, ActivityIndicator, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import DrawerHeader from "../../../AdminComp/DrawerHeader";
import { useIsFocused } from "@react-navigation/native";

function DetailTotalEmpManager({ route, navigation }: { route: any, navigation: any }) {
    const { i } = route.params
    const [refresh, setFresh] = useState(false);
    const isfocused = useIsFocused()
    const [load, setLoad] = useState(false)
    const [checkBlank, setCheckBlank] = useState(false)
    const [data, setData] = useState<any>()
    const [task, setTask] = useState(false)
    const [Title, setTitle] = useState("")
    const [Message, setMessage] = useState("")
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            setTitle("")
            setMessage("")
            setCheckBlank(false)
            setFresh(false)
        }, 1000)
    }

    const datasynb = () => {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetDetailUser",
            params: {
                userid: i._id
            }
        }
        axios(configuration)
            .then((res) => {
                setData(res.data.data)
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (isfocused) {
            datasynb()
        }
    }, [isfocused])

    const GiveTask = (e: any) => {
        const date = new Date().toLocaleDateString()
        const time = new Date().toLocaleTimeString()
        const datetime = date + " - " + time
        if (Title === "" || Message === "") {
            setCheckBlank(true)
            return false
        }
        const Both = { title: Title, message: Message, date: datetime, status: 1, datefinish: null }
        const configuration = {
            method: "post",
            url: "http://localhost:3000/GiveTaskEmployee",
            data: {
                id: e,
                task: Both
            }
        }
        setLoad(true)
        axios(configuration)
            .then(() => {
                setLoad(false)
                datasynb()
            }).catch((er) => {
                console.log(er);
                setLoad(false)
            })
    }

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
            <DrawerHeader title={"Detail Employee"} />
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10 }} onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 17 }}>{"<"} Back</Text>
                </TouchableOpacity>
                <View style={{ marginVertical: 15, alignItems: "center" }}>
                    {data?.userimage ? (
                        <Image source={{ uri: data?.userimage }} style={{ width: 90, height: 90, borderRadius: 50 }} />
                    ) : (
                        <Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" }} style={{ width: 90, height: 90, borderRadius: 50 }} />
                    )}
                </View>
                <View style={{ backgroundColor: "#fff", borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingVertical: 20, paddingHorizontal: 20, flexDirection: "column", gap: 20 }}>
                    <View style={{ flexDirection: "column", gap: 5 }}>
                        <Text style={{ paddingLeft: 5, fontSize: 15 }}>Email</Text>
                        <TextInput style={{ pointerEvents: "none", borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} value={data?.email} />
                    </View>
                    <View style={{ flexDirection: "column", gap: 5 }}>
                        <Text style={{ paddingLeft: 5, fontSize: 15 }}>Fullname</Text>
                        <TextInput style={{ pointerEvents: "none", borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} value={data?.fullname} />
                    </View>
                    <View style={{ flexDirection: "column", gap: 5 }}>
                        <Text style={{ paddingLeft: 5, fontSize: 15 }}>Phone number</Text>
                        <TextInput style={{ pointerEvents: "none", borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} value={data?.phonenumber} />
                    </View>
                </View>
                <View style={{ backgroundColor: "#fff", marginVertical: 15, paddingVertical: 15 }}>
                    <View style={{ flexDirection: "column", gap: 5 }}>
                        <Text style={{ paddingLeft: 5, fontSize: 20, textAlign: "center", fontWeight: "bold" }}>Task</Text>
                        {data?.status === 2 ? (
                            <Text style={{ fontSize: 16, textAlign: "center", color: "red" }}>This account is banned!</Text>
                        ) : (
                            <>
                                <View style={{ alignItems: "flex-end" }}>
                                    <TouchableOpacity style={{ backgroundColor: "#2298F1", alignItems: "center", paddingVertical: 8, width: 100, marginRight: 10, borderRadius: 6 }} onPress={() => setTask(true)}>
                                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>➕ Task</Text>
                                    </TouchableOpacity>
                                </View>
                                {task ? (
                                    <View style={{ flexDirection: "column", gap: 15, padding: 15 }}>
                                        <View style={{ flexDirection: "column", gap: 5 }}>
                                            <Text style={{ paddingLeft: 5, fontWeight: "bold", fontSize: 16 }}>Title</Text>
                                            <TextInput onChange={(e) => setTitle(e.nativeEvent.text)} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} />
                                        </View>
                                        <View style={{ flexDirection: "column", gap: 5 }}>
                                            <Text style={{ paddingLeft: 5, fontWeight: "bold", fontSize: 16 }}>Message</Text>
                                            <TextInput onChange={(e) => setMessage(e.nativeEvent.text)} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10, height: 100, verticalAlign: "top" }} />
                                        </View>
                                        {checkBlank ? (
                                            <Text style={{ color: "red", textAlign: "center" }}>These field cant be blank!</Text>
                                        ) : null}
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                            <TouchableOpacity style={{ backgroundColor: "#FEA116", paddingVertical: 8, paddingHorizontal: 10 }} onPress={() => GiveTask(data?._id)}>
                                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Confirm</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setTask(false)} style={{ backgroundColor: "gray", paddingVertical: 8, paddingHorizontal: 10 }}>
                                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Cancel</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {load ? (
                                            <ActivityIndicator size={25} color={"#FEA116"} />
                                        ) : null}
                                    </View>
                                ) : null}
                            </>
                        )}
                        {data?.task?.map((a: any) => {
                            return (
                                <TouchableOpacity key={a.id} style={style.shadow} onPress={() => navigation.navigate("DetailTaskManager", { i: a, id: data?._id })}>
                                    <View style={{ backgroundColor: "#fff", padding: 15 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                            <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>Title</Text> : {a.task.title}</Text>
                                            <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>Status</Text> : <Text style={{ color: "black" }}>{a.task.status === 1 ? "🟡" : "🟢"}</Text></Text>
                                        </View>
                                        <View style={{ backgroundColor: "gray", padding: 0.3, marginVertical: 10 }} />
                                        <Text style={{ fontSize: 15, paddingBottom: 5 }}><Text style={{ fontWeight: "bold" }}>Date</Text> : {a.task.date}</Text>
                                        <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>Message</Text> : {a.task.message}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginVertical: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: "transparent"
    }
})

export default DetailTotalEmpManager