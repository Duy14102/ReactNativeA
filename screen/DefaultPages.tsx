import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl } from "react-native";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useState } from "react";

function DefaultPages() {
    const [refresh, setFresh] = useState(false);
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {

            setFresh(false)
        }, 1000)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <Header type={null} />
                <View style={{ flex: 1 }}>

                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

export default DefaultPages