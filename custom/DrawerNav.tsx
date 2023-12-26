import AsyncStorage from "@react-native-async-storage/async-storage"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { jwtDecode } from "jwt-decode"
import { useState, useEffect } from "react"
import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome6"
import { useNavigation } from "@react-navigation/native";

function DrawerNav({ props }: { props: any }) {
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

    const logoutThis = async () => {
        try {
            await AsyncStorage.removeItem("TOKEN");
            navigation.navigate("Settings")
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#FEA116" }}>
                <ImageBackground source={{ uri: "https://st4.depositphotos.com/3664757/27559/i/450/depositphotos_275596086-stock-photo-ingredients-making-traditional-italian-pesto.jpg" }}>
                    <View style={{ padding: 20, flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', }}>
                        <View style={{ width: "100%", alignItems: "center", }}>
                            {candecode?.userImage ? (
                                <Image source={{ uri: candecode.userImage }} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }} />
                            ) : (
                                <Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" }} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }} />
                            )}
                            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>{candecode?.userName}</Text>
                            {candecode?.userRole === 4 ? (
                                <Text style={{ color: "#fff" }}>Administrator</Text>
                            ) : candecode?.userRole === 3 ? (
                                <Text style={{ color: "#fff" }}>Manager</Text>
                            ) : candecode?.userRole === 2 ? (
                                <Text style={{ color: "#fff" }}>Employee</Text>
                            ) : null}
                        </View>
                    </View>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: "#fff", paddingVertical: 5 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderWidth: 1, borderColor: "#ccc" }}>
                <TouchableOpacity onPress={() => navigation.navigate("CustomizeAdmins")} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon name="pen-to-square" size={22} solid />
                        <Text style={{ fontSize: 15, marginLeft: 6 }}>Customize your account</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => logoutThis()} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon name="right-to-bracket" size={22} solid />
                        <Text style={{ fontSize: 15, marginLeft: 6 }}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DrawerNav