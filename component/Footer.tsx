import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios';

export default function Footer() {
    const word = ">"
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [time, setTime] = useState()

    useEffect(() => {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetTheFooter"
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
            <View style={{ backgroundColor: "gray", padding: 0.2 }} />
            <Text style={{ textAlign: "center", paddingTop: 15, color: "#0F172B", fontSize: 15 }}>© EatCom, All Right Reserved.</Text>
            <View style={{ backgroundColor: "transparent", height: 70 }}></View>
        </View>
    )
}

const footerStyle = StyleSheet.create({
    footer: {
        backgroundColor: "#fff",
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 15
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