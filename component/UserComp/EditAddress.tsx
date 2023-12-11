import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from "react-native"
import Header from "../Header"
import Footer from "../Footer"
import { useEffect, useState } from "react"
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from "axios"

function EditAddress({ route, navigation }: { route: any, navigation: any }) {
    const { userid } = route.params
    const [addNew, setAddNew] = useState(false)
    const [newAddress, setNewAddress] = useState("")
    const [checkNull, setCheckNull] = useState(false)
    const [success, setSuccess] = useState(false)
    const [success2, setSuccess2] = useState(false)
    const [load1, setLoad1] = useState(false)
    const [load2, setLoad2] = useState(false)
    const [userBase, setUserBase] = useState<any>([])

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if (success) {
            setAddNew(false)
            setNewAddress("")
            setCheckNull(false)
            getUser()
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
        }
    }, [success])

    useEffect(() => {
        if (success2) {
            getUser()
            setTimeout(() => {
                setSuccess2(false)
            }, 3000)
        }
    }, [success2])

    function getUser() {
        const configuration = {
            method: "get",
            url: "http://192.168.1.216:3000/GetDetailUser",
            params: {
                userid: userid
            }
        }
        axios(configuration)
            .then((res: any) => {
                setUserBase(res.data.data)
            }).catch((er) => {
                console.log(er);
            })
    }

    const addAddress = () => {
        if (newAddress === "") {
            setCheckNull(true)
            return false
        } else {
            const configuration = {
                method: "post",
                url: "http://192.168.1.216:3000/AddAddressUser",
                data: {
                    id: userid,
                    address: newAddress
                }
            }
            setLoad1(true)
            setTimeout(() => {
                axios(configuration)
                    .then(() => {
                        setLoad1(false)
                        setSuccess(true)
                    }).catch((err) => {
                        setLoad1(false)
                        console.log(err);
                    })
            }, 1000)
        }
    }

    const deleteAddress = (e: any) => {
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/RemoveAddressUser",
            data: {
                userid: userid,
                address: e
            }
        }
        setLoad2(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad2(false)
                    setSuccess2(true)
                }).catch((err) => {
                    setLoad2(false)
                    console.log(err);
                })
        }, 1000)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
                <Header type={"Yes"} />
                <View style={{ flex: 1, padding: 15 }}>
                    <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", color: "#0F172B" }}>Edit address</Text>
                    {addNew ? (
                        <>
                            <TouchableOpacity style={{ backgroundColor: "gray", width: 70, alignItems: "center", paddingVertical: 8 }} onPress={() => setAddNew(false)}>
                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>Cancel</Text>
                            </TouchableOpacity>
                            <View style={{ paddingVertical: 10, height: 70 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <TextInput value={newAddress} style={{ backgroundColor: "#E1E1E1", paddingHorizontal: 5, width: "90%", borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} onChange={(e) => setNewAddress(e.nativeEvent.text)} />
                                    <TouchableOpacity style={{ width: "10%", height: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF", borderTopRightRadius: 8, borderBottomRightRadius: 8 }} onPress={() => addAddress()}>
                                        {load1 ? (
                                            <ActivityIndicator size={22} color={"#FEA116"} />
                                        ) : (
                                            <Icon name="plus" size={27} />
                                        )}
                                    </TouchableOpacity>
                                </View>
                                {checkNull ? (
                                    <Text style={{ color: "red" }}>This field cant be blank!</Text>
                                ) : null}
                            </View>
                        </>
                    ) : (
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity style={{ backgroundColor: "#FEA116", width: 70, alignItems: "center", paddingVertical: 8 }} onPress={() => setAddNew(true)}>
                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>Add new</Text>
                            </TouchableOpacity>
                            {success ? (
                                <Text style={{ fontSize: 15, color: "#03ba5f", textAlign: "center", paddingLeft: 20 }}>✅ Add address succeeded!</Text>
                            ) : null}
                            {success2 ? (
                                <Text style={{ fontSize: 15, color: "#03ba5f", textAlign: "center", paddingLeft: 20 }}>✅ Delete address succeeded!</Text>
                            ) : null}
                        </View>
                    )}
                    {userBase.address?.length > 0 ? (
                        <View style={{ marginVertical: 15, borderWidth: 1, borderColor: "gray", padding: 15 }}>
                            {userBase.address?.map((i: any) => {
                                return (
                                    <>
                                        <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                                            <Text style={{ fontSize: 15, fontWeight: "bold", width: "85%" }}>{i}</Text>
                                            <View style={editAStyle.verticalLine} />
                                            <TouchableOpacity style={{ width: "10%", alignItems: "center", backgroundColor: "tomato", padding: 5 }} onPress={() => deleteAddress(i)}>
                                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>X</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={{
                                                borderBottomColor: 'gray',
                                                borderBottomWidth: 0.4,
                                                left: 5,
                                                right: 5,
                                                marginVertical: 10
                                            }}
                                        />
                                    </>
                                )
                            })}
                            {load2 ? (
                                <ActivityIndicator size={21} color={"FEA116"} />
                            ) : null}
                        </View>
                    ) : (
                        <Text style={{ fontSize: 15, marginVertical: 15, textAlign: "center", color: "#0F172B" }}>There's no address!</Text>
                    )}
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

const editAStyle = StyleSheet.create({
    verticalLine: {
        height: "100%",
        width: 1,
        backgroundColor: "#0F172B"
    }
})
export default EditAddress