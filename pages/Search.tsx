import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, Dimensions } from "react-native"
import Header from "../component/Header"
import Footer from "../component/Footer"
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from "@react-navigation/native"

function Search() {
    const navigation = useNavigation<any>()
    const BgImage = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700307517/UI/e4onxrx7hmgzmrbel9jk.webp" }
    const keyword = "/"
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
                <Header type={null} />
                <View style={{ flex: 1 }}>
                    <ImageBackground source={BgImage} style={searchStyle.bgimage} />
                    <View style={searchStyle.overlay}>
                        <View style={{ top: 200, paddingHorizontal: 35, alignItems: "center" }}>
                            <Text style={searchStyle.notiText}>Search item</Text>
                            <View style={searchStyle.flexible}>
                                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                    <Text style={{ color: "#FEA116", fontSize: 18 }}>Home</Text>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, color: "gray" }}>{keyword}</Text>
                                <Text style={{ fontSize: 18, color: "#fff" }}>Search item</Text>
                            </View>
                        </View>
                    </View >
                    <View style={searchStyle.notifi}>
                        <Text style={searchStyle.mainText}>Search item</Text>
                        <View style={{ width: "100%" }}>
                            <Text style={{ paddingLeft: 10, paddingBottom: 5, color: "#0F172B", fontSize: 15 }}>Item name : </Text>
                            <View style={{ backgroundColor: "#e3e3e3", borderRadius: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <TextInput style={{ width: "90%" }} />
                                <TouchableOpacity style={{ width: "10%" }}>
                                    <Icon name="search" style={{ width: "100%", fontSize: 18 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

const searchStyle = StyleSheet.create({
    buttonNo1: {
        backgroundColor: "#FEA116",
        borderRadius: 8,
        padding: 10
    },
    buttonNo1Text: {
        color: "#fff",
        fontWeight: "bold"
    },
    input: {
        backgroundColor: "#e3e3e3",
        borderRadius: 8,
        width: "100%"
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
    },

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
})
export default Search