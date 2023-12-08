import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from "react-native";
import Header from "../component/Header";
import Footer from "../component/Footer";

function Cart() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
                <Header />
                <View style={{ flex: 1 }}>

                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Cart