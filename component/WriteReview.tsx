import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, TextInput, ActivityIndicator, Image, RefreshControl } from "react-native"
import Header from "./Header"
import Footer from "./Footer"
import axios from "axios"
import { useState, useEffect, Fragment } from "react"
import Icon from 'react-native-vector-icons/FontAwesome5'

function WriteReview({ route, navigation }: { route: any, navigation: any }) {
    var reviewName = ""
    const [reviewStar, setReviewStar] = useState(0)
    const [reviewMessage, setReviewMessage] = useState("")
    const [checkStar, setCheckStar] = useState(false)
    const [load, setLoad] = useState(false)
    const [getUserW, setGetUserW] = useState([])
    const [imgF, setImgF] = useState("")
    const [exists, setExists] = useState(false)
    const [refresh, setFresh] = useState(false);
    const { item, candecode } = route.params;

    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            setReviewMessage("")
            setReviewStar(0)
            setCheckStar(false)
            setFresh(false)
        }, 1000)
    }

    useEffect(() => {
        if (candecode && candecode.userRole !== 1.5) {
            const configuration = {
                method: "get",
                url: "http://localhost:3000/GetDetailUser",
                params: {
                    userid: candecode.userId
                }
            };
            axios(configuration)
                .then((res: any) => {
                    setGetUserW(res.data)
                }).catch((er) => {
                    console.log(er);
                })
        }
    }, [candecode])

    useEffect(() => {
        if (candecode) {
            if (candecode.userRole !== 1.5) {
                Object.values(getUserW).map((h: any) => {
                    setImgF(h.userimage)
                    return null
                })
            }

            if (candecode.userRole === 1.5) {
                setImgF(candecode.userImage)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [candecode, getUserW])

    useEffect(() => {
        item.review?.map((i: any) => {
            if (i.id === candecode.userId) {
                setExists(true)
            }
            return null
        })
    }, [item])

    const date = Date.now()
    const hashdate = new Date(date).toLocaleDateString()
    const hashtime = new Date(date).toLocaleTimeString()
    const datetime = hashdate + " - " + hashtime

    const addreview = (ids: any) => {
        var thisId = "none"
        if (candecode) {
            thisId = candecode.userId
            reviewName = candecode.userName
        }
        const takeReview = { id: thisId, name: reviewName, star: reviewStar, message: reviewMessage, date: datetime, image: imgF }
        const configuration = {
            method: "post",
            url: "http://localhost:3000/AddReview",
            data: {
                id: ids,
                review: takeReview
            }
        };
        if (reviewStar !== 0) {
            setLoad(true)
            setTimeout(() => {
                axios(configuration)
                    .then(() => {
                        setLoad(false)
                        navigation.navigate("DetailPage", { name: item.foodname, category: item.foodcategory })
                    })
                    .catch((er) => {
                        setLoad(false)
                        console.log(er);
                    });
            }, 1000)
        } else {
            setCheckStar(true)
        }
    }

    const imgUser = "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
    const rating = (stars: any) => '★★★★★☆☆☆☆☆'.slice(5 - stars, 10 - stars);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <Header type={"Yes"} />
                <View style={{ flex: 1, padding: 15, backgroundColor: "#fff" }}>
                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", color: "#0F172B", paddingTop: 10 }}>Review {item.foodname}</Text>
                    {exists ? (
                        <>
                            {item.review?.map((k: any) => {
                                if (k.id === candecode.userId) {
                                    return (
                                        <Fragment key={k.id}>
                                            <Text style={{ fontSize: 15, textAlign: "center" }}>You have review this item!</Text>
                                            <View style={{ padding: 7, backgroundColor: "#FFFFFF", marginVertical: 10 }}>
                                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                                                    {k.image ? (
                                                        <Image source={{ uri: k.image }} width={50} height={50} />
                                                    ) : (
                                                        <Image source={{ uri: imgUser }} width={50} height={50} />
                                                    )}
                                                    <View>
                                                        <Text>{rating(k.star)}</Text>
                                                        <View style={{ flexDirection: "row", gap: 5 }}>
                                                            <Text style={{ fontWeight: "bold" }}>{k.name}</Text>
                                                            <Text>-</Text>
                                                            <Text>{k.date}</Text>
                                                        </View>
                                                        <Text>{k.message}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </Fragment>
                                    )
                                }
                                return null
                            })}
                        </>
                    ) : (
                        <>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 10, gap: 10 }}>
                                <TouchableOpacity onPress={() => setReviewStar(1)}>
                                    {reviewStar !== 0 ? (
                                        <Icon name="star" color={"#FEA116"} size={30} solid />
                                    ) : (
                                        <Icon name="star" color={"black"} size={30} />
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setReviewStar(2)}>
                                    {reviewStar >= 2 ? (
                                        <Icon name="star" color={"#FEA116"} size={30} solid />
                                    ) : (
                                        <Icon name="star" color={"black"} size={30} />
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setReviewStar(3)}>
                                    {reviewStar >= 3 ? (
                                        <Icon name="star" color={"#FEA116"} size={30} solid />
                                    ) : (
                                        <Icon name="star" color={"black"} size={30} />
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setReviewStar(4)}>
                                    {reviewStar >= 4 ? (
                                        <Icon name="star" color={"#FEA116"} size={30} solid />
                                    ) : (
                                        <Icon name="star" color={"black"} size={30} />
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setReviewStar(5)}>
                                    {reviewStar >= 5 ? (
                                        <Icon name="star" color={"#FEA116"} size={30} solid />
                                    ) : (
                                        <Icon name="star" color={"black"} size={30} />
                                    )}
                                </TouchableOpacity>
                            </View>
                            {checkStar ? (
                                <Text style={{ color: "red", textAlign: "center" }}>Choose star for item!</Text>
                            ) : null}
                            <Text style={{ paddingVertical: 10, fontSize: 16, color: "#0F172B" }}>Write your review :</Text>
                            <TextInput style={{ width: "100%", borderWidth: 1, borderColor: "gray", height: 100, verticalAlign: "top", borderRadius: 6 }} onChange={(e) => setReviewMessage(e.nativeEvent.text)} />
                            <TouchableOpacity style={{ width: "100%", alignItems: "center", backgroundColor: "#FEA116", marginVertical: 15, paddingVertical: 8 }} onPress={() => addreview(item._id)}>
                                {load ? (
                                    <ActivityIndicator size={21} color={"#fff"} />
                                ) : (
                                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Submit review</Text>
                                )}
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}
export default WriteReview