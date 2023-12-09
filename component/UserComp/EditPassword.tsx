import { SafeAreaView, ScrollView, View, Text } from "react-native"
import Header from "../Header"
import Footer from "../Footer"

function EditPassword() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
                <Header type={"Yes"} />
                <View style={{ flex: 1 }}>

                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}
export default EditPassword