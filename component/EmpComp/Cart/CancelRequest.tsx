import axios from "axios"
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"

function CancelRequest({ setCancelPaid, i, deliverEmployee, fulltotal, setReset }: { setCancelPaid: any, i: any, deliverEmployee: any, fulltotal: any, setReset: any }) {
    const [load, setLoad] = useState(false)
    const navigation = useNavigation<any>()
    const denyOrderKin = () => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/VnpayRefund",
            data: {
                orderId: i._id,
                transDate: i.createdAt,
                amount: fulltotal,
                transType: "02",
                user: "Manager",
                reason: "Canceled by Manager"
            }
        }
        axios(configuration).then(() => {
            setLoad(false)
            setReset(true)
            navigation.goBack()
        }).catch((err) => {
            setLoad(false)
            console.log(err);
        })
    }

    const cancelIt = () => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/totaldenyNow",
            data: {
                id: i._id,
                employee: deliverEmployee,
                status: 6,
            }
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    setReset(true)
                    navigation.goBack()
                }).catch((err) => {
                    setLoad(false)
                    console.log(err);
                })
        }, 1000);
    }

    const cancelItNow = () => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/totaldenyNow",
            data: {
                id: i._id,
                employee: deliverEmployee,
                status: 6,
            }
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    denyOrderKin()
                }).catch((err) => {
                    setLoad(false)
                    console.log(err);
                })
        }, 1000);
    }
    return (
        <>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                {i.paymentmethod?.method === 1 && i.paymentmethod?.status === 2 ? (
                    <TouchableOpacity style={{ marginBottom: 15, backgroundColor: "#FEA116", alignItems: "center", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => cancelItNow()}>
                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Confirm</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={{ marginBottom: 15, backgroundColor: "#FEA116", alignItems: "center", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => cancelIt()}>
                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Confirm</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={{ marginBottom: 15, backgroundColor: "gray", alignItems: "center", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => setCancelPaid(false)}>
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Cancel</Text>
                </TouchableOpacity>
            </View>
            {load ? (
                <ActivityIndicator size={25} color={"#FEA116"} />
            ) : null}
        </>
    )
}

export default CancelRequest