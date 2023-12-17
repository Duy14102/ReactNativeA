import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity, ScrollView, StyleSheet, Dimensions, TextInput, ActivityIndicator, RefreshControl } from "react-native"
import Header from "../component/Header"
import Footer from "../component/Footer"
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect } from "react"
import axios from "axios"

function Contact({ route }: { route: any }) {
    const BgImage = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700307517/UI/e4onxrx7hmgzmrbel9jk.webp" }
    const keyword = "/"
    const navigation = useNavigation<any>()
    const [warning1, setWarning1] = useState(false)
    const [warning2, setWarning2] = useState(false)
    const [success, setSuccess] = useState(false)
    const [refresh, setFresh] = useState(false)
    const [load, setLoad] = useState(false)
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const { candecode } = route.params

    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            setTitle("")
            setMessage("")
            setSuccess(false)
            setWarning1(false)
            setWarning2(false)
            setLoad(false)
            setFresh(false)
        }, 1000)
    }

    useEffect(() => {
        if (success) {
            setTitle("")
            setMessage("")
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
        }
    }, [success])

    const addcontact = () => {
        const configuration = {
            method: "post",
            url: "http://192.168.1.217:3000/AddContact",
            data: {
                name: candecode.userName,
                email: candecode.userEmail,
                title,
                message
            }
        }
        if (title === "") {
            setWarning1(true)
            return false
        }
        if (message === "") {
            setWarning2(true)
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
                    console.log(er);
                })
        }, 1000)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <Header type={"Yes"} />
                <View style={{ flex: 1 }}>
                    <ImageBackground source={BgImage} style={contactStyle.bgimage} />
                    <View style={contactStyle.overlay}>
                        <View style={{ top: 200, paddingHorizontal: 35, alignItems: "center" }}>
                            <Text style={contactStyle.notiText}>Contact</Text>
                            <View style={contactStyle.flexible}>
                                <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                                    <Text style={{ color: "#FEA116", fontSize: 18 }}>User</Text>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, color: "gray" }}>{keyword}</Text>
                                <Text style={{ fontSize: 18, color: "#fff" }}>Contact</Text>
                            </View>
                        </View>
                    </View >
                    <View style={contactStyle.notifi}>
                        <Text style={contactStyle.mainText}>Contact</Text>
                        <View style={{ paddingVertical: 10, flexDirection: "column", gap: 5 }}>
                            <Text style={{ paddingLeft: 5, fontSize: 15, color: "#0F172B" }}>Title :</Text>
                            <TextInput style={{ borderWidth: 1, borderColor: "gray" }} value={title} onChange={(e) => setTitle(e.nativeEvent.text)} />
                            {warning1 ? (
                                <Text style={{ color: "red" }}>Title is needed!</Text>
                            ) : null}
                        </View>
                        <View style={{ paddingVertical: 10, flexDirection: "column", gap: 5 }}>
                            <Text style={{ paddingLeft: 5, fontSize: 15, color: "#0F172B" }}>Message :</Text>
                            <TextInput style={{ borderWidth: 1, borderColor: "gray", height: 100, verticalAlign: "top" }} value={message} onChange={(e) => setMessage(e.nativeEvent.text)} />
                            {warning2 ? (
                                <Text style={{ color: "red" }}>Message is needed!</Text>
                            ) : null}
                        </View>
                        <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: "#FEA116", alignItems: "center", marginVertical: 10 }} onPress={() => addcontact()}>
                            {load ? (
                                <ActivityIndicator size={21} color={"#fff"} />
                            ) : (
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Submit</Text>
                            )}
                        </TouchableOpacity>
                        {success ? (
                            <Text style={{ fontSize: 15, color: "#03ba5f" }}>✅ Submit succeeded!</Text>
                        ) : null}
                    </View>
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

const contactStyle = StyleSheet.create({
    notifi: {
        backgroundColor: "#fff",
        padding: 15,
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
export default Contact