import { View, Text, Image, Dimensions } from 'react-native';
import { useEffect } from 'react';

export default function Chart({
  currentPrice,
  symbol,
  logoUrl,
  name,
  priceChangePercentage7d,
  sparkline,
}) {
  const styleText =
    priceChangePercentage7d >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <View className="m-8">
      {/* Top Row */}
      <View className="mx-4">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Image
              className="w-[24px] h-[24px] mr-2"
              source={{ uri: logoUrl }}
            />
            <Text className="text-[#7d7d7d] text-sm">
              {name} ({symbol.toUpperCase()})
            </Text>
          </View>
          <Text className="text-sm">7d</Text>
        </View>
        {/* Bottom Row */}
        <View className="flex-row justify-between items-center">
          <Text className="text-lg text-black font-bold">
            ${currentPrice.toLocaleString('en-US', { currency: 'USD' })}
          </Text>
          <Text className={`text-sm ${styleText}`}>
            {priceChangePercentage7d?.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );
}
