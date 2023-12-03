import { View, Text, Image, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

function About() {
    const image1 = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700307518/UI/k9axej6qza2mzsp8lwvj.webp" }
    const image2 = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700309635/UI/ixdn78iskyewdqszx4rf.webp" }
    const image3 = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700307517/UI/ucvurntwkq3pgbvq8scl.webp" }
    const image4 = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700307517/UI/irnkhvizbt88rhedgys2.webp" }
    return (
        <View style={aboutStyle.about}>
            <View style={{ marginBottom: 65 }}>
                <View style={aboutStyle.flexImg}>
                    <View style={aboutStyle.imageBig}>
                        <Image source={image1} style={aboutStyle.imagE}></Image>
                    </View>
                    <View style={[aboutStyle.imageSmall, { marginTop: "10.8%" }]}>
                        <Image source={image2} style={aboutStyle.imagE2}></Image>
                    </View>
                </View>
                <View style={[aboutStyle.flexImg, { marginTop: 10 }]}>
                    <View style={[aboutStyle.imageSmall, { alignItems: "flex-end" }]}>
                        <Image source={image3} style={aboutStyle.imagE2}></Image>
                    </View>
                    <View style={aboutStyle.imageBig}>
                        <Image source={image4} style={aboutStyle.imagE}></Image>
                    </View>
                </View>
                <View style={aboutStyle.aboutUs}>
                    <Text style={aboutStyle.headUp}>About us</Text>
                    <Text style={aboutStyle.headUp}>━━</Text>
                </View>
                <Text style={aboutStyle.welcomeText}>Welcome to <Icon name='utensils' style={{ fontSize: 22, color: "#FEA116" }}></Icon><Text style={{ color: "#FEA116" }}>EatCom</Text> restaurant</Text>
                <Text style={aboutStyle.textAbout}>We started from a small cart with a variety of rice dishes. Time passed and gradually more people got to know us and the name EatCom was born.</Text>
                <Text style={aboutStyle.textAbout}>We always feel lucky to have received support from everyone, EatCom always brings diners perfect rice dishes from delicious to clean and beautiful.Thank you for trusting and using our services</Text>
                <Text style={aboutStyle.textAbout}>Enjoy your dishes, if something happens please report right away. And once again thank you!</Text>
            </View>
        </View>
    )
}

const aboutStyle = StyleSheet.create({
    about: {
        backgroundColor: "#fff",
        paddingHorizontal: 15
    },

    imageBig: {
        width: "47%",
        height: 150
    },

    imageSmall: {
        width: "47%",
        height: 110,
    },

    imagE: {
        width: "100%",
        height: "100%"
    },

    imagE2: {
        width: 130,
        height: "100%"
    },

    flexImg: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 12
    },

    aboutUs: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingTop: 20
    },

    headUp: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#FEA116"
    },

    welcomeText: {
        color: "#0F172B",
        fontSize: 24,
        fontWeight: "bold",
    },

    textAbout: {
        paddingTop: 15,
        fontSize: 15,
        color: "#666565"
    }
})

export default About