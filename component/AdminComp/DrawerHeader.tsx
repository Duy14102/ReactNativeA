import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

function DrawerHeader({ title }: { title: any }) {
    const navigation = useNavigation<any>()
    const [candecode, SetCandecode] = useState<any>()

    useEffect(() => {
        const dataType = async () => {
            const token = await AsyncStorage.getItem("TOKEN")
            if (token) {
                SetCandecode(jwtDecode(token))
            }
        }
        dataType()
    }, [])
    return (
        <View style={{ borderBottomWidth: 1, borderColor: "#ccc", padding: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{title}</Text>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                {candecode?.userImage ? (
                    <Image source={{ uri: candecode?.userImage }} style={{ width: 30, height: 30 }} />
                ) : (
                    <Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" }} style={{ width: 40, height: 40, resizeMode: "contain", borderRadius: 50 }} />
                )}
            </TouchableOpacity>
        </View>
    )
}

export default DrawerHeader