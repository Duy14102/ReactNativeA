import { ScrollView, View, RefreshControl, StyleSheet, Image, Text, TouchableOpacity, ActivityIndicator, useWindowDimensions } from "react-native";
import { useState, useEffect, Fragment, useRef } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import RenderHtml from 'react-native-render-html';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import Icon from "react-native-vector-icons/FontAwesome5";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

function AboutChange({ index }: { index: any }) {
    const { width } = useWindowDimensions();
    const isfocused = useIsFocused()
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [load3, setLoad3] = useState(false);
    const [load4, setLoad4] = useState(false);
    const [load5, setLoad5] = useState(false);
    const [refresh, setFresh] = useState(false);
    const [checkImage1, setCheckImage1] = useState(false)
    const [checkImage2, setCheckImage2] = useState(false)
    const [checkImage3, setCheckImage3] = useState(false)
    const [checkImage4, setCheckImage4] = useState(false)
    const [checkword1, setCheckWord1] = useState(false)
    const [checkword2, setCheckWord2] = useState(false)
    const [checkword3, setCheckWord3] = useState(false)
    const [wordup, setWordup] = useState<any>("")
    const [wordmiddle, setWordmiddle] = useState<any>("")
    const [worddown, setWorddown] = useState<any>("")
    const [image1, setImage1] = useState<any>()
    const [image2, setImage2] = useState<any>()
    const [image3, setImage3] = useState<any>()
    const [image4, setImage4] = useState<any>()
    const word1 = useRef<any>();
    const word2 = useRef<any>();
    const word3 = useRef<any>();
    const pulldown = () => {
        setFresh(true)
        setTimeout(() => {
            dataSynb()
            setFresh(false)
        }, 1000)
    }

    const dataSynb = () => {
        const configuration = {
            method: "get",
            url: "http://192.168.1.216:3000/GetHeroManager",
            params: {
                title: "About"
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
        if (isfocused || index === 1) { dataSynb() }
    }, [index, isfocused])

    const changeWordUp = (i: any) => {
        var text = wordup
        if (text === "") {
            text === i
        }
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/ChangeWordUp",
            data: {
                title: "About",
                wordup: text
            }
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    dataSynb()
                }).catch((er) => {
                    console.log(er);
                    setLoad(false)
                })
        }, 1000);
    }

    const changeWordMiddle = (i: any) => {
        var text = wordmiddle
        if (text === "") {
            text === i
        }
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/ChangeWordMiddle",
            data: {
                title: "About",
                wordmiddle: text
            }
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    dataSynb()
                }).catch((er) => {
                    console.log(er);
                    setLoad(false)
                })
        }, 1000);
    }

    const changeWordDown = (i: any) => {
        var text = worddown
        if (text === "") {
            text === i
        }
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/ChangeWordDown",
            data: {
                title: "About",
                worddown: text
            }
        }
        setLoad(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad(false)
                    dataSynb()
                }).catch((er) => {
                    console.log(er);
                    setLoad(false)
                })
        }, 1000);
    }

    const changeImage1 = (name: any, url: any) => {
        var mag = image1
        if (!mag) {
            mag = url
        }
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/ChangeHeroImage",
            data: {
                title: "About",
                name: name,
                image: mag
            }
        }
        setLoad2(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad2(false)
                    setCheckImage1(false)
                    setImage1(null)
                    dataSynb()
                }).catch((er) => {
                    setLoad2(false)
                    console.log(er);
                })
        }, 1000);
    }

    const changeImage2 = (name: any, url: any) => {
        var mag = image2
        if (!mag) {
            mag = url
        }
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/ChangeHeroImage",
            data: {
                title: "About",
                name: name,
                image: mag
            }
        }
        setLoad3(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad3(false)
                    setCheckImage2(false)
                    setImage2(null)
                    dataSynb()
                }).catch((er) => {
                    setLoad3(false)
                    console.log(er);
                })
        }, 1000);
    }

    const changeImage3 = (name: any, url: any) => {
        var mag = image3
        if (!mag) {
            mag = url
        }
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/ChangeHeroImage",
            data: {
                title: "About",
                name: name,
                image: mag
            }
        }
        setLoad4(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad4(false)
                    setCheckImage3(false)
                    setImage3(null)
                    dataSynb()
                }).catch((er) => {
                    setLoad4(false)
                    console.log(er);
                })
        }, 1000);
    }

    const changeImage4 = (name: any, url: any) => {
        var mag = image4
        if (!mag) {
            mag = url
        }
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/ChangeHeroImage",
            data: {
                title: "About",
                name: name,
                image: mag
            }
        }
        setLoad5(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad5(false)
                    setCheckImage4(false)
                    setImage4(null)
                    dataSynb()
                }).catch((er) => {
                    setLoad5(false)
                    console.log(er);
                })
        }, 1000);
    }

    const openImagePicker = (type: any) => {
        if (type === "one") {
            launchImageLibrary({ mediaType: "photo", includeBase64: true }, (response) => {
                if (response.assets) {
                    response.assets?.map((i) => {
                        const imagesss = `data:${i.type};base64,${i.base64}`;
                        setImage1(imagesss)
                    })
                }
            });
        }
        if (type === "two") {
            launchImageLibrary({ mediaType: "photo", includeBase64: true }, (response) => {
                if (response.assets) {
                    response.assets?.map((i) => {
                        const imagesss = `data:${i.type};base64,${i.base64}`;
                        setImage2(imagesss)
                    })
                }
            });
        }
        if (type === "three") {
            launchImageLibrary({ mediaType: "photo", includeBase64: true }, (response) => {
                if (response.assets) {
                    response.assets?.map((i) => {
                        const imagesss = `data:${i.type};base64,${i.base64}`;
                        setImage3(imagesss)
                    })
                }
            });
        }
        if (type === "four") {
            launchImageLibrary({ mediaType: "photo", includeBase64: true }, (response) => {
                if (response.assets) {
                    response.assets?.map((i) => {
                        const imagesss = `data:${i.type};base64,${i.base64}`;
                        setImage4(imagesss)
                    })
                }
            });
        }
    };

    const handleCameraLaunch = (type: any) => {
        if (type === "one") {
            launchCamera({ mediaType: "photo", includeBase64: true }, (response) => {
                if (response.assets) {
                    response.assets?.map((i) => {
                        const imagesss = `data:${i.type};base64,${i.base64}`;
                        setImage1(imagesss)
                    })
                }
            });
        }
        if (type === "two") {
            launchCamera({ mediaType: "photo", includeBase64: true }, (response) => {
                if (response.assets) {
                    response.assets?.map((i) => {
                        const imagesss = `data:${i.type};base64,${i.base64}`;
                        setImage2(imagesss)
                    })
                }
            });
        }
        if (type === "three") {
            launchCamera({ mediaType: "photo", includeBase64: true }, (response) => {
                if (response.assets) {
                    response.assets?.map((i) => {
                        const imagesss = `data:${i.type};base64,${i.base64}`;
                        setImage3(imagesss)
                    })
                }
            });
        }
        if (type === "four") {
            launchCamera({ mediaType: "photo", includeBase64: true }, (response) => {
                if (response.assets) {
                    response.assets?.map((i) => {
                        const imagesss = `data:${i.type};base64,${i.base64}`;
                        setImage4(imagesss)
                    })
                }
            });
        }
    }
    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
            <View style={{ flex: 1 }}>
                {data?.map((i: any) => {
                    return (
                        <Fragment key={i._id}>
                            {i.image?.map((a: any) => {
                                return (
                                    a.name === "k9axej6qza2mzsp8lwvj" ? (
                                        <View key={a.name} style={style.shadow}>
                                            <View style={{ padding: 15 }}>
                                                <Image source={{ uri: image1 ? image1 : a.url }} style={{ width: "100%", height: 200, resizeMode: "contain" }} />
                                                <Text style={{ fontSize: 16, textAlign: "center", fontWeight: "bold", padding: 10 }}>Image 1</Text>
                                                {checkImage1 ? (
                                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                                        <TouchableOpacity style={{ backgroundColor: "#ccc", paddingVertical: 7, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", gap: 5 }} onPress={() => openImagePicker("one")}>
                                                            <Icon name="book-open" size={17} />
                                                            <Text style={{ fontSize: 15 }}>Library</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ backgroundColor: "#ccc", paddingVertical: 7, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", gap: 5 }} onPress={() => handleCameraLaunch("one")}>
                                                            <Icon name="camera" size={17} />
                                                            <Text style={{ fontSize: 15 }}>Camera</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : (
                                                    <TouchableOpacity style={{ position: "absolute", bottom: 10, right: 10 }} onPress={() => setCheckImage1(true)}>
                                                        <Text style={{ color: "black", fontSize: 22 }}>⚙️</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                            {load2 ? (
                                                <ActivityIndicator size={25} color={"#FEA116"} />
                                            ) : null}
                                            {checkImage1 ? (
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <TouchableOpacity style={{ backgroundColor: "#03ba5f", width: "50%", alignItems: "center", paddingVertical: 4, borderBottomLeftRadius: 6 }} onPress={() => changeImage1(a.name, a.url)}>
                                                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Done</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ backgroundColor: "gray", width: "50%", alignItems: "center", paddingVertical: 4, borderBottomRightRadius: 6 }} onPress={() => { setCheckImage1(false); setImage1(null) }}>
                                                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Cancel</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ) : null}
                                        </View>
                                    ) : null
                                )
                            })}
                            {i.image?.map((a: any) => {
                                return (
                                    a.name === "ixdn78iskyewdqszx4rf" ? (
                                        <View key={a.name} style={style.shadow}>
                                            <View style={{ padding: 15 }}>
                                                <Image source={{ uri: image2 ? image2 : a.url }} style={{ width: "100%", height: 200, resizeMode: "contain" }} />
                                                <Text style={{ fontSize: 16, textAlign: "center", fontWeight: "bold", padding: 15 }}>Image 2</Text>
                                                {checkImage2 ? (
                                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                                        <TouchableOpacity style={{ backgroundColor: "#ccc", paddingVertical: 7, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", gap: 5 }} onPress={() => openImagePicker("two")}>
                                                            <Icon name="book-open" size={17} />
                                                            <Text style={{ fontSize: 15 }}>Library</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ backgroundColor: "#ccc", paddingVertical: 7, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", gap: 5 }} onPress={() => handleCameraLaunch("two")}>
                                                            <Icon name="camera" size={17} />
                                                            <Text style={{ fontSize: 15 }}>Camera</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : (
                                                    <TouchableOpacity style={{ position: "absolute", bottom: 10, right: 10 }} onPress={() => setCheckImage2(true)}>
                                                        <Text style={{ color: "black", fontSize: 22 }}>⚙️</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                            {load3 ? (
                                                <ActivityIndicator size={25} color={"#FEA116"} />
                                            ) : null}
                                            {checkImage2 ? (
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <TouchableOpacity style={{ backgroundColor: "#03ba5f", width: "50%", alignItems: "center", paddingVertical: 4, borderBottomLeftRadius: 6 }} onPress={() => changeImage2(a.name, a.url)}>
                                                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Done</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ backgroundColor: "gray", width: "50%", alignItems: "center", paddingVertical: 4, borderBottomRightRadius: 6 }} onPress={() => { setCheckImage2(false); setImage2(null) }}>
                                                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Cancel</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ) : null}
                                        </View>
                                    ) : null
                                )
                            })}
                            {i.image?.map((a: any) => {
                                return (
                                    a.name === "ucvurntwkq3pgbvq8scl" ? (
                                        <View key={a.name} style={style.shadow}>
                                            <View style={{ padding: 15 }}>
                                                <Image source={{ uri: image2 ? image2 : a.url }} style={{ width: "100%", height: 200, resizeMode: "contain" }} />
                                                <Text style={{ fontSize: 16, textAlign: "center", fontWeight: "bold", padding: 15 }}>Image 3</Text>
                                                {checkImage3 ? (
                                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                                        <TouchableOpacity style={{ backgroundColor: "#ccc", paddingVertical: 7, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", gap: 5 }} onPress={() => openImagePicker("three")}>
                                                            <Icon name="book-open" size={17} />
                                                            <Text style={{ fontSize: 15 }}>Library</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ backgroundColor: "#ccc", paddingVertical: 7, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", gap: 5 }} onPress={() => handleCameraLaunch("three")}>
                                                            <Icon name="camera" size={17} />
                                                            <Text style={{ fontSize: 15 }}>Camera</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : (
                                                    <TouchableOpacity style={{ position: "absolute", bottom: 10, right: 10 }} onPress={() => setCheckImage3(true)}>
                                                        <Text style={{ color: "black", fontSize: 22 }}>⚙️</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                            {load4 ? (
                                                <ActivityIndicator size={25} color={"#FEA116"} />
                                            ) : null}
                                            {checkImage3 ? (
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <TouchableOpacity style={{ backgroundColor: "#03ba5f", width: "50%", alignItems: "center", paddingVertical: 4, borderBottomLeftRadius: 6 }} onPress={() => changeImage3(a.name, a.url)}>
                                                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Done</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ backgroundColor: "gray", width: "50%", alignItems: "center", paddingVertical: 4, borderBottomRightRadius: 6 }} onPress={() => { setCheckImage3(false); setImage3(null) }}>
                                                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Cancel</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ) : null}
                                        </View>
                                    ) : null
                                )
                            })}
                            {i.image?.map((a: any) => {
                                return (
                                    a.name === "irnkhvizbt88rhedgys2" ? (
                                        <View key={a.name} style={style.shadow}>
                                            <View style={{ padding: 15 }}>
                                                <Image source={{ uri: image2 ? image2 : a.url }} style={{ width: "100%", height: 200, resizeMode: "contain" }} />
                                                <Text style={{ fontSize: 16, textAlign: "center", fontWeight: "bold", padding: 15 }}>Image 4</Text>
                                                {checkImage4 ? (
                                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                                                        <TouchableOpacity style={{ backgroundColor: "#ccc", paddingVertical: 7, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", gap: 5 }} onPress={() => openImagePicker("four")}>
                                                            <Icon name="book-open" size={17} />
                                                            <Text style={{ fontSize: 15 }}>Library</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ backgroundColor: "#ccc", paddingVertical: 7, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", gap: 5 }} onPress={() => handleCameraLaunch("four")}>
                                                            <Icon name="camera" size={17} />
                                                            <Text style={{ fontSize: 15 }}>Camera</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : (
                                                    <TouchableOpacity style={{ position: "absolute", bottom: 10, right: 10 }} onPress={() => setCheckImage4(true)}>
                                                        <Text style={{ color: "black", fontSize: 22 }}>⚙️</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                            {load5 ? (
                                                <ActivityIndicator size={25} color={"#FEA116"} />
                                            ) : null}
                                            {checkImage4 ? (
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <TouchableOpacity style={{ backgroundColor: "#03ba5f", width: "50%", alignItems: "center", paddingVertical: 4, borderBottomLeftRadius: 6 }} onPress={() => changeImage4(a.name, a.url)}>
                                                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Done</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ backgroundColor: "gray", width: "50%", alignItems: "center", paddingVertical: 4, borderBottomRightRadius: 6 }} onPress={() => { setCheckImage4(false); setImage4(null) }}>
                                                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Cancel</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ) : null}
                                        </View>
                                    ) : null
                                )
                            })}
                            <View style={{ marginVertical: 15, backgroundColor: "#fff", padding: 15 }}>
                                <View style={{ flexDirection: "column", gap: 5, marginVertical: 15 }}>
                                    {load ? (
                                        <ActivityIndicator size={25} color={"#FEA116"} />
                                    ) : null}
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 5 }}>Word 1</Text>
                                        {checkword1 ? (
                                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                                <TouchableOpacity onPress={() => { setCheckWord1(false); changeWordUp(i.word.up) }}>
                                                    <Text style={{ fontSize: 17 }}>Done</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { setCheckWord1(false); setWordup("") }}>
                                                    <Text style={{ fontSize: 17 }}>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <TouchableOpacity onPress={() => setCheckWord1(true)}>
                                                <Text style={{ color: "black", fontSize: 22 }}>⚙️</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    {checkword1 ? (
                                        <>
                                            <RichEditor
                                                placeholder={i.word.up}
                                                ref={word1}
                                                useContainer={false}
                                                containerStyle={{ minHeight: 100, borderWidth: 1, borderColor: "gray", borderRadius: 6 }}
                                                onChange={descriptionText => {
                                                    setWordup(descriptionText)
                                                }}
                                            />
                                            <RichToolbar
                                                editor={word1}
                                                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.setStrikethrough, actions.insertLink, actions.insertImage, actions.insertVideo, actions.undo, actions.redo]}
                                            />
                                        </>
                                    ) : (
                                        <View style={{ borderWidth: 1, borderColor: "gray", padding: 10, borderRadius: 6, height: 100, pointerEvents: "none" }}>
                                            <RenderHtml source={{ html: i.word.up }} contentWidth={width} />
                                        </View>
                                    )}
                                </View>
                                <View style={{ flexDirection: "column", gap: 5, marginVertical: 15 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 5 }}>Word 2</Text>
                                        {checkword2 ? (
                                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                                <TouchableOpacity onPress={() => { setCheckWord2(false); changeWordMiddle(i.word.middle) }}>
                                                    <Text style={{ fontSize: 17 }}>Done</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { setCheckWord2(false); setWordmiddle("") }}>
                                                    <Text style={{ fontSize: 17 }}>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <TouchableOpacity onPress={() => setCheckWord2(true)}>
                                                <Text style={{ color: "black", fontSize: 22 }}>⚙️</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    {checkword2 ? (
                                        <>
                                            <RichEditor
                                                placeholder={i.word.middle}
                                                ref={word2}
                                                useContainer={false}
                                                containerStyle={{ minHeight: 100, borderWidth: 1, borderColor: "gray", borderRadius: 6 }}
                                                onChange={descriptionText => {
                                                    setWordmiddle(descriptionText)
                                                }}
                                            />
                                            <RichToolbar
                                                editor={word2}
                                                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.setStrikethrough, actions.insertLink, actions.insertImage, actions.insertVideo, actions.undo, actions.redo]}
                                            />
                                        </>
                                    ) : (
                                        <View style={{ borderWidth: 1, borderColor: "gray", padding: 10, borderRadius: 6, height: 100, pointerEvents: "none" }}>
                                            <RenderHtml source={{ html: i.word.middle }} contentWidth={width} />
                                        </View>
                                    )}
                                </View>
                                <View style={{ flexDirection: "column", gap: 5, marginVertical: 15 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 5 }}>Word 3</Text>
                                        {checkword3 ? (
                                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                                <TouchableOpacity onPress={() => { setCheckWord3(false); changeWordDown(i.word.down) }}>
                                                    <Text style={{ fontSize: 17 }}>Done</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { setCheckWord3(false); setWorddown("") }}>
                                                    <Text style={{ fontSize: 17 }}>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <TouchableOpacity onPress={() => setCheckWord3(true)}>
                                                <Text style={{ color: "black", fontSize: 22 }}>⚙️</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    {checkword3 ? (
                                        <>
                                            <RichEditor
                                                placeholder={i.word.down}
                                                ref={word3}
                                                useContainer={false}
                                                containerStyle={{ minHeight: 100, borderWidth: 1, borderColor: "gray", borderRadius: 6 }}
                                                onChange={descriptionText => {
                                                    setWorddown(descriptionText)
                                                }}
                                            />
                                            <RichToolbar
                                                editor={word3}
                                                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.setStrikethrough, actions.insertLink, actions.insertImage, actions.insertVideo, actions.undo, actions.redo]}
                                            />
                                        </>
                                    ) : (
                                        <View style={{ borderWidth: 1, borderColor: "gray", padding: 10, borderRadius: 6, height: 100, pointerEvents: "none" }}>
                                            <RenderHtml source={{ html: i.word.down }} contentWidth={width} />
                                        </View>
                                    )}
                                </View>
                            </View>
                        </Fragment>
                    )
                })}
            </View>
        </ScrollView>
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
        elevation: 5,
        flexDirection: "column",
        gap: 10,
        borderRadius: 6,
        backgroundColor: "#fff",
        marginVertical: 15
    }
})

export default AboutChange