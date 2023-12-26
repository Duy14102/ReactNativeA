import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl, Image, TextInput, ActivityIndicator } from "react-native";
import { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import DrawerHeader from "../../AdminComp/DrawerHeader";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import axios from "axios";

function CreateMenuManager() {
    const navigation = useNavigation<any>()
    const [load, setLoad] = useState(false)
    const [refresh, setFresh] = useState(false);
    const [checkBlank, setCheckBlank] = useState(false)
    const [foodname, setFoodname] = useState("");
    const [foodprice, setFoodprice] = useState("");
    const [foodquantity, setFoodquantity] = useState("");
    const [foodcategory, setFoodcategory] = useState("");
    const [fooddescription, setFooddescription] = useState("");
    const [foodimage, setFoodimage] = useState<any>();
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            setCheckBlank(false)
            setFoodcategory("")
            setFooddescription("")
            setFoodimage(null)
            setFoodname("")
            setFoodprice("")
            setFoodquantity("")
            setFresh(false)
        }, 1000)
    }

    const handleSubmit = () => {
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/UploadMenu",
            data: {
                foodname,
                foodprice: parseInt(foodprice),
                foodquantity: parseInt(foodquantity),
                foodcategory,
                fooddescription,
                base64: foodimage,
            },
        };
        if (foodname === "" || foodprice === "" || foodcategory === "" || fooddescription === "" || foodquantity === "" || !foodimage) {
            setCheckBlank(true)
            return false
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    navigation.goBack()
                })
                .catch((err) => {
                    setLoad(false)
                    console.log(err);
                });
        }, 1000);
    }

    const openImagePicker = () => {
        launchImageLibrary({ mediaType: "photo", includeBase64: true }, (response) => {
            if (response.assets) {
                response.assets?.map((i) => {
                    const imagesss = `data:${i.type};base64,${i.base64}`;
                    setFoodimage(imagesss)
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
                    setFoodimage(imagesss)
                })
            } else {
                console.log("Bug");
            }
        });
    }

    const bgImage = "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <DrawerHeader title={"Item detail"} />
                <TouchableOpacity style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10 }} onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 17 }}>{"<"} Back</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Image source={{ uri: foodimage ? foodimage : bgImage }} style={{ width: "100%", height: 200 }} />
                    <View style={{ padding: 15, backgroundColor: "#fff", flexDirection: "column", gap: 20 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                            <TouchableOpacity style={{ backgroundColor: "#ccc", paddingVertical: 7, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", gap: 5 }} onPress={() => openImagePicker()}>
                                <Icon name="book-open" size={16} />
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Library</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: "#ccc", paddingVertical: 7, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", gap: 5 }} onPress={() => handleCameraLaunch()}>
                                <Icon name="camera" size={16} />
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Camera</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "column", gap: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 5 }}>Name</Text>
                            <TextInput onChange={(e) => setFoodname(e.nativeEvent.text)} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} />
                        </View>
                        <View style={{ flexDirection: "column", gap: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 5 }}>Category</Text>
                            <View style={{ borderWidth: 1, borderColor: "gray", width: "100%", borderRadius: 6 }}>
                                <Picker
                                    selectedValue={foodcategory}
                                    onValueChange={(itemValue) =>
                                        setFoodcategory(itemValue)
                                    }>
                                    <Picker.Item label="Choose category" value="" />
                                    <Picker.Item label="Meat" value="Meat" />
                                    <Picker.Item label="Vegetables" value="Vegetables" />
                                    <Picker.Item label="Drink" value="Drink" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ flexDirection: "column", gap: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 5 }}>Price</Text>
                            <TextInput onChange={(e) => setFoodprice(e.nativeEvent.text)} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} />
                        </View>
                        <View style={{ flexDirection: "column", gap: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 5 }}>Quantity</Text>
                            <TextInput onChange={(e) => setFoodquantity(e.nativeEvent.text)} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} />
                        </View>
                        <View style={{ flexDirection: "column", gap: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 5 }}>Description</Text>
                            <TextInput onChange={(e) => setFooddescription(e.nativeEvent.text)} multiline={true} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10, height: 150, verticalAlign: "top" }} />
                        </View>
                        {checkBlank ? (
                            <Text style={{ color: "red", textAlign: "center" }}>These field cant be blank!</Text>
                        ) : null}
                        <TouchableOpacity style={{ backgroundColor: "#FEA116", alignItems: "center", paddingVertical: 8 }} onPress={() => handleSubmit()}>
                            {load ? (
                                <ActivityIndicator size={21} color={"#fff"} />
                            ) : (
                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>Confirm</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateMenuManager