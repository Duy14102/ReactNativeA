import { StyleSheet, Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Header() {
    return (
        <View style={headerStyle.header}>
            <View style={headerStyle.textLogo}>
                <Icon style={headerStyle.textDisplay} name="utensils" />
                <Text style={headerStyle.textDisplay}>EatCom</Text>
            </View>
        </View>
    )
}

const headerStyle = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "#0F172B",
        width: "100%",
        height: 55
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
        alignItems: "center"
    },

})