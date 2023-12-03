import { StyleSheet, Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Footer() {
    const word = ">"
    return (
        <View style={footerStyle.footer}>
            <View style={footerStyle.insideFooter}>
                <View style={footerStyle.aboutUs}>
                    <Text style={footerStyle.headUp}>About us</Text>
                    <Text style={footerStyle.headUp}>━━</Text>
                </View>
                <Text style={footerStyle.textOfAboutUs}>EatCom's official and only website. Currently we only accept orders on the website and not anywhere else!</Text>
                <View style={footerStyle.aboutUs}>
                    <Text style={footerStyle.headUp}>Category</Text>
                    <Text style={footerStyle.headUp}>━━</Text>
                </View>
                <View style={footerStyle.category}>
                    <Pressable><Text style={{ color: "#fff" }}>{word} Meat</Text></Pressable>
                    <Pressable><Text style={{ color: "#fff" }}>{word} Vegetables</Text></Pressable>
                    <Pressable><Text style={{ color: "#fff" }}>{word} Drink</Text></Pressable>
                </View>
                <View style={footerStyle.aboutUs}>
                    <Text style={footerStyle.headUp}>Opening</Text>
                    <Text style={footerStyle.headUp}>━━</Text>
                </View>
                <View style={footerStyle.category}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>All week</Text>
                    <Text style={{ color: "#fff" }}>08AM - 22PM</Text>
                </View>
                <View style={footerStyle.aboutUs}>
                    <Text style={footerStyle.headUp}>Contact</Text>
                    <Text style={footerStyle.headUp}>━━</Text>
                </View>
                <View style={footerStyle.category}>
                    <View style={footerStyle.contact}>
                        <Icon style={footerStyle.textContact} name='map-marker-alt'></Icon>
                        <Text style={footerStyle.textContact}>VTC Academy, Hanoi, Vietnam</Text>
                    </View>
                    <View style={footerStyle.contact}>
                        <Icon style={footerStyle.textContact} name='phone-alt'></Icon>
                        <Text style={footerStyle.textContact}>+123 456 789</Text>
                    </View>
                    <View style={footerStyle.contact}>
                        <Icon style={footerStyle.textContact} name='envelope'></Icon>
                        <Text style={footerStyle.textContact}>Freefire@gmail.com</Text>
                    </View>
                </View>
                <View
                    style={{
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1,
                        left: 5,
                        right: 5,
                        paddingVertical: 15
                    }}
                />
                <Text style={{ textAlign: "center", paddingTop: 15, color: "#fff" }}>© EatCom, All Right Reserved.</Text>
            </View>
        </View>
    )
}

const footerStyle = StyleSheet.create({
    footer: {
        flex: 0,
        backgroundColor: "#0F172B",
        width: "100%",
        paddingLeft: 15,
        paddingRight: 15,
    },

    insideFooter: {
        paddingVertical: 25
    },

    aboutUs: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingTop: 20
    },

    headUp: {
        color: "#FEA116"
    },

    textOfAboutUs: {
        paddingTop: 3,
        color: "#fff"
    },

    category: {
        paddingTop: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3
    },

    contact: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },

    textContact: {
        color: "#fff"
    }
})