import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import DrawerHeader from "../../AdminComp/DrawerHeader";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";

function ChangeTableEmp({ route }: { route: any }) {
    const { item } = route.params
    const navigation = useNavigation<any>()
    const isfocused = useIsFocused()
    const [GetTable, setGetTable] = useState([])
    const [refresh, setFresh] = useState(false);
    const [load, setLoad] = useState(false)
    const [checkTableId, setCheckTableId] = useState(false)
    const [changeThis, setChangeThis] = useState<any>()
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {

            setFresh(false)
        }, 1000)
    }

    useEffect(() => {
        if (isfocused) {
            getTableActive()
        }
    }, [isfocused])

    function getTableActive() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetAllTableActive",
        }
        axios(configuration)
            .then((res) => {
                setGetTable(res.data.data)
            }).catch((err) => {
                console.log(err);
            })
    }

    const changeNewtable = () => {
        if (changeThis) {
            setCheckTableId(false)
            const configuration = {
                method: "post",
                url: "http://localhost:3000/ChangeTableNow",
                data: {
                    oldid: item._id,
                    newid: changeThis,
                    cusid: item.customerid,
                    items: item.tableitems,
                    date: item.tabledate
                }
            }
            setLoad(true)
            setTimeout(() => {
                axios(configuration)
                    .then(() => {
                        setLoad(false)
                        navigation.navigate("EmployeeTable")
                    })
                    .catch((er) => {
                        setLoad(false)
                        console.log(er);
                    });
            }, 1000);
        } else {
            setCheckTableId(true)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <DrawerHeader title={"Change table"} />
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10 }} onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 17 }}>{"<"} Back</Text>
                    </TouchableOpacity>
                    <View style={{ paddingVertical: 15 }}>
                        {GetTable.map((i: any) => {
                            return (
                                <TouchableOpacity key={i._id} style={style.shadow} onPress={() => { changeThis === i._id ? setChangeThis(null) : setChangeThis(i._id) }}>
                                    <Text style={{ fontSize: 16 }}>{i.tablename}</Text>
                                    {changeThis === i._id ? (
                                        <View style={{ borderWidth: 1, borderColor: "transparent", borderRadius: 50, width: 25, height: 25, alignItems: "center", backgroundColor: "#03ba5f" }}><Text style={{ fontWeight: "bold", color: "#fff" }}>✓</Text></View>
                                    ) : (
                                        <View style={{ borderWidth: 1, borderColor: "gray", borderRadius: 50, width: 25, height: 25 }} />
                                    )}
                                </TouchableOpacity>
                            )
                        })}
                        {checkTableId ? (
                            <Text style={{ color: "red", paddingBottom: 15, textAlign: "center" }}>Choose table please!</Text>
                        ) : null}
                        <TouchableOpacity style={{ backgroundColor: "#FEA116", paddingVertical: 8, alignItems: "center" }} onPress={() => changeNewtable()}>
                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Confirm</Text>
                        </TouchableOpacity>
                        {load ? (
                            <ActivityIndicator size={25} color={"#FEA116"} style={{ paddingTop: 10 }} />
                        ) : null}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
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
        elevation: 3,
        backgroundColor: "#fff",
        marginVertical: 15,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})

export default ChangeTableEmp