import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from "@react-navigation/native";

function StateComplete({ responseCode, candecode, amount, date }: { responseCode: any, candecode: any, amount: any, date: any }) {
    const navigation = useNavigation<any>()

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    var kakao = null
    if (responseCode === '24') {
        kakao = "Customer cancels transaction"
    }
    if (responseCode === '15') {
        kakao = "Customer did not make the transaction"
    }
    if (responseCode === '09') {
        kakao = "Customer's card/account has not registered for InternetBanking service at the bank."
    }
    if (responseCode === '10') {
        kakao = "Customers verify incorrect card/account information more than 3 times"
    }
    if (responseCode === '11') {
        kakao = "Payment deadline has expired."
    }
    if (responseCode === '12') {
        kakao = "Customer's card/account is locked."
    }
    if (responseCode === '13') {
        kakao = "You entered the wrong transaction authentication password (OTP)."
    }
    if (responseCode === '51') {
        kakao = "Your account does not have enough balance to make a transaction."
    }
    if (responseCode === '65') {
        kakao = "Your account has exceeded the daily transaction limit."
    }
    if (responseCode === '75') {
        kakao = "The payment bank is under maintenance."
    }
    if (responseCode === '79') {
        kakao = "The customer enters the wrong payment password more than the specified number of times."
    }
    if (responseCode === '99') {
        kakao = "Other errors."
    }

    const copyToClipboard = (e: any) => {
        Clipboard.setString(e);
    };

    return (
        <>
            {responseCode === '24' || responseCode === '09' || responseCode === '10' || responseCode === '11' || responseCode === '12' || responseCode === '13' || responseCode === '51' || responseCode === '65' || responseCode === '75' || responseCode === '79' || responseCode === '99' || responseCode === '15' ? (
                <View style={{ flex: 1, padding: 15, backgroundColor: "#fff", height: 450 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 21, textAlign: "center", color: "#FEA116" }}>Transaction failed!</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 17, paddingVertical: 8 }}><Text style={{ fontWeight: "bold" }}>Order id</Text> : {candecode}</Text>
                        <TouchableOpacity onPress={() => copyToClipboard(candecode)}>
                            <Text style={{ fontSize: 16, color: "#FEA116" }}>Copy</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 17, paddingVertical: 8 }}><Text style={{ fontWeight: "bold" }}>Amount</Text> : {VND.format(amount / 100)}</Text>
                    <Text style={{ fontSize: 17, paddingVertical: 8 }}><Text style={{ fontWeight: "bold" }}>Date</Text> : {date}</Text>
                    <Text style={{ fontSize: 17, paddingVertical: 8 }}><Text style={{ fontWeight: "bold" }}>Reason</Text> : {kakao}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingVertical: 20 }}>
                        <TouchableOpacity style={styles.shadow} onPress={() => navigation.navigate("Searchs")}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}><Text style={{ color: "black" }}>🔍</Text> Search detail</Text>
                        </TouchableOpacity>
                        <Text>Or</Text>
                        <TouchableOpacity style={styles.shadow} onPress={() => navigation.navigate("Categorys")}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}><Text style={{ color: "black" }}>🛍️</Text> Go shopping</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Image source={{ uri: "https://cdn.icon-icons.com/icons2/881/PNG/512/Rice_Bowl_icon-icons.com_68695.png" }} width={150} height={150} />
                    </View>
                </View>
            ) : (
                <View style={{ flex: 1, padding: 15, backgroundColor: "#fff", height: 350 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 21, textAlign: "center", color: "#FEA116" }}>Thank You!</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 17, paddingVertical: 8 }}><Text style={{ fontWeight: "bold" }}>Order id</Text> : {candecode}</Text>
                        <TouchableOpacity onPress={() => copyToClipboard(candecode)}>
                            <Text style={{ fontSize: 16, color: "#FEA116" }}>Copy</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingVertical: 20 }}>
                        <TouchableOpacity style={styles.shadow} onPress={() => navigation.navigate("Searchs")}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}><Text style={{ color: "black" }}>🔍</Text> Search detail</Text>
                        </TouchableOpacity>
                        <Text>Or</Text>
                        <TouchableOpacity style={styles.shadow} onPress={() => navigation.navigate("Categorys")}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}><Text style={{ color: "black" }}>🛍️</Text> Go shopping</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Image source={{ uri: "https://cdn.icon-icons.com/icons2/881/PNG/512/Rice_Bowl_icon-icons.com_68695.png" }} width={150} height={150} />
                    </View>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: "#f9f9f9", paddingVertical: 8, paddingHorizontal: 10
    }
})

export default StateComplete