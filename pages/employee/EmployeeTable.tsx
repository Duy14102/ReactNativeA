import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl } from "react-native";
import { useState } from "react";
import DrawerHeader from "../../component/AdminComp/DrawerHeader";

function EmployeeTable() {
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
                <DrawerHeader title={"Table management"} />
                <View style={{ flex: 1 }}>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EmployeeTable