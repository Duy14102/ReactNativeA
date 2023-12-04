import { ScrollView, View, Text, StyleSheet, SafeAreaView } from "react-native"
import Header from "../component/Header"
import Footer from "../component/Footer"

function Category() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
                <Header />
                <View style={{ flex: 1 }}>
                    <Text>Category</Text>
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

const cateStyle = StyleSheet.create({

})
export default Category