import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

function Services() {
    return (
        <View style={serviceStyle.services}>
            <View style={serviceStyle.boxServices}>
                <Icon name='user-tie' style={serviceStyle.boxIcon}></Icon>
                <Text style={serviceStyle.boxh5}>Certificate Chefs</Text>
                <Text style={serviceStyle.boxp}>Up to 10 with full food service expertise</Text>
            </View>
            <View style={serviceStyle.boxServices}>
                <Icon name='utensils' style={serviceStyle.boxIcon}></Icon>
                <Text style={serviceStyle.boxh5}>Quality Food</Text>
                <Text style={serviceStyle.boxp}>Food is carefully selected and prepared</Text>
            </View>
            <View style={serviceStyle.boxServices}>
                <Icon name='cart-plus' style={serviceStyle.boxIcon}></Icon>
                <Text style={serviceStyle.boxh5}>Online Order</Text>
                <Text style={serviceStyle.boxp}>Order food and reserve a table online or at the restaurant</Text>
            </View>
            <View style={serviceStyle.boxServices}>
                <Icon name='headset' style={serviceStyle.boxIcon}></Icon>
                <Text style={serviceStyle.boxh5}>24/7 Service</Text>
                <Text style={serviceStyle.boxp}>Support service is always available at all times</Text>
            </View>
        </View>
    )
}

const serviceStyle = StyleSheet.create({
    services: {
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 65
    },

    boxServices: {
        marginBottom: 15,
        display: "flex",
        flexDirection: "column",
        gap: 7,
        backgroundColor: '#fff',
        borderRadius: 4,
        paddingVertical: 25,
        paddingHorizontal: 25,
        width: '100%',
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    boxIcon: {
        color: "#FEA116",
        fontSize: 40
    },

    boxh5: {
        fontSize: 18,
        color: "#0F172B",
        fontWeight: "bold"
    },

    boxp: {
        fontSize: 15,
        color: "#666565"
    }
})
export default Services