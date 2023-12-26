import { ScrollView, View, RefreshControl, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator, useWindowDimensions } from "react-native";
import { Fragment, useState, useEffect, useRef } from "react";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import RenderHtml from 'react-native-render-html';
import Icon from "react-native-vector-icons/FontAwesome5";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

function HeroChange({ index }: { index: any }) {
    const { width } = useWindowDimensions();
    const isfocused = useIsFocused()
    const [refresh, setFresh] = useState(false);
    const [load, setLoad] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [load3, setLoad3] = useState(false);
    const [data, setData] = useState([])
    const [checkHero, setCheckHero] = useState(false)
    const [checkCircle, setCheckCircle] = useState(false)
    const [checkword1, setCheckWord1] = useState(false)
    const [checkword2, setCheckWord2] = useState(false)
    const [checkword3, setCheckWord3] = useState(false)
    const [wordup, setWordup] = useState<any>("")
    const [wordmiddle, setWordmiddle] = useState<any>("")
    const [worddown, setWorddown] = useState<any>("")
    const [image, setImage] = useState<any>()
    const [image2, setImage2] = useState<any>()
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
            url: "http://localhost:3000/GetHeroManager",
            params: {
                title: "Hero"
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
        if (isfocused || index === 0) { dataSynb() }
    }, [index, isfocused])

    const changeWordUp = (i: any) => {
        var text = wordup
        if (text === "") {
            text === i
        }
        const configuration = {
            method: "post",
            url: "http://localhost:3000/ChangeWordUp",
            data: {
                title: "Hero",
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
            url: "http://localhost:3000/ChangeWordMiddle",
            data: {
                title: "Hero",
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
            url: "http://localhost:3000/ChangeWordDown",
            data: {
                title: "Hero",
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
        var mag = image
        if (!mag) {
            mag = url
        }
        const configuration = {
            method: "post",
            url: "http://localhost:3000/ChangeHeroImage",
            data: {
                title: "Hero",
                name: name,
                image: mag
            }
        }
        setLoad2(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad2(false)
                    setCheckHero(false)
                    setImage(null)
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
            url: "http://localhost:3000/ChangeHeroImage",
            data: {
                title: "Hero",
                name: name,
                image: mag
            }
        }
        setLoad3(true)
        setTimeout(() => {
            axios(configuration)
                .then(() => {
                    setLoad3(false)
                    setCheckCircle(false)
                    setImage2(null)
                    dataSynb()
                }).catch((er) => {
                    setLoad3(false)
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
                        setImage(imagesss)
                    })
                }
            });
        } else if (type === "two") {
            launchImageLibrary({ mediaType: "photo", includeBase64: true }, (response) => {
                if (response.assets) {
                    response.assets?.map((i) => {
                        const imagesss = `data:${i.type};base64,${i.base64}`;
                        setImage2(imagesss)
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
                        setImage(imagesss)
                    })
                }
            });
        } else if (type === "two") {
            launchCamera({ mediaType: "photo", includeBase64: true }, (response) => {
                if (response.assets) {
                    response.assets?.map((i) => {
                        const imagesss = `data:${i.type};base64,${i.base64}`;
                        setImage2(imagesss)
                    })
                }
            });
        }
    }

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
            <View style={{ flex: 1, padding: 15 }}>
                {data?.map((i: any) => {
                    return (
                        <Fragment key={i._id}>
                            {i.image?.map((a: any) => {
                                return (
                                    a.name === "e4onxrx7hmgzmrbel9jk" ? (
                                        <View key={a.name} style={style.shadow}>
                                            <View style={{ padding: 15 }}>
                                                <Image source={{ uri: image ? image : a.url }} style={{ width: "100%", height: 200, resizeMode: "contain" }} />
                                                <Text style={{ fontSize: 16, textAlign: "center", fontWeight: "bold", padding: 10 }}>Hero background</Text>
                                                {checkHero ? (
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
                                                    <TouchableOpacity style={{ position: "absolute", bottom: 10, right: 10 }} onPress={() => setCheckHero(true)}>
                                                        <Text style={{ color: "black", fontSize: 22 }}>⚙️</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                            {load2 ? (
                                                <ActivityIndicator size={25} color={"#FEA116"} />
                                            ) : null}
                                            {checkHero ? (
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <TouchableOpacity style={{ backgroundColor: "#03ba5f", width: "50%", alignItems: "center", paddingVertical: 4, borderBottomLeftRadius: 6 }} onPress={() => changeImage1(a.name, a.url)}>
                                                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Done</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ backgroundColor: "gray", width: "50%", alignItems: "center", paddingVertical: 4, borderBottomRightRadius: 6 }} onPress={() => { setCheckHero(false); setImage(null) }}>
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
                                    a.name === "oh2rwdomomeno4sgguhf" ? (
                                        <View key={a.name} style={style.shadow}>
                                            <View style={{ padding: 15 }}>
                                                <Image source={{ uri: image2 ? image2 : a.url }} style={{ width: "100%", height: 200, resizeMode: "contain" }} />
                                                <Text style={{ fontSize: 16, textAlign: "center", fontWeight: "bold", padding: 15 }}>Hero circle</Text>
                                                {checkCircle ? (
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
                                                    <TouchableOpacity style={{ position: "absolute", bottom: 10, right: 10 }} onPress={() => setCheckCircle(true)}>
                                                        <Text style={{ color: "black", fontSize: 22 }}>⚙️</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                            {load3 ? (
                                                <ActivityIndicator size={25} color={"#FEA116"} />
                                            ) : null}
                                            {checkCircle ? (
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <TouchableOpacity style={{ backgroundColor: "#03ba5f", width: "50%", alignItems: "center", paddingVertical: 4, borderBottomLeftRadius: 6 }} onPress={() => changeImage2(a.name, a.url)}>
                                                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Done</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ backgroundColor: "gray", width: "50%", alignItems: "center", paddingVertical: 4, borderBottomRightRadius: 6 }} onPress={() => { setCheckCircle(false); setImage2(null) }}>
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
        </ScrollView >
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

export default HeroChange