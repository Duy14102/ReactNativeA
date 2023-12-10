import { ScrollView, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions, RefreshControl } from "react-native"
import Header from "../component/Header"
import Footer from "../component/Footer"
import { useEffect, useState, useRef } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from "axios"
import { TextInput } from "react-native"
import Carousel from 'react-native-reanimated-carousel';
import 'react-native-gesture-handler'
import { jwtDecode } from "jwt-decode"
import AsyncStorage from '@react-native-async-storage/async-storage';

function DetailPage({ route, navigation }: { route: any, navigation: any }) {
    const [candecode, setCandecode] = useState(null)
    const width = Dimensions.get('window').width;
    const [detail, setDetail] = useState([])
    const [menu, setMenu] = useState([])
    const [quantity, setQuantity] = useState("1")
    const { name, category } = route.params;
    const scrollViewRef = useRef<any>(null);
    const [refresh, setFresh] = useState(false)
    const [pageCount, setPageCount] = useState(6);
    const [wowreview, setWowReview] = useState([])
    const currentPage = useRef<any>();

    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            GetDetail()
            GetSimilar()
            setFresh(false)
        }, 1000)
    }

    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN');
            if (token) {
                setCandecode(jwtDecode(token))
            } else {
                setCandecode(null)
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        GetDetail()
        GetSimilar()
        getData()
    }, [route.params])

    function GetDetail() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/GetDetailMenu",
            params: {
                foodid: name
            }
        }
        axios(configuration)
            .then((res) => {
                setDetail(res.data)
            }).catch((err) => {
                console.log(err);
            })
    }

    function GetSimilar() {
        const configuration2 = {
            method: "get",
            url: "http://localhost:3000/GetSimilarP",
            params: {
                cate: category,
                name: name
            }
        }
        axios(configuration2)
            .then((res) => {
                setMenu(res.data.data)
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        currentPage.current = 1;
        Object.values(detail).map(i => {
            outshin(i)
            return null
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detail])

    const outshin = (i: any) => {
        const page = currentPage.current
        const limit = 5

        const start = (page - 1) * limit
        const end = page * limit

        const results = { total: null, pageCounts: 0, result: [], next: {}, prev: {} }
        results.total = i.review?.length
        results.pageCounts = Math.ceil(i.review?.length / limit)

        if (end < i.review?.length) {
            results.next = {
                page: page + 1
            }
        }
        if (start > 0) {
            results.prev = {
                page: page - 1
            }
        }

        results.result = i.review?.slice(start, end)
        setWowReview(results.result)
        setPageCount(results.pageCounts)
    }

    function HandlePageClick(i: any, e: any) {
        currentPage.current = i + 1
        outshin(e)
    }

    function pagePrev(i: any) {
        if (currentPage.current <= 1) {
            return false
        }
        currentPage.current = currentPage.current - 1
        outshin(i)
    }
    function pageNext(i: any) {
        if (currentPage.current >= pageCount) {
            return false
        }
        currentPage.current = currentPage.current + 1
        outshin(i)
    }

    const pageButton = (count: any, item: any) => {
        return Array.from(Array(count), (e, i) => {
            return (
                <TouchableOpacity key={i} style={i + 1 === currentPage.current ? detailStyle.buttonPaginate : detailStyle.buttonPaginate2} onPress={() => HandlePageClick(i, item)}>
                    <Text style={i + 1 === currentPage.current ? detailStyle.textButtonPaginate : detailStyle.textButtonPaginate2}>{i + 1}</Text>
                </TouchableOpacity>
            )
        })
    }

    const plus = (e: any) => {
        var number = parseInt(quantity)
        number += 1
        if (number > e) {
            return false
        }
        const change = number.toString()
        setQuantity(change)
    }

    const minus = () => {
        var number = parseInt(quantity)
        number -= 1
        if (number < 1) {
            return false
        }
        const change = number.toString()
        setQuantity(change)
    }

    const onPressTouch = (nameN: any, cateN: any) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true })
        }
        navigation.navigate('DetailPage', { name: nameN, category: cateN })
    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const imgUser = "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
    const rating = (stars: any) => '★★★★★☆☆☆☆☆'.slice(5 - stars, 10 - stars);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView ref={scrollViewRef} contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
                <Header type={"Yes"} />
                <View style={{ flex: 1, paddingVertical: 15 }}>
                    {Object.values(detail).map((i: any) => {
                        return (
                            <View key={i._id} style={{ paddingVertical: 15 }}>
                                <View style={{ paddingHorizontal: 15 }}>
                                    <Image source={{ uri: i.foodimage }} style={{ width: "100%", height: 200 }} />
                                    <View style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 15 }}>
                                        <Text style={{ fontSize: 18, color: "#0F172B", fontWeight: "bold" }}>{i.foodname}</Text>
                                        <Text style={{ fontSize: 15, color: "#0F172B" }}>{i.foodcategory}</Text>
                                        <Text style={{ fontSize: 15, color: "#0F172B" }}>{VND.format(i.foodprice)}</Text>
                                        <Text style={{ fontSize: 15, color: "#0F172B" }}>Quantity : {i.foodquantity}</Text>
                                        <Text style={{ fontSize: 15, color: "#0F172B" }}>{i.review?.length} review from customer</Text>
                                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", height: 50, gap: 5 }}>
                                            <TouchableOpacity style={detailStyle.buttonPlus} onPress={() => minus()}>
                                                <Icon name="minus" />
                                            </TouchableOpacity>
                                            <TextInput keyboardType="numeric" value={quantity} style={detailStyle.input}></TextInput>
                                            <TouchableOpacity style={detailStyle.buttonPlus} onPress={() => plus(i.foodquantity)}>
                                                <Icon name="plus" />
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={detailStyle.addtocart}>
                                            <Text style={detailStyle.textAddtocart}>Add to cart</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={{
                                            borderBottomColor: 'gray',
                                            borderBottomWidth: 1,
                                            paddingVertical: 15
                                        }}
                                    />
                                    <Text style={{ paddingTop: 20, fontSize: 15, fontWeight: "bold" }}>Description :</Text>
                                    <Text style={{ fontSize: 15 }}>{i.fooddescription}</Text>
                                    <View
                                        style={{
                                            borderBottomColor: 'gray',
                                            borderBottomWidth: 1,
                                            paddingVertical: 15
                                        }}
                                    />
                                    <View style={{ paddingTop: 20 }}>
                                        {candecode ? null : (
                                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 3 }}>
                                                <Text style={detailStyle.logintoR}>You need</Text>
                                                <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
                                                    <Text style={[detailStyle.logintoR, { color: "#FEA116" }]}>Login</Text>
                                                </TouchableOpacity>
                                                <Text style={detailStyle.logintoR}>to review this item!</Text>
                                            </View>
                                        )}
                                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10 }}>
                                            <View style={{ display: "flex", flexDirection: "row" }}>
                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Review : </Text>
                                                {i.review?.length === 0 ? (
                                                    <Text style={detailStyle.logintoR}>There's no review yet! </Text>
                                                ) : (
                                                    <Text style={detailStyle.logintoR}>There's total {i.review?.length} review</Text>
                                                )}
                                            </View>
                                            {candecode ? (
                                                <TouchableOpacity onPress={() => navigation.navigate('WriteReview', { item: i, candecode: candecode })}>
                                                    <Icon name="edit" style={{ fontSize: 18 }} />
                                                </TouchableOpacity>
                                            ) : null}
                                        </View>
                                        {wowreview.length > 0 ? (
                                            <View style={{ display: "flex", flexDirection: "column", gap: 20, marginVertical: 15, padding: 7, backgroundColor: "#FFFFFF" }}>
                                                {wowreview.map((k: any) => {
                                                    return (
                                                        <View key={k.id}>
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
                                                            <View
                                                                style={{
                                                                    borderBottomColor: 'gray',
                                                                    borderBottomWidth: 0.8,
                                                                    paddingTop: 20
                                                                }}
                                                            />
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        ) : null}
                                        {i.review?.length > 5 ? (
                                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 }}>
                                                <TouchableOpacity style={currentPage.current === 1 ? detailStyle.prevNotActive : detailStyle.buttonPaginate3} onPress={() => pagePrev(i)}>
                                                    <Text style={currentPage.current === 1 ? detailStyle.textPrevNotActive : detailStyle.textPrevActive}>{"< Prev"}</Text>
                                                </TouchableOpacity>
                                                {pageButton(pageCount, i)}
                                                <TouchableOpacity style={currentPage.current >= pageCount ? detailStyle.prevNotActive : detailStyle.buttonPaginate3} onPress={() => pageNext(i)}>
                                                    <Text style={currentPage.current >= pageCount ? detailStyle.textPrevNotActive : detailStyle.textPrevActive}>{"Next >"}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : null}
                                    </View>
                                    <View
                                        style={{
                                            borderBottomColor: 'gray',
                                            borderBottomWidth: 1,
                                            paddingVertical: 15
                                        }}
                                    />
                                </View>
                                <View style={{ paddingTop: 20 }}>
                                    <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>Similar Items</Text>
                                    <Carousel
                                        loop
                                        width={width}
                                        height={width / 2 + 100}
                                        autoPlay={true}
                                        data={menu}
                                        scrollAnimationDuration={1500}
                                        renderItem={({ item }: { item: any }) => (
                                            <View style={detailStyle.carousel} key={item._id}>
                                                {item.foodcategory === i.foodcategory ? (
                                                    <>
                                                        <TouchableOpacity style={{ width: "100%" }} onPress={() => onPressTouch(item.foodname, item.foodcategory)}>
                                                            <Image source={{ uri: item.foodimage }} style={{ width: "100%", height: 200 }} />
                                                        </TouchableOpacity>
                                                        <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, paddingTop: 7 }}>
                                                            <TouchableOpacity onPress={() => onPressTouch(item.foodname, item.foodcategory)}>
                                                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.foodname}</Text>
                                                            </TouchableOpacity>
                                                            <Text style={{ fontSize: 15 }}>{item.foodcategory}</Text>
                                                            <Text style={{ fontSize: 15 }}>{VND.format(item.foodprice)}</Text>
                                                        </View>
                                                    </>
                                                ) : null}
                                            </View>
                                        )}
                                    />
                                </View>
                            </View>
                        )
                    })}

                </View>
                <Footer />
            </ScrollView>
        </SafeAreaView>
    )
}

const detailStyle = StyleSheet.create({
    buttonPlus: {
        backgroundColor: "lightgray",
        padding: 11
    },

    input: {
        borderWidth: 1,
        height: "70%",
        width: 50,
        textAlign: "center",
    },

    addtocart: {
        backgroundColor: "#FEA116",
        width: 126,
        paddingHorizontal: 15,
        paddingVertical: 7,
        alignItems: "center",
        borderRadius: 3
    },

    textAddtocart: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15
    },

    carousel: {
        paddingVertical: 10,
        alignItems: "center"
    },

    logintoR: {
        fontSize: 15
    },

    buttonPaginate: {
        backgroundColor: "#FEA116",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "#FEA116"
    },

    prevNotActive: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "gray",
    },

    textPrevNotActive: {
        color: "gray",
        fontWeight: "bold",
        fontSize: 15
    },

    textPrevActive: {
        color: "#FEA116",
        fontWeight: "bold",
        fontSize: 15
    },

    textButtonPaginate: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15
    },

    buttonPaginate2: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "gray"
    },

    textButtonPaginate2: {
        color: "#0F172B",
        fontWeight: "bold",
        fontSize: 15
    },

    buttonPaginate3: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "gray",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
})
export default DetailPage