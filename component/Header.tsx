import { StyleSheet, Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Header() {
    return (
        <View style={headerStyle.header}>
            <View style={headerStyle.textLogo}>
                <Icon style={headerStyle.textDisplay} name="utensils" />
                <Text style={headerStyle.textDisplay}>EatCom</Text>
            </View>
            <View style={headerStyle.headerSite}>
                <Icon name='shopping-cart' style={headerStyle.textDisplay}></Icon>
                <Pressable><Icon name='bars' style={headerStyle.bars} /></Pressable>
            </View>
        </View>
    )
}

const headerStyle = StyleSheet.create({
    header: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "#0F172B",
        width: "100%",
        height: 55
    },

    headerSite: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
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

    bars: {
        fontSize: 18,
        color: "#FFFFFF8C",
        borderColor: "#FFFFFF8C",
        borderWidth: 1,
        paddingLeft: 8,
        paddingRight: 6,
        paddingVertical: 4
    }

})