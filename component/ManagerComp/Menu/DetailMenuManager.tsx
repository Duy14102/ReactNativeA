import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl, Image, TextInput, ActivityIndicator, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Picker } from '@react-native-picker/picker';
import DrawerHeader from "../../AdminComp/DrawerHeader";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import axios from "axios";

function DetailMenuManager({ route }: { route: any }) {
    const isfocused = useIsFocused()
    const navigation = useNavigation<any>()
    const { i } = route.params
    const [data, setData] = useState<any>()
    const [mainReload, setMainReload] = useState(false)
    const [editReview, setEditReview] = useState(false)
    const [load, setLoad] = useState(false)
    const [load2, setLoad2] = useState(false)
    const [refresh, setFresh] = useState(false);
    const [wantEdit, setWantEdit] = useState(false)
    const [updatename, setFoodname] = useState("");
    const [updateprice, setFoodprice] = useState("");
    const [updatequantity, setFoodquantity] = useState("");
    const [updatecategory, setFoodcategory] = useState("");
    const [updatedescription, setFooddescription] = useState("");
    const [updateimage, setFoodimage] = useState<any>();
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            setMainReload(true)
            datasynb()
            setFresh(false)
        }, 1000)
    }

    useEffect(() => {
        if (mainReload) {
            setWantEdit(false)
            setFoodcategory("")
            setFooddescription("")
            setFoodquantity("")
            setFoodimage(null)
            setFoodname("")
            setFoodprice("")
            setMainReload(false)
        }
    }, [mainReload])

    const datasynb = () => {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetDetailMenu",
            params: {
                foodid: i.foodname
            }
        }
        axios(configuration)
            .then((res) => {
                setData(res.data.data)
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (isfocused) {
            datasynb()
        }
    }, [isfocused])

    const updateMenu = () => {
        var name1 = updatename
        var price1 = updateprice
        var quantity1 = updatequantity
        var category1 = updatecategory
        var descrip1 = updatedescription
        var img1 = updateimage
        if (name1 === "") {
            name1 = i.foodname
        }
        if (price1 === "") {
            price1 = i.foodprice
        }
        if (quantity1 === "") {
            quantity1 = i.foodquantity
        }
        if (category1 === "") {
            category1 = i.foodcategory
        }
        if (descrip1 === "") {
            descrip1 = i.fooddescription
        }
        if (img1 === "") {
            img1 = i.foodimage
        }
        const configuration = {
            method: "post",
            url: "http://localhost:3000/UpdateMenu",
            data: {
                updateid: i._id,
                updatename: name1,
                updateprice: price1,
                updatequantity: quantity1,
                updatecategory: category1,
                updatedescription: descrip1,
                base64: img1
            },
        };
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    setMainReload(true)
                    datasynb()
                })
                .catch((er) => {
                    console.log(er);
                    setLoad(false)
                });
        }, 1000);
    }

    const DeleteMenu = (id: any) => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/DeleteMenu",
            params: {
                deleteid: id
            }
        };
        setLoad2(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad2(false)
                    navigation.goBack()
                })
                .catch((er) => {
                    setLoad2(false)
                    console.log(er);
                });
        }, 1000);
    }

    const deleteReview = (e: any, i: any) => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/DeleteReviewByMag",
            data: {
                itemid: e,
                reviewid: i
            }
        }
        axios(configuration)
            .then(() => {
                datasynb()
            }).catch((er) => {
                console.log(er);
            })
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

    function callBack() {
        setWantEdit(false)
        setMainReload(true)
        datasynb()
    }

    const rating = (stars: any) => '★★★★★☆☆☆☆☆'.slice(5 - stars, 10 - stars);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <DrawerHeader title={"Item detail"} />
                <TouchableOpacity style={{ backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 10 }} onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 17 }}>{"<"} Back</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, paddingVertical: 20 }}>
                    <View style={{ backgroundColor: "#fff", }}>
                        <View style={{ alignItems: "flex-end", padding: 10 }}>
                            {wantEdit ? (
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                    <TouchableOpacity style={{ backgroundColor: "#FEA116", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => updateMenu()}>
                                        <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Confirm</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: "gray", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => callBack()}>
                                        <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity style={{ backgroundColor: "#2298F1", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => setWantEdit(true)}>
                                    <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Edit</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        {load ? (
                            <ActivityIndicator size={25} color={"#FEA116"} style={{ paddingBottom: 10 }} />
                        ) : null}
                    </View>
                    <View style={{ pointerEvents: wantEdit ? "auto" : "none" }}>
                        {data?.foodimage ? (
                            <Image source={{ uri: updateimage ? updateimage : data?.foodimage }} style={{ width: "100%", height: 200 }} />
                        ) : null}
                        <View style={{ padding: 15, backgroundColor: "#fff", flexDirection: "column", gap: 20 }}>
                            {wantEdit ? (
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
                            ) : null}
                            <View style={{ flexDirection: "column", gap: 5 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 5 }}>Name</Text>
                                <TextInput onChange={(e) => setFoodname(e.nativeEvent.text)} defaultValue={data?.foodname} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} />
                            </View>
                            <View style={{ flexDirection: "column", gap: 5 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 5 }}>Category</Text>
                                {wantEdit ? (
                                    <View style={{ borderWidth: 1, borderColor: "gray", width: "100%", borderRadius: 6 }}>
                                        <Picker
                                            selectedValue={updatecategory}
                                            onValueChange={(itemValue) =>
                                                setFoodcategory(itemValue)
                                            }>
                                            <Picker.Item label="Choose category" value="" />
                                            <Picker.Item label="Meat" value="Meat" />
                                            <Picker.Item label="Vegetables" value="Vegetables" />
                                            <Picker.Item label="Drink" value="Drink" />
                                        </Picker>
                                    </View>
                                ) : (
                                    <TextInput onChange={(e) => setFoodcategory(e.nativeEvent.text)} defaultValue={data?.foodcategory} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} />
                                )}
                            </View>
                            <View style={{ flexDirection: "column", gap: 5 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 5 }}>Price</Text>
                                <TextInput onChange={(e) => setFoodprice(e.nativeEvent.text)} defaultValue={data?.foodprice.toString()} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} />
                            </View>
                            <View style={{ flexDirection: "column", gap: 5 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 5 }}>Quantity</Text>
                                <TextInput onChange={(e) => setFoodquantity(e.nativeEvent.text)} defaultValue={data?.foodquantity.toString()} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10 }} />
                            </View>
                            <View style={{ flexDirection: "column", gap: 5 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 5 }}>Description</Text>
                                <TextInput onChange={(e) => setFooddescription(e.nativeEvent.text)} multiline={true} defaultValue={data?.fooddescription} style={{ borderWidth: 1, borderColor: "gray", borderRadius: 6, padding: 10, height: 150, verticalAlign: "top" }} />
                            </View>
                            {wantEdit ? (
                                <TouchableOpacity style={{ backgroundColor: "tomato", alignItems: "center", paddingVertical: 8 }} onPress={() => DeleteMenu(data?._id)}>
                                    {load2 ? (
                                        <ActivityIndicator size={21} color={"#fff"} />
                                    ) : (
                                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>Delete</Text>
                                    )}
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    </View>
                    <View style={{ marginVertical: 25, backgroundColor: "#fff", padding: 15 }}>
                        <Text style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}>Review</Text>
                        <View style={{ alignItems: "flex-end", padding: 10 }}>
                            {editReview ? (
                                <TouchableOpacity style={{ backgroundColor: "#FEA116", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => setEditReview(false)}>
                                    <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Done</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={{ backgroundColor: "#2298F1", paddingVertical: 7, paddingHorizontal: 10 }} onPress={() => setEditReview(true)}>
                                    <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Edit</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        {data?.review?.length > 0 ? (
                            data?.review?.map((z: any) => {
                                return (
                                    <View style={style.shadow}>
                                        <View style={{ backgroundColor: "#fff", padding: 15, flexDirection: "row", gap: 15, }}>
                                            {z.image ? (
                                                <Image source={{ uri: z.image }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                                            ) : (
                                                <Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                                            )}
                                            <View style={{ flexDirection: "column", gap: 5 }}>
                                                <Text style={{ fontSize: 15, color: "#FEA116" }}>{rating(z.star)}</Text>
                                                <Text style={{ fontSize: 15 }}><Text style={{ fontWeight: "bold" }}>{z.name}</Text> - {z.date}</Text>
                                                <Text style={{ fontSize: 15 }}>{z.message}</Text>
                                            </View>
                                            {editReview ? (
                                                <TouchableOpacity style={{ position: "absolute", top: 10, right: 15 }} onPress={() => deleteReview(data?._id, z.id)}>
                                                    <Icon name="trash" size={20} />
                                                </TouchableOpacity>
                                            ) : null}
                                        </View>
                                    </View>
                                )
                            })
                        ) : (
                            <Text style={{ textAlign: "center", fontSize: 16 }}>There's no review for this item</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const style = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginVertical: 15,
        elevation: 5,
        borderWidth: 1,
        borderColor: "transparent"
    }
})

export default DetailMenuManager