import { SafeAreaView, View, Text, StyleSheet, ScrollView, TextInput, Dimensions, ImageBackground, TouchableOpacity, Image } from "react-native"
import Header from "../component/Header"
import Footer from "../component/Footer"

function Signup({ navigation }: { navigation: any }) {
    const BgImage = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700307517/UI/e4onxrx7hmgzmrbel9jk.webp" }
    const google = { uri: "https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227" }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
                <Header />
                <View style={settingStyle.container}>
                    <ImageBackground source={BgImage} style={settingStyle.bgimage} />
                    <View style={settingStyle.borderLog}>
                        <View style={settingStyle.insideLog}>
                            <Text style={settingStyle.loginText}>Signup</Text>
                            <View style={settingStyle.fatherInput}>
                                <Text style={settingStyle.mochText}>Email</Text>
                                <TextInput style={settingStyle.input} />
                                <Text style={[settingStyle.mochText, { paddingTop: 15 }]}>Password</Text>
                                <TextInput style={settingStyle.input} />
                                <Text style={[settingStyle.mochText, { paddingTop: 15 }]}>Confirm password</Text>
                                <TextInput style={settingStyle.input} />
                                <Text style={[settingStyle.mochText, { paddingTop: 15 }]}>Full name</Text>
                                <TextInput style={settingStyle.input} />
                                <Text style={[settingStyle.mochText, { paddingTop: 15 }]}>Phone number</Text>
                                <TextInput style={[settingStyle.input, { marginBottom: 30 }]} />
                                <TouchableOpacity style={settingStyle.loginButton}>
                                    <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Signup</Text>
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

const settingStyle = StyleSheet.create({
    container: {
        flex: 1,
    },

    loginText: {
        color: "#0F172B",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center"
    },

    borderLog: {
        borderWidth: 1,
        alignItems: "center",
        paddingVertical: 15,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(15, 23, 43, .9)',
    },

    insideLog: {
        backgroundColor: "#fff",
        top: "35%",
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingVertical: 25
    },

    fatherInput: {
        paddingTop: 15,
        paddingHorizontal: 15,
        width: "100%"
    },

    input: {
        borderRadius: 10,
        backgroundColor: "rgb(243 244 246)",
        width: "100%"
    },

    mochText: {
        color: "#0F172B",
        paddingLeft: 10,
        paddingBottom: 5,
        fontSize: 15,
    },

    bgimage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 0.8,
        resizeMode: "cover",
        backgroundColor: "black",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
    },

    loginButton: {
        alignItems: "center",
        backgroundColor: "#FEA116",
        paddingVertical: 12,
        borderRadius: 10
    }
})
export default Signup