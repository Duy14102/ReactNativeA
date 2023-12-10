import { View, Text, Image, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useEffect, useState } from 'react';
import axios from 'axios';
import HTMLReactParser from 'html-react-parser';

function About() {
    var word1 = null
    var word2 = null
    var word3 = null
    const [getLaid, setGetLaid] = useState<any>()
    useEffect(() => {
        const configuration = {
            method: "get",
            url: "http://192.168.1.216:3000/GetAllAbout"
        }
        axios(configuration)
            .then((res) => {
                setGetLaid(res.data.data)
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    if (getLaid?.word.up) {
        word1 = HTMLReactParser(getLaid?.word.up)
    }
    if (getLaid?.word.middle) {
        word2 = HTMLReactParser(getLaid?.word.middle)
    }
    if (getLaid?.word.down) {
        word3 = HTMLReactParser(getLaid?.word.down)
    }

    return (
        <View style={aboutStyle.about}>
            <View style={{ marginBottom: 65 }}>
                <View style={aboutStyle.flexImg}>
                    <View style={aboutStyle.imageBig}>
                        {getLaid?.image.map((i: any) => {
                            if (i.name === "k9axej6qza2mzsp8lwvj") {
                                return (
                                    <Image key={i.name} source={{ uri: i.url }} style={aboutStyle.imagE}></Image>
                                )
                            }
                            return null
                        })}
                    </View>
                    <View style={[aboutStyle.imageSmall, { marginTop: "10.8%" }]}>
                        {getLaid?.image.map((i: any) => {
                            if (i.name === "ixdn78iskyewdqszx4rf") {
                                return (
                                    <Image key={i.name} source={{ uri: i.url }} style={aboutStyle.imagE2}></Image>
                                )
                            }
                            return null
                        })}
                    </View>
                </View>
                <View style={[aboutStyle.flexImg, { marginTop: 10 }]}>
                    <View style={[aboutStyle.imageSmall, { alignItems: "flex-end" }]}>
                        {getLaid?.image.map((i: any) => {
                            if (i.name === "ucvurntwkq3pgbvq8scl") {
                                return (
                                    <Image key={i.name} source={{ uri: i.url }} style={aboutStyle.imagE2}></Image>
                                )
                            }
                            return null
                        })}
                    </View>
                    <View style={aboutStyle.imageBig}>
                        {getLaid?.image.map((i: any) => {
                            if (i.name === "irnkhvizbt88rhedgys2") {
                                return (
                                    <Image key={i.name} source={{ uri: i.url }} style={aboutStyle.imagE}></Image>
                                )
                            }
                            return null
                        })}
                    </View>
                </View>
                <View style={aboutStyle.aboutUs}>
                    <Text style={aboutStyle.headUp}>About us</Text>
                    <Text style={aboutStyle.headUp}>━━</Text>
                </View>
                <Text style={aboutStyle.welcomeText}>Welcome to <Icon name='utensils' style={{ fontSize: 22, color: "#FEA116" }}></Icon><Text style={{ color: "#FEA116" }}>EatCom</Text> restaurant</Text>
                <Text style={aboutStyle.textAbout}>{word1}</Text>
                <Text style={aboutStyle.textAbout}>{word2}</Text>
                <Text style={aboutStyle.textAbout}>{word3}</Text>
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