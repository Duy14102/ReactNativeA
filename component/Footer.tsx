import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios';
import HTMLReactParser from "html-react-parser";

export default function Footer() {
    const word = ">"
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [time, setTime] = useState()

    useEffect(() => {
        const configuration = {
            method: "get",
            url: "http://192.168.1.216:3000/GetTheFooter"
        }
        axios(configuration)
            .then((res) => {
                setAddress(res.data.data.word.up)
                setPhone(res.data.data.word.middle)
                setEmail(res.data.data.word.down)
                setTime(res.data.data.word.time)
            }).catch((err) => {
                console.log(err);
            })
    }, [])
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
                    <Pressable><Text style={{ color: "#fff", fontSize: 15 }}>{word} Meat</Text></Pressable>
                    <Pressable><Text style={{ color: "#fff", fontSize: 15 }}>{word} Vegetables</Text></Pressable>
                    <Pressable><Text style={{ color: "#fff", fontSize: 15 }}>{word} Drink</Text></Pressable>
                </View>
                <View style={footerStyle.aboutUs}>
                    <Text style={footerStyle.headUp}>Opening</Text>
                    <Text style={footerStyle.headUp}>━━</Text>
                </View>
                <View style={footerStyle.category}>
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>All week</Text>
                    <Text style={{ color: "#fff", fontSize: 15 }}>{HTMLReactParser(`${time}`)}</Text>
                </View>
                <View style={footerStyle.aboutUs}>
                    <Text style={footerStyle.headUp}>Contact</Text>
                    <Text style={footerStyle.headUp}>━━</Text>
                </View>
                <View style={footerStyle.category}>
                    <View style={footerStyle.contact}>
                        <Icon style={footerStyle.textContact} name='map-marker-alt'></Icon>
                        <Text style={footerStyle.textContact}>{HTMLReactParser(`${address}`)}</Text>
                    </View>
                    <View style={footerStyle.contact}>
                        <Icon style={footerStyle.textContact} name='phone-alt'></Icon>
                        <Text style={footerStyle.textContact}>{HTMLReactParser(`${phone}`)}</Text>
                    </View>
                    <View style={footerStyle.contact}>
                        <Icon style={footerStyle.textContact} name='envelope'></Icon>
                        <Text style={footerStyle.textContact}>{HTMLReactParser(`${email}`)}</Text>
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
                <Text style={{ textAlign: "center", paddingTop: 15, color: "#fff", fontSize: 15 }}>© EatCom, All Right Reserved.</Text>
            </View>
            <View style={{ backgroundColor: "transparent", height: 60 }}></View>
        </View>
    )
}

const footerStyle = StyleSheet.create({
    footer: {
        backgroundColor: "#0F172B",
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
        color: "#FEA116",
        fontSize: 18
    },

    textOfAboutUs: {
        paddingTop: 3,
        color: "#fff",
        fontSize: 15
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
        gap: 5,
    },

    textContact: {
        color: "#fff",
        fontSize: 15
    }
})