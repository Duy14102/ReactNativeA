import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

function Menu() {
    return (
        <View style={menuStyle.menu}>
            <View style={{ marginBottom: 65, alignItems: "center" }}>
                <View style={menuStyle.aboutUs}>
                    <Text style={menuStyle.headUp}>━━━</Text>
                    <Text style={menuStyle.headUp}>Food Menu</Text>
                    <Text style={menuStyle.headUp}>━━━</Text>
                </View>
                <View style={menuStyle.fatherFlexCate}>
                    <View style={menuStyle.flexCate}>
                        <Icon name='drumstick-bite' style={menuStyle.cateIcon}></Icon>
                        <View>
                            <Text style={menuStyle.cateText}>Category</Text>
                            <Text style={menuStyle.cateText2}>Meat</Text>
                        </View>
                    </View>
                    <View style={menuStyle.flexCate}>
                        <Icon name='carrot' style={menuStyle.cateIcon}></Icon>
                        <View>
                            <Text style={menuStyle.cateText}>Category</Text>
                            <Text style={menuStyle.cateText2}>Vegetables</Text>
                        </View>
                    </View>
                    <View style={menuStyle.flexCate}>
                        <Icon name='mug-hot' style={menuStyle.cateIcon}></Icon>
                        <View>
                            <Text style={menuStyle.cateText}>Category</Text>
                            <Text style={menuStyle.cateText2}>Drink</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const menuStyle = StyleSheet.create({
    menu: {
        backgroundColor: "#fff",
        paddingLeft: 15,
        paddingRight: 15,
    },

    aboutUs: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    headUp: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#FEA116"
    },

    fatherFlexCate: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 25,
        paddingTop: 7
    },

    flexCate: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },

    cateIcon: {
        color: "#FEA116",
        fontSize: 25
    },

    cateText: {
        color: "#666565",
        fontSize: 14
    },

    cateText2: {
        color: "#0F172B",
        fontWeight: "bold",
        fontSize: 14
    }
})

export default Menu