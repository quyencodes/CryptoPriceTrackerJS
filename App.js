import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

// other file imports
import ListItem from './components/ListItem.jsx';
import Chart from './components/Chart.jsx';
import { getMarketData } from './services/handlers';

export default function App() {
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState();

  useEffect(() => {
    const fetchMarketData = async () => {
      let marketData = await getMarketData();
      setData(marketData);
    };
    fetchMarketData();
  }, []);

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
  };

  const ListHeader = () => {
    return (
      <>
        <View className="mt-20 px-8 mb-2">
          <Text className="font-bold text-xl">Markets</Text>
        </View>
        {/* Horizontal Divider */}
        <View className="border-[#d3d3d3] border-b-2 w-[90%] m-4"></View>
      </>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView className="flex-1 bg-white">
          {data && (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ListItem
                  name={item.name}
                  symbol={item.symbol}
                  currentPrice={item.current_price}
                  priceChangePercentage7d={
                    item.price_change_percentage_7d_in_currency
                  }
                  logoUrl={item.image}
                  onPress={() => openModal(item)}
                />
              )}
              ListHeaderComponent={<ListHeader />}
            />
          )}
          <StatusBar style="auto" />
        </SafeAreaView>
        <BottomSheetModal
          style={styles.bottomSheet}
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          {selectedCoinData ? (
            <Chart
              currentPrice={selectedCoinData?.current_price}
              symbol={selectedCoinData?.symbol}
              logoUrl={selectedCoinData?.image}
              name={selectedCoinData?.name}
              priceChangePercentage7d={
                selectedCoinData?.price_change_percentage_7d_in_currency
              }
              sparkline={selectedCoinData?.sparkline_in_7d}
            />
          ) : (
            <View>
              <Text>No Data</Text>
            </View>
          )}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  modalProvider: {
    backgroundColor: '#ffffff',
  },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
