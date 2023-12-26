import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl, ActivityIndicator } from "react-native";
import { useState } from "react";
import DrawerHeader from "../../../AdminComp/DrawerHeader";
import { useNavigation } from "@react-navigation/native";
import Clipboard from "@react-native-clipboard/clipboard";
import axios from "axios";

function DetailContact({ route }: { route: any }) {
    const { i } = route.params
    const navigation = useNavigation<any>()
    const [refresh, setFresh] = useState(false);
    const [load, setLoad] = useState(false)
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {

            setFresh(false)
        }, 1000)
    }

    const copyToClipboardid = (e: any) => {
        Clipboard.setString(e);
    };

    const date = new Date(i.createdAt).toLocaleDateString()
    const time = new Date(i.createdAt).toLocaleTimeString()
    const datetime = date + " - " + time

    const DeleteContact = () => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/DeleteContact",
            data: {
                id: i._id
            }
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    navigation.goBack()
                }).catch((er) => {
                    console.log(er);
                    setLoad(false)
                })
        }, 1000);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <DrawerHeader title={"Detail contact"} />
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10 }} onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 17 }}>{"<"} Back</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: "#fff", marginTop: 15, padding: 15, flexDirection: "column", gap: 10 }}>
                        <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>User</Text> : {i.email} {`( ${i.name} )`}</Text>
                    </View>
                    <View style={{ backgroundColor: "#fff", marginVertical: 15, padding: 15, flexDirection: "column", gap: 10 }}>
                        <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Title</Text> : {i.title}</Text>
                        <View style={{ backgroundColor: "gray", padding: 0.2, marginVertical: 5 }} />
                        <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Message</Text> : {i.message}</Text>
                    </View>
                    <View style={{ backgroundColor: "#fff", padding: 15, flexDirection: "column", gap: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Id</Text> : {i._id}</Text>
                            <TouchableOpacity onPress={() => copyToClipboardid(i._id)}>
                                <Text style={{ fontSize: 16, color: "#FEA116" }}>Copy</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Date</Text> : {datetime}</Text>
                    </View>
                    <TouchableOpacity style={{ backgroundColor: "tomato", alignItems: "center", marginVertical: 15, paddingVertical: 8 }} onPress={() => DeleteContact()}>
                        {load ? (
                            <ActivityIndicator size={21} color={"#fff"} />
                        ) : (
                            <Text style={{ fontWeight: "bold", fontSize: 15, color: "#fff" }}>Delete</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailContact