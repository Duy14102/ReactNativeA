import React, { useEffect, useRef } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, ImageBackground, Dimensions, Pressable, Animated, Easing } from 'react-native';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Services from '../component/Services';
import About from '../component/About';
import Menu from '../component/Menu';
import Testimonial from '../component/Testimonial';

function Home(): JSX.Element {
    const spinValue = useRef(new Animated.Value(0)).current;

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

    const BgImage = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700307517/UI/e4onxrx7hmgzmrbel9jk.webp" }
    const CircleImage = { uri: "https://res.cloudinary.com/dlev2viy9/image/upload/v1700309376/UI/oh2rwdomomeno4sgguhf.png" }
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <StatusBar />
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>

                <Header />

                <View style={styles.container}>

                    <ImageBackground source={BgImage} style={styles.bgimage} />

                    <View style={styles.overlay}>

                        <View style={{ top: 200, paddingHorizontal: 35, alignItems: "center" }}>

                            <Text style={styles.textInsideOverlay}>Hello!</Text>
                            <Text style={styles.textInsideOverlay}>This Is EatCom</Text>
                            <Text style={styles.textInsideOverlay2}>We hope you will have a great experience using our services. Have a good day!</Text>
                            <Pressable style={styles.bookATable}><Text style={styles.bookATableWord}>Book a table</Text></Pressable>

                            <View style={styles.CircleImage}>
                                <Animated.Image style={{ transform: [{ rotate: spin }], width: 300, height: 300 }} source={CircleImage} />
                            </View>

                        </View>


                    </View>

                    <Services />

                    <About />

                    <Menu />

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
