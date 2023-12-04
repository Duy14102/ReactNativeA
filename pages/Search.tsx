import { SafeAreaView, View, ScrollView, Text } from "react-native"
import Header from "../component/Header"
import Footer from "../component/Footer"

function Search() {
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
export default Search