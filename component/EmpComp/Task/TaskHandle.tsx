import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl, ActivityIndicator } from "react-native";
import { useState } from "react";
import DrawerHeader from "../../AdminComp/DrawerHeader";
import { useNavigation } from "@react-navigation/native";
import Clipboard from '@react-native-clipboard/clipboard';
import axios from "axios";

function TaskHandle({ route }: { route: any }) {
    const { i, id } = route.params
    const navigation = useNavigation<any>()
    const [refresh, setFresh] = useState(false);
    const [complete, setComplete] = useState(false)
    const [load, setLoad] = useState(false)
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {

            setFresh(false)
        }, 1000)
    }

    const finishTask = () => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/FinishTaskEmployee",
            data: {
                taskid: i.id,
                userid: id
            }
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    setComplete(false)
                    navigation.goBack()
                }).catch((err) => {
                    setLoad(false)
                    console.log(err);
                })
        }, 1000);
    }

    const copyToClipboardAddress = (e: any) => {
        Clipboard.setString(e);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <DrawerHeader title={"View Task"} />
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10 }} onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 17 }}>{"<"} Back</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: "#fff", padding: 15, marginVertical: 15 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 17 }}><Text style={{ fontWeight: "bold" }}>Task id</Text> : {i.id}</Text>
                            <TouchableOpacity onPress={() => copyToClipboardAddress(i.id)}>
                                <Text style={{ fontSize: 16, color: "#FEA116" }}>Copy</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: "gray", padding: 0.2, marginVertical: 15 }} />
                        <View style={{ flexDirection: "column", gap: 8 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 17 }}><Text style={{ fontWeight: "bold" }}>Title</Text> : {i.task.title}</Text>
                                {i.task.status === 1 ? (
                                    <Text style={{ fontSize: 17 }}><Text style={{ fontWeight: "bold" }}> Status</Text> : <Text style={{ color: "black" }}>🟢</Text></Text>
                                ) : (
                                    <Text style={{ fontSize: 17 }}><Text style={{ fontWeight: "bold" }}> Status</Text> : <Text style={{ color: "black" }}>🟡</Text></Text>
                                )}
                            </View>
                            <Text style={{ fontSize: 17 }}><Text style={{ fontWeight: "bold" }}>Date</Text> : {i.task.date}</Text>
                            {i.task.status === 2 ? (
                                <Text style={{ fontSize: 17 }}><Text style={{ fontWeight: "bold" }}>Date</Text> : {i.task.datefinish}</Text>
                            ) : null}
                            <Text style={{ fontSize: 17 }}><Text style={{ fontWeight: "bold" }}>Message</Text> : {i.task.message}</Text>
                        </View>
                    </View>
                    {i.task.status === 1 ? (
                        <>
                            <Text style={{ paddingLeft: 8, paddingBottom: 5, fontSize: 16, fontWeight: "bold" }}>Options</Text>
                            <View style={{ padding: 15, backgroundColor: "#fff" }}>
                                {complete ? (
                                    <>
                                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} onPress={() => setComplete(false)}>
                                            <Text style={{ fontSize: 16 }}>Complete task</Text>
                                            <Text style={{ fontSize: 16 }}>▲</Text>
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingVertical: 15 }}>
                                            <TouchableOpacity style={{ backgroundColor: "#FEA116", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => finishTask()}>
                                                <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 15 }}>Confirm</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ backgroundColor: "gray", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => setComplete(false)}>
                                                <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 15 }}>Cancel</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                ) : (
                                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} onPress={() => setComplete(true)}>
                                        <Text style={{ fontSize: 16 }}>Complete task</Text>
                                        <Text style={{ fontSize: 16 }}>▼</Text>
                                    </TouchableOpacity>
                                )}
                                {load ? (
                                    <ActivityIndicator size={24} color={"#FEA116"} />
                                ) : null}
                            </View>
                        </>
                    ) : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TaskHandle