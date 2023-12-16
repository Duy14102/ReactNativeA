import { Text, Dimensions } from "react-native";
import { TabView, TabBar } from 'react-native-tab-view';
import { useState } from "react";
import CartPage from "../component/CartComp/CartPage";
import CompletePage from "../component/CartComp/CompletePage";
import CheckoutPage from "../component/CartComp/CheckoutPage";
import Header from "../component/Header";

function Cart() {
    const [index, setIndex] = useState(0);
    const [shippingFee, setShippingFee] = useState(30000)
    const [routes] = useState([
        { key: 'first', title: 'Cart' },
        { key: 'second', title: 'Checkout' },
        { key: 'third', title: 'Complete' },
    ]);

    const renderScene = ({ route, jumpTo }: { route: any, jumpTo: any }) => {
        switch (route.key) {
            case 'first':
                return <CartPage jumpTo={jumpTo} setShippingFee={setShippingFee} shippingFee={shippingFee} index={index}/>;
            case 'second':
                return <CheckoutPage jumpTo={jumpTo} index={index} shippingFee={shippingFee} />;
            case 'third':
                return <CompletePage index={index} jumpTo={jumpTo}/>;
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
            <Header type={null} />
            <TabView
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

export default Cart