import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, ImageBackground, Dimensions, Pressable, Animated, Easing, ActivityIndicator, RefreshControl } from 'react-native';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Services from '../component/Services';
import About from '../component/About';
import Testimonial from '../component/Testimonial';
import axios from 'axios';
import HTMLReactParser from 'html-react-parser';

function Home(): JSX.Element {
    var word1 = null
    var word2 = null
    var word3 = null
    const [styleA, setStyleA] = useState()
    const [styleB, setStyleB] = useState()
    const [load1, setload1] = useState(false)
    const [load2, setload2] = useState(false)
    const [refresh, setFresh] = useState(false)
    const [text, setText] = useState<any>()
    const spinValue = useRef(new Animated.Value(0)).current;

    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            HeroApi2()
            HeroApi()
            TextApi()
            setFresh(false)
        }, 1000)
    }

    useEffect(() => {
        HeroApi2()
        HeroApi()
        TextApi()
    }, [])

    function HeroApi2() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetHeroUI",
            params: {
                name: "oh2rwdomomeno4sgguhf"
            }
        }
        setload1(true)
        axios(configuration)
            .then((res) => {
                setload1(false)
                setStyleA(res.data.data)
            }).catch((err) => {
                setload1(false)
                console.log(err);
            })
    }

    function HeroApi() {
        const configuration2 = {
            method: "get",
            url: "http://localhost:3000/GetHeroUI",
            params: {
                name: "e4onxrx7hmgzmrbel9jk"
            }
        }
        setload2(true)
        axios(configuration2)
            .then((res) => {
                setload2(false)
                setStyleB(res.data.data)
            }).catch((err) => {
                setload2(false)
                console.log(err);
            })
    }

    function TextApi() {
        const configuration3 = {
            method: "get",
            url: "http://localhost:3000/GetHeroText",
        }
        axios(configuration3)
            .then((res) => {
                setText(res.data.data)
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        Animated.loop(
            Animated.timing(
                spinValue,
                {
                    toValue: 1,
                    duration: 20000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        ).start();
    }, [spinValue])

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    if (text?.up) {
        word1 = HTMLReactParser(text?.up)
    }
    if (text?.middle) {
        word2 = HTMLReactParser(text?.middle)
    }
    if (text?.down) {
        word3 = HTMLReactParser(text?.down)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <StatusBar />
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>

                <Header type={null} />

                <View style={styles.container}>
                    {load1 ? (
                        <View style={styles.bgimage}>
                            <ActivityIndicator size="large" style={{ top: "10%" }} color={"#FEA116"} />
                        </View>
                    ) : null}
                    {styleB ? (
                        <ImageBackground source={{ uri: styleB }} style={styles.bgimage} />
                    ) : null}

                    <View style={styles.overlay}>

                        <View style={{ top: 200, paddingHorizontal: 35, alignItems: "center" }}>

                            <Text style={styles.textInsideOverlay}>{word1}</Text>
                            <Text style={styles.textInsideOverlay}>{word2}</Text>
                            <Text style={styles.textInsideOverlay2}>{word3}</Text>
                            <Pressable style={styles.bookATable}><Text style={styles.bookATableWord}>Book a table</Text></Pressable>

                            <View style={styles.CircleImage}>
                                {load2 ? (
                                    <ActivityIndicator size="large" style={{ top: "10%" }} color={"#FEA116"} />
                                ) : null}
                                {styleA ? (
                                    <Animated.Image style={{ transform: [{ rotate: spin }], width: 300, height: 300 }} source={{ uri: styleA }} />
                                ) : null}
                            </View>

                        </View>


                    </View>

                    <Services />

                    <About />

                    <Testimonial />

                </View>

                <Footer />

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    bgimage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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

    textInsideOverlay: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold"
    },

    textInsideOverlay2: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
    },

    bookATable: {
        alignItems: "center",
        marginTop: 15,
        width: 110,
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: "#FEA116"
    },

    bookATableWord: {
        color: "#fff",
        fontWeight: "bold"
    },

    CircleImage: {
        marginTop: 30
    }
});

export default Home;
