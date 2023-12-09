import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Header({ type }: { type: any }) {
    const navigation = useNavigation<any>()
    return (
        <View style={headerStyle.header}>
            {type ? (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 18, color: "#FEA116" }}>{"< Back"}</Text>
                </TouchableOpacity>
            ) : (
                <Icon name='bell' size={22} color={"transparent"} />
            )}
            <View style={headerStyle.textLogo}>
                <Icon style={headerStyle.textDisplay} name="utensils" />
                <Text style={[headerStyle.textDisplay, { fontWeight: "bold" }]}>EatCom</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                <Icon name='bell' size={22} color={"#FEA116"} />
            </TouchableOpacity>
        </View>
    )
}

const headerStyle = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "#0F172B",
        width: "100%",
        height: 55,
        position: "relative"
    },

    textDisplay: {
        color: "#FEA116",
        fontSize: 18
    },

    textLogo: {
        color: "#FEA116",
        fontSize: 18,
        gap: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        left: "43%"
    },

})