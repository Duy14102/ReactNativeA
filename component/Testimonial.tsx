import 'react-native-gesture-handler'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/FontAwesome5'

function Testimonial() {
    const width = Dimensions.get('window').width;
    const array = ["David", "Liams", "Faker", "Cr7", "Messi"]
    const avatar = { uri: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" }
    return (
        <View style={TestiStyle.Testi}>
            <View style={{ marginBottom: 65, alignItems: "center" }}>
                <View style={TestiStyle.aboutUs}>
                    <Text style={TestiStyle.headUp}>━━━</Text>
                    <Text style={TestiStyle.headUp}>Testimonial</Text>
                    <Text style={TestiStyle.headUp}>━━━</Text>
                </View>
                <Text style={TestiStyle.clientSay}>Our Clients Say!!!</Text>
                <Carousel
                    loop
                    width={width}
                    height={width / 2 + 30}
                    autoPlay={true}
                    data={array}
                    scrollAnimationDuration={1500}
                    renderItem={({ item }) => (
                        <View style={TestiStyle.carousel}>
                            <Icon name='quote-left' style={TestiStyle.quote} />
                            <Text style={TestiStyle.message}>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</Text>
                            <View style={TestiStyle.flexAble}>
                                <View style={TestiStyle.fatherAvatar}>
                                    <Image source={avatar} style={TestiStyle.avatar} />
                                </View>
                                <View>
                                    <Text style={TestiStyle.clientName}>{item}</Text>
                                    <Text style={{ color: "#fff" }}>{item}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const TestiStyle = StyleSheet.create({
    Testi: {
        backgroundColor: "#fff",
        paddingHorizontal: 15
    },

    aboutUs: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    headUp: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#FEA116"
    },

    clientSay: {
        color: "#0F172B",
        fontWeight: "bold",
        fontSize: 25
    },

    quote: {
        fontSize: 33,
        color: "#fff",
    },

    carousel: {
        marginTop: 10,
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: "#FEA116"
    },

    message: {
        color: "#fff",
        fontSize: 19,
        paddingTop: 15
    },

    fatherAvatar: {
        paddingTop: 15,
        borderRadius: 40
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 40
    },

    flexAble: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },

    clientName: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20
    }
})

export default Testimonial