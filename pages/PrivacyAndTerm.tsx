import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity, ScrollView, StyleSheet, Dimensions, RefreshControl } from "react-native"
import Header from "../component/Header"
import Footer from "../component/Footer"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"

function PrivacyAndTerm() {
    const navigation = useNavigation<any>()
    const BgImage = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700307517/UI/e4onxrx7hmgzmrbel9jk.webp" }
    const keyword = "/"
    const [refresh, setFresh] = useState(false)
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            setFresh(false)
        }, 1000)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <Header type={"Yes"} />
                <View style={{ flex: 1 }}>
                    <ImageBackground source={BgImage} style={PnT.bgimage} />
                    <View style={PnT.overlay}>
                        <View style={{ top: 60, paddingHorizontal: 35, alignItems: "center" }}>
                            <Text style={PnT.notiText}>Privacy and Term</Text>
                            <View style={PnT.flexible}>
                                <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                                    <Text style={{ color: "#FEA116", fontSize: 18 }}>User</Text>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, color: "gray" }}>{keyword}</Text>
                                <Text style={{ fontSize: 18, color: "#fff" }}>Privacy and Term</Text>
                            </View>
                        </View>
                    </View >
                    <View style={PnT.notifi}>
                        <Text style={PnT.mainText}>Privacy Policy || Terms & Condition</Text>
                        <View style={{ flexDirection: "column", paddingVertical: 15, gap: 8 }}>
                            <Text style={PnT.secondText}>• Effective Date: May 2022</Text>
                            <Text style={PnT.secondText}>• Carriage Restaurant ("us", "we", or "our") operates the www.carriagehousemackinac.com website (the "Service").</Text>
                            <Text style={PnT.secondText}>• This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</Text>
                            <Text style={PnT.secondText}>• We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from www.carriagehousemackinac.com</Text>
                        </View>
                        <View style={{ flexDirection: "column", paddingVertical: 15, gap: 20 }}>
                            <View style={{ flexDirection: "column", gap: 3 }}>
                                <Text style={PnT.secondTextHead}>PERSONAL DATA</Text>
                                <Text style={PnT.secondText}>Personal Data means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).</Text>
                            </View>
                            <View style={{ flexDirection: "column", gap: 3 }}>
                                <Text style={PnT.secondTextHead}>USAGE DATA</Text>
                                <Text style={PnT.secondText}>Usage Data is data collected automatically either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</Text>
                            </View>
                            <View style={{ flexDirection: "column", gap: 3 }}>
                                <Text style={PnT.secondTextHead}>COOKIES</Text>
                                <Text style={PnT.secondText}>Cookies are small pieces of data stored on a User's device.</Text>
                            </View>
                            <View style={{ flexDirection: "column", gap: 3 }}>
                                <Text style={PnT.secondTextHead}>DATA CONTROLLER</Text>
                                <Text style={PnT.secondText}>Data Controller means a person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal data are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data.</Text>
                            </View>
                            <View style={{ flexDirection: "column", gap: 3 }}>
                                <Text style={PnT.secondTextHead}>DATA PROCESSOR (OR SERVICE PROVIDERS)</Text>
                                <Text style={PnT.secondText}>Data Processor (or Service Provider) means any person (other than an employee of the Data Controller) who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively.</Text>
                            </View>
                            <View style={{ flexDirection: "column", gap: 3 }}>
                                <Text style={PnT.secondTextHead}>DATA SUBJECT</Text>
                                <Text style={PnT.secondText}>Data Subject is any living individual who is the subject of Personal Data.</Text>
                            </View>
                            <View style={{ flexDirection: "column", gap: 3 }}>
                                <Text style={PnT.secondTextHead}>USER</Text>
                                <Text style={PnT.secondText}>The User is the individual using our Service. The User corresponds to the Data Subject, who is the subject of Personal Data.</Text>
                            </View>
                            <View style={{ flexDirection: "column", gap: 3 }}>
                                <Text style={PnT.secondTextHead}>INFORMATION COLLECTION AND USE</Text>
                                <Text style={PnT.secondText}>We collect several different types of information for various purposes to provide and improve our Service to you.</Text>
                            </View>
                            <View style={{ flexDirection: "column", gap: 3 }}>
                                <Text style={PnT.secondTextHead}>CONTACT US</Text>
                                <Text style={PnT.secondText}>If you have any questions about this Privacy Policy, please contact us:</Text>
                                <Text style={PnT.secondText}>• By email: FreeFire@SDTHT.com</Text>
                                <Text style={PnT.secondText}>• By phone number: +012 345 67890</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

const PnT = StyleSheet.create({
    notifi: {
        backgroundColor: "#fff",
        padding: 15,
    },

    secondText: {
        color: "#0F172B",
        fontSize: 15
    },

    secondTextHead: {
        color: "#0F172B",
        fontSize: 15,
        fontWeight: "bold"
    },

    mainText: {
        textAlign: "center",
        color: "#FEA116",
        fontSize: 18,
        fontWeight: "bold"
    },

    bgimage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 4,
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
export default PrivacyAndTerm