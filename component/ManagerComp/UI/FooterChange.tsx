import { ScrollView, View, RefreshControl, useWindowDimensions, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useEffect, Fragment, useRef } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import RenderHtml from 'react-native-render-html';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

function FooterChange({ index }: { index: any }) {
    const { width } = useWindowDimensions();
    const isfocused = useIsFocused()
    const [data, setData] = useState([])
    const [refresh, setFresh] = useState(false);
    const [load, setLoad] = useState(false);
    const [checkword1, setCheckWord1] = useState(false)
    const [checkword2, setCheckWord2] = useState(false)
    const [checkword3, setCheckWord3] = useState(false)
    const [checkword4, setCheckWord4] = useState(false)
    const [wordup, setWordup] = useState<any>("")
    const [wordmiddle, setWordmiddle] = useState<any>("")
    const [worddown, setWorddown] = useState<any>("")
    const [wordtime, setWordtime] = useState<any>("")
    const word1 = useRef<any>();
    const word2 = useRef<any>();
    const word3 = useRef<any>();
    const word4 = useRef<any>();

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
                title: "Footer"
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
        if (isfocused || index === 3) { dataSynb() }
    }, [index, isfocused])

    const changeWordUp = (i: any) => {
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/ChangeWordUp",
            data: {
                title: "Footer",
                wordup: wordup
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
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/ChangeWordMiddle",
            data: {
                title: "Footer",
                wordmiddle: wordmiddle
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
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/ChangeWordDown",
            data: {
                title: "Footer",
                worddown: worddown
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

    const changeWordTime = (i: any) => {
        const configuration = {
            method: "post",
            url: "http://192.168.1.216:3000/ChangeWordTime",
            data: {
                title: "Footer",
                wordtime: wordtime
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
    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pulldown()} />}>
            <View style={{ flex: 1 }}>
                {data?.map((i: any) => {
                    return (
                        <Fragment key={i._id}>
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
                                <View style={{ flexDirection: "column", gap: 5, marginVertical: 15 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 16, fontWeight: "bold", paddingLeft: 5 }}>Word 4</Text>
                                        {checkword4 ? (
                                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                                <TouchableOpacity onPress={() => { setCheckWord4(false); changeWordTime(i.word.down) }}>
                                                    <Text style={{ fontSize: 17 }}>Done</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { setCheckWord4(false); setWordtime("") }}>
                                                    <Text style={{ fontSize: 17 }}>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <TouchableOpacity onPress={() => setCheckWord4(true)}>
                                                <Text style={{ color: "black", fontSize: 22 }}>⚙️</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    {checkword4 ? (
                                        <>
                                            <RichEditor
                                                placeholder={i.word.time}
                                                ref={word4}
                                                useContainer={false}
                                                containerStyle={{ minHeight: 100, borderWidth: 1, borderColor: "gray", borderRadius: 6 }}
                                                onChange={descriptionText => {
                                                    setWordtime(descriptionText)
                                                }}
                                            />
                                            <RichToolbar
                                                editor={word4}
                                                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.setStrikethrough, actions.insertLink, actions.insertImage, actions.insertVideo, actions.undo, actions.redo]}
                                            />
                                        </>
                                    ) : (
                                        <View style={{ borderWidth: 1, borderColor: "gray", padding: 10, borderRadius: 6, height: 100, pointerEvents: "none" }}>
                                            <RenderHtml source={{ html: i.word.time }} contentWidth={width} />
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

export default FooterChange