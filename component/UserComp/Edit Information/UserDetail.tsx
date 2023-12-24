import { SafeAreaView, ScrollView, View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl } from "react-native"
import Header from "../../Header"
import Footer from "../../Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from "@react-navigation/native"
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

function UserDetail({ route }: { route: any }) {
    const { candecode } = route.params
    const [getUser, setGetUser] = useState<any>([])
    const [test, setTest] = useState(false)
    const [editIn4, setEditIn4] = useState(false)
    const [chooseImg, setChooseImg] = useState(false)
    const [success, setSuccess] = useState(false)
    const [reload, setReload] = useState(false)
    const [load, setLoad] = useState(false)
    const [refresh, setFresh] = useState(false)
    const navigation = useNavigation<any>()
    const [updateimage, setUpdateImage] = useState<any>("")
    const [updatefullname, setUpdateFullname] = useState("")
    const [updatephone, setUpdatePhone] = useState("")

    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            setReload(true)
            setFresh(false)
        }, 1000)
    }

    useEffect(() => {
        if (candecode.userRole !== 1.5) {
            proUser()
        }
    }, [candecode])

    useEffect(() => {
        if (reload) {
            setUpdateFullname("")
            setUpdatePhone("")
            setUpdateImage("")
            proUser()
            setEditIn4(false)
            setReload(false)
        }
    }, [reload])

    function proUser() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetDetailUser",
            params: {
                userid: candecode.userId
            }
        }
        axios(configuration)
            .then((res: any) => {
                setGetUser(res.data.data)
            }).catch((er) => {
                console.log(er);
            })
    }

    const updateUser = (id: any, nameHH: any, numberHH: any) => {
        var updateN = updatefullname
        var updateP = updatephone
        if (updatefullname === "") {
            updateN = nameHH
        }
        if (updatephone === "") {
            updateP = numberHH
        }
        const configuration = {
            method: "post",
            url: "http://localhost:3000/UpdateUserDetailNative",
            data: {
                updateid: id,
                updatefullname: updateN,
                updatephone: updateP,
                base64: updateimage
            },
        };
        setLoad(true)
        axios(configuration)
            .then(() => {
                setLoad(false)
                setSuccess(true)
                setReload(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 3000)
            })
            .catch((e) => {
                setLoad(false)
                console.log(e);
            });
    }

    const openImagePicker = () => {
        launchImageLibrary({ mediaType: "photo", includeBase64: true }, (response) => {
            if (response.assets) {
                response.assets?.map((i) => {
                    const imagesss = `data:${i.type};base64,${i.base64}`;
                    setUpdateImage(imagesss)
                })
            } else {
                console.log("Bug");
            }
        });
    };

    const handleCameraLaunch = () => {
        launchCamera({ mediaType: "photo", includeBase64: true }, (response) => {
            if (response.assets) {
                response.assets?.map((i) => {
                    const imagesss = `data:${i.type};base64,${i.base64}`;
                    setUpdateImage(imagesss)
                })
            } else {
                console.log("Bug");
            }
        });
    }

    const imgUser = "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <Header type={"Yes"} />
                <View style={{ flex: 1 }}>
                    <View style={{ alignItems: "center", paddingVertical: 15 }}>
                        {editIn4 ? (
                            <>
                                {chooseImg ? (
                                    <TouchableOpacity style={{ width: 100, height: 100, padding: 10, backgroundColor: "#FFFFFF", borderRadius: 50 }} onPress={() => setChooseImg(false)}>
                                        {getUser.userimage ? (
                                            <Image source={{ uri: getUser.userimage }} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
                                        ) : (
                                            <>
                                                {updateimage ? (
                                                    <Image source={{ uri: updateimage }} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
                                                ) : (
                                                    <Image source={{ uri: imgUser }} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
                                                )}
                                            </>
                                        )}
                                        <Icon name="ban" size={20} style={{ position: "absolute", bottom: 5, right: 0, zIndex: 1 }} solid />
                                        <TouchableOpacity style={{ position: "absolute", top: 10, right: -110, zIndex: 1, flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#FFFFFF", paddingVertical: 5, paddingHorizontal: 13, width: 100 }} onPress={() => openImagePicker()}>
                                            <Icon name="book-open" style={{ fontSize: 15 }} />
                                            <Text style={{ fontSize: 15 }}>Library</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ position: "absolute", top: 55, right: -110, zIndex: 1, flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#FFFFFF", paddingVertical: 5, paddingHorizontal: 13, width: 100 }} onPress={() => handleCameraLaunch()}>
                                            <Icon name="camera" style={{ fontSize: 15 }} />
                                            <Text style={{ fontSize: 15 }}>Camera</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={{ width: 100, height: 100, padding: 10, backgroundColor: "#FFFFFF", borderRadius: 50 }} onPress={() => setChooseImg(true)}>
                                        {getUser.userimage ? (
                                            <Image source={{ uri: getUser.userimage }} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
                                        ) : (
                                            <>
                                                {updateimage ? (
                                                    <Image source={{ uri: updateimage }} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
                                                ) : (
                                                    <Image source={{ uri: imgUser }} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
                                                )}
                                            </>
                                        )}
                                        <Icon name="edit" size={20} style={{ position: "absolute", bottom: 5, right: 0, zIndex: 1 }} solid />
                                    </TouchableOpacity>
                                )}
                            </>
                        ) : (
                            <View style={{ width: 100, height: 100, padding: 10, backgroundColor: "#FFFFFF", borderRadius: 50 }}>
                                {candecode.userRole === 1.5 ? (
                                    <Image source={{ uri: candecode.userImage }} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
                                ) : (
                                    getUser.userimage ? (
                                        <Image source={{ uri: getUser.userimage }} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
                                    ) : (
                                        <Image source={{ uri: imgUser }} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
                                    )
                                )}

                            </View>
                        )}
                    </View>
                    <View style={[settingStyle.coverIt, { pointerEvents: editIn4 ? "auto" : "none" }]}>
                        {candecode.userRole === 1.5 ? (
                            <>
                                <View>
                                    <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5, paddingBottom: 3 }}>Email</Text>
                                    <TextInput style={{ backgroundColor: "#EEEEEE", borderRadius: 7, paddingHorizontal: 10 }} defaultValue={candecode.userEmail} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5, paddingBottom: 3 }}>Fullname</Text>
                                    <TextInput style={{ backgroundColor: "#EEEEEE", borderRadius: 7, paddingHorizontal: 10 }} defaultValue={candecode.userName} onChangeText={setUpdateFullname} />
                                </View>
                            </>
                        ) : (
                            <>
                                <View>
                                    <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5, paddingBottom: 3 }}>Email</Text>
                                    <TextInput style={{ backgroundColor: "#EEEEEE", borderRadius: 7, paddingHorizontal: 10 }} defaultValue={getUser.email} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5, paddingBottom: 3 }}>Fullname</Text>
                                    <TextInput style={{ backgroundColor: "#EEEEEE", borderRadius: 7, paddingHorizontal: 10 }} defaultValue={getUser.fullname} onChangeText={setUpdateFullname} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5, paddingBottom: 3 }}>Phone number</Text>
                                    <TextInput style={{ backgroundColor: "#EEEEEE", borderRadius: 7, paddingHorizontal: 10 }} defaultValue={getUser.phonenumber} onChangeText={setUpdatePhone} />
                                </View>
                            </>
                        )}
                        {load ? (
                            <ActivityIndicator size={21} color={"#FEA116"} />
                        ) : null}
                        {success ? (
                            <Text style={{ fontSize: 15, color: "#03ba5f", textAlign: "center" }}>✅ Submit succeeded!</Text>
                        ) : null}
                        {editIn4 ? (
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", }}>
                                <TouchableOpacity style={{ paddingVertical: 7, paddingHorizontal: 15, backgroundColor: "#FEA116" }} onPress={() => updateUser(candecode.userId, getUser.fullname, getUser.phonenumber)}>
                                    <Text style={{ fontWeight: "bold", fontSize: 15, color: "#fff" }}>Confirm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingVertical: 7, paddingHorizontal: 15, backgroundColor: "lightgray" }} onPress={() => { setEditIn4(false); setReload(true) }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        ) : null}
                    </View>
                    {candecode.userRole === 1.5 ? (<View style={{ marginBottom: 25 }} />) : (
                        <>
                            <View style={{ marginTop: 25 }}>
                                <Text style={{ paddingBottom: 5, paddingLeft: 5, fontSize: 15, fontWeight: "bold" }}>Options</Text>
                                <View style={settingStyle.coverIt2}>

                                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 5 }} onPress={() => setEditIn4(true)}>
                                        <View style={{ flexDirection: "row", gap: 10 }}>
                                            <Icon name="info-circle" color={"#0F172B"} size={18} />
                                            <Text style={{ fontSize: 15 }}>Edit information</Text>
                                        </View>
                                        <Text style={{ fontWeight: "bold" }}>ᐳ</Text>
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            borderBottomColor: 'gray',
                                            borderBottomWidth: 1,
                                            opacity: 0.5,
                                            left: 5,
                                            right: 5,
                                            paddingVertical: 10
                                        }}
                                    />
                                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 17.5 }} onPress={() => navigation.navigate("EditPassword", { user: getUser })}>
                                        <View style={{ flexDirection: "row", gap: 10 }}>
                                            <Icon name="key" color={"#0F172B"} size={18} />
                                            <Text style={{ fontSize: 15 }}>Edit password</Text>
                                        </View>
                                        <Text style={{ fontWeight: "bold" }}>ᐳ</Text>
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            borderBottomColor: 'gray',
                                            borderBottomWidth: 1,
                                            opacity: 0.5,
                                            left: 5,
                                            right: 5,
                                            paddingVertical: 10
                                        }}
                                    />
                                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 17.5, paddingBottom: 5 }} onPress={() => navigation.navigate("EditAddress", { userid: getUser._id })}>
                                        <View style={{ flexDirection: "row", gap: 10 }}>
                                            <Icon name="map-marked-alt" color={"#0F172B"} size={18} />
                                            <Text style={{ fontSize: 15 }}>Edit address</Text>
                                        </View>
                                        <Text style={{ fontWeight: "bold" }}>ᐳ</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <View style={{ marginVertical: 25 }}>
                                <View style={settingStyle.coverIt2}>
                                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 3.5 }} onPress={() => setTest(true)}>
                                        <Text style={{ fontWeight: "bold", fontSize: 15, color: "red" }}>Delete account</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    )}
                    {test ? (
                        <View style={{ paddingBottom: 15 }}>
                            <Text style={{ fontSize: 15, textAlign: "center", paddingBottom: 8, fontWeight: "bold" }}>Are you sure?</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", }}>
                                <TouchableOpacity style={{ paddingVertical: 7, paddingHorizontal: 15, backgroundColor: "#FEA116" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 15, color: "#fff" }}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingVertical: 7, paddingHorizontal: 15, backgroundColor: "lightgray" }} onPress={() => setTest(false)}>
                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : null}
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

const settingStyle = StyleSheet.create({
    coverIt2: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 5,
    },

    coverIt: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        flexDirection: "column",
        gap: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
export default UserDetail