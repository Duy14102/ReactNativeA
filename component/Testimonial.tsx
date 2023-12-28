import 'react-native-gesture-handler'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Testimonial() {
    const width = Dimensions.get('window').width;
    const [getUser, setGetUser] = useState([])

    useEffect(() => {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetTestiCont",
        }
        axios(configuration)
            .then((res) => {
                setGetUser(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const avatar = "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
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
                    data={getUser}
                    scrollAnimationDuration={1500}
                    renderItem={({ item }: { item: any }) => (
                        <View style={TestiStyle.carousel}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                <Icon name='quote-left' style={TestiStyle.quote} />
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>{item.title}</Text>
                            </View>
                            <Text style={TestiStyle.message}>{item.message}</Text>
                            <View style={TestiStyle.flexAble}>
                                <Image source={{ uri: avatar }} style={TestiStyle.avatar} />
                                <View>
                                    <Text style={TestiStyle.clientName}>{item.name}</Text>
                                    <Text style={{ color: "#fff", fontSize: 15 }}>{new Date(item.createdAt).toLocaleDateString() + " - " + new Date(item.createdAt).toLocaleTimeString()}</Text>
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
        fontSize: 30,
        color: "#fff",
    },

    carousel: {
        marginTop: 10,
        flex: 1,
        padding: 15,
        backgroundColor: "#FEA116",
        flexDirection: "column",
        gap: 15
    },

    message: {
        color: "#fff",
        fontSize: 18,
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
        gap: 10,
        position: "absolute",
        bottom: 15,
        left: 15
    },

    clientName: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20
    }
})

export default Testimonial