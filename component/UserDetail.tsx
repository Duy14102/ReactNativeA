import { SafeAreaView, ScrollView, View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import Header from "./Header"
import Footer from "./Footer"
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
    const navigation = useNavigation<any>()
    const [updateimage, setUpdateImage] = useState<any>()
    const [updatefullname, setUpdateFullname] = useState()
    const [updatephone, setUpdatePhone] = useState()

    useEffect(() => {
        if (candecode.userRole !== 1.5) {
            proUser()
        }
    }, [candecode])

    function proUser() {
        const configuration = {
            method: "get",
            url: "http://192.168.1.216:3000/GetDetailUser",
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

    function convertToBase64(e: any) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setUpdateImage(reader.result);
        };
        reader.onerror = error => {
            console.log(error);
        }
    }

    const updateUser = (id: any) => {
        // prevent the form from refreshing the whole page
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/UpdateUserDetailNative",
            data: {
                updateid: id,
                updatefullname,
                updatephone,
                base64: updateimage
            },
        };

        axios(configuration)
            .then(() => {

            })
            .catch((e) => {
                console.log(e);
            });
    }

    const openImagePicker = () => {
        launchImageLibrary({ mediaType: "photo", includeBase64: true }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode = "camera_unavailable") {
                console.log(response.errorMessage + "cam");
            } else if (response.errorCode = "permission") {
                console.log(response.errorMessage + "per");
            } else if (response.errorCode = "others") {
                console.log(response.errorMessage + "othe");
            } else if (response.assets) {
                console.log(response.assets);  
            }
        });
    };

    const handleCameraLaunch = () => {
        launchCamera({ mediaType: "photo", includeBase64: true }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorCode = "camera_unavailable") {
                console.log(response.errorMessage + "cam");
            } else if (response.errorCode = "permission") {
                console.log(response.errorMessage + "permission");
            } else if (response.errorCode = "others") {
                console.log(response.errorMessage + "others");
            } else if (response.assets) {
                console.log(response.assets[0]);
            }
        });
    }
    // console.log(updateimage);

    const imgUser = "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }}>
                <Header type={"Yes"} />
                <View style={{ flex: 1 }}>
                    <View style={{ alignItems: "center", paddingVertical: 15 }}>
                        {editIn4 ? (
                            <>
                                {chooseImg ? (
                                    <TouchableOpacity style={{ width: 100, height: 100, padding: 10, backgroundColor: "#FFFFFF", borderRadius: 50 }} onPress={() => setChooseImg(false)}>
                                        {getUser.userimage ? (
                                            <Image source={{ uri: getUser.userimage }} height={50} width={50} />
                                        ) : (
                                            <Image source={{ uri: imgUser }} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
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
                                            <Image source={{ uri: getUser.userimage }} height={50} width={50} />
                                        ) : (
                                            <Image source={{ uri: imgUser }} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
                                        )}
                                        <Icon name="edit" size={20} style={{ position: "absolute", bottom: 5, right: 0, zIndex: 1 }} solid />
                                    </TouchableOpacity>
                                )}
                            </>
                        ) : (
                            <View style={{ width: 100, height: 100, padding: 10, backgroundColor: "#FFFFFF", borderRadius: 50 }}>
                                {getUser.userimage ? (
                                    <Image source={{ uri: getUser.userimage }} height={50} width={50} />
                                ) : (
                                    <Image source={{ uri: imgUser }} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
                                )}
                            </View>
                        )}
                    </View>
                    <View style={[settingStyle.coverIt, { pointerEvents: editIn4 ? "auto" : "none" }]}>
                        <View>
                            <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5, paddingBottom: 3 }}>Email</Text>
                            <TextInput style={{ backgroundColor: "#EEEEEE", borderRadius: 7, paddingHorizontal: 10 }} defaultValue={getUser.email} />
                        </View>
                        <View>
                            <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5, paddingBottom: 3 }}>Fullname</Text>
                            <TextInput style={{ backgroundColor: "#EEEEEE", borderRadius: 7, paddingHorizontal: 10 }} defaultValue={getUser.fullname} />
                        </View>
                        <View>
                            <Text style={{ fontSize: 15, color: "#0F172B", paddingLeft: 5, paddingBottom: 3 }}>Phone number</Text>
                            <TextInput style={{ backgroundColor: "#EEEEEE", borderRadius: 7, paddingHorizontal: 10 }} defaultValue={getUser.phonenumber} />
                        </View>
                        {editIn4 ? (
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", }}>
                                <TouchableOpacity style={{ paddingVertical: 7, paddingHorizontal: 15, backgroundColor: "#FEA116" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 15, color: "#fff" }}>Confirm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingVertical: 7, paddingHorizontal: 15, backgroundColor: "lightgray" }} onPress={() => setEditIn4(false)}>
                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        ) : null}
                    </View>
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
                            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 17.5 }} onPress={() => navigation.navigate("EditPassword")}>
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
                            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 17.5, paddingBottom: 5 }} onPress={() => navigation.navigate("EditAddress")}>
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