import { Text, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { TabView, TabBar } from 'react-native-tab-view';
import DrawerHeader from "../../component/AdminComp/DrawerHeader";
import HeroChange from "../../component/ManagerComp/UI/HeroChange";
import AboutChange from "../../component/ManagerComp/UI/AboutChange";
import MenuChange from "../../component/ManagerComp/UI/MenuChange";
import FooterChange from "../../component/ManagerComp/UI/FooterChange";

function UImanager() {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Hero' },
        { key: 'second', title: 'About' },
        { key: 'third', title: 'Menu' },
        { key: 'fourth', title: 'Footer' },
    ]);

    const renderScene = ({ route, jumpTo }: { route: any, jumpTo: any }) => {
        switch (route.key) {
            case 'first':
                return <HeroChange index={index} />;
            case 'second':
                return <AboutChange index={index} />;
            case 'third':
                return <MenuChange index={index} />;
            case 'fourth':
                return <FooterChange index={index} />;
            default:
                return null;
        }
    };

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#FEA116' }}
            style={{ backgroundColor: '#fff' }}
            renderLabel={({ route, focused }) => (
                <Text style={{ color: focused ? "#FEA116" : "#0F172B", fontSize: 17 }}>{route.title}</Text>
            )}
        />
    );

    return (
        <>
            <DrawerHeader title={"UI management"} />
            <TabView
                lazy={true}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get("screen").width }}
                renderTabBar={renderTabBar}
                style={{ flex: 1 }}
            />
        </>
    )
}

export default UImanager