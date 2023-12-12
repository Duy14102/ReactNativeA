import { SafeAreaView, StyleSheet, View, ScrollView, Text, ImageBackground, Dimensions, TouchableOpacity, RefreshControl } from "react-native"
import Header from "../component/Header"
import Footer from "../component/Footer"
import { useState } from "react"

function Notification({ navigation }: { navigation: any }) {
    const [refresh, setFresh] = useState(false);
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {

            setFresh(false)
        }, 1000)
    }
    const BgImage = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700307517/UI/e4onxrx7hmgzmrbel9jk.webp" }
    const keyword = "/"
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <Header type={"Yes"} />
                <View style={{ flex: 1 }}>
                    <ImageBackground source={BgImage} style={NotiStyle.bgimage} />
                    <View style={NotiStyle.overlay}>
                        <View style={{ top: 200, paddingHorizontal: 35, alignItems: "center" }}>
                            <Text style={NotiStyle.notiText}>Notification</Text>
                            <View style={NotiStyle.flexible}>
                                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                    <Text style={{ color: "#FEA116", fontSize: 18 }}>Home</Text>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, color: "gray" }}>{keyword}</Text>
                                <Text style={{ fontSize: 18, color: "#fff" }}>Notification</Text>
                            </View>
                        </View>
                    </View >
                    <View style={NotiStyle.notifi}>
                        <Text style={NotiStyle.mainText}>Announcement</Text>
                        <Text>There's no notification yet !</Text>
                    </View>
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

const NotiStyle = StyleSheet.create({
    notifi: {
        backgroundColor: "#fff",
        padding: 15,
        alignItems: "center"
    },

    mainText: {
        textAlign: "center",
        color: "#0F172B",
        fontSize: 18,
        fontWeight: "bold"
    },

    bgimage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
        resizeMode: "cover",
        backgroundColor: "black",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(15, 23, 43, .9)',
    },

    notiText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 25
    },

    flexible: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        paddingVertical: 15
    }
})
export default Notification