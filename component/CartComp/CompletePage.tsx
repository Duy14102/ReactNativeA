import { ScrollView, View, Text, TouchableOpacity, RefreshControl, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../Footer";
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from "@react-navigation/native";

function CompletePage({ index, jumpTo }: { index: any, jumpTo: any }) {
    const navigation = useNavigation<any>()
    const [candecode, setCandecode] = useState<any>(null)
    const [refresh, setFresh] = useState(false);
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {

            setFresh(false)
        }, 1000)
    }

    const getDataExists = async () => {
        try {
            const token = await AsyncStorage.getItem('complete');
            if (token) {
                setCandecode(token)
            } else {
                jumpTo("first")
                setCandecode(null)
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (index === 2) {
            getDataExists()
        }
    }, [index])

    const copyToClipboard = (e: any) => {
        Clipboard.setString(e);
    };

    setTimeout(async () => {
        await AsyncStorage.removeItem("complete")
    }, 60000);
    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
            <View style={{ flex: 1, padding: 15, backgroundColor: "#fff", height: 350 }}>
                <Text style={{ fontWeight: "bold", fontSize: 21, textAlign: "center", color: "#FEA116" }}>Thank You!</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 17, paddingVertical: 8 }}><Text style={{ fontWeight: "bold" }}>Order id</Text> : {candecode}</Text>
                    <TouchableOpacity onPress={() => copyToClipboard(candecode)}>
                        <Text style={{ fontSize: 16, color: "#FEA116" }}>Copy</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingVertical: 20 }}>
                    <TouchableOpacity style={styles.shadow} onPress={() => navigation.navigate("Searchs")}>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}><Text style={{ color: "black" }}>🔍</Text> Search detail</Text>
                    </TouchableOpacity>
                    <Text>Or</Text>
                    <TouchableOpacity style={styles.shadow} onPress={() => navigation.navigate("Categorys")}>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}><Text style={{ color: "black" }}>🛍️</Text> Go shopping</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Image source={{ uri: "https://cdn.icon-icons.com/icons2/881/PNG/512/Rice_Bowl_icon-icons.com_68695.png" }} width={150} height={150} />
                </View>
            </View>
            <Footer />
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: "#f9f9f9", paddingVertical: 8, paddingHorizontal: 10
    }
})

export default CompletePage