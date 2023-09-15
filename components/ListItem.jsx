import { View, Text, TouchableOpacity, Image, Touchable } from 'react-native';

export default function ListItem({
  name,
  symbol,
  currentPrice,
  priceChangePercentage7d,
  logoUrl,
  onPress,
}) {
  const styleText =
    priceChangePercentage7d >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex flex-row px-4 mb-8 items-center justify-between w-[98%]">
        {/* Left Side */}
        <View className="flex-row items-center">
          <Image className="h-[48px] w-[48px]" source={{ uri: logoUrl }} />
          <View className="ml-2">
            <Text className="text-lg">{name}</Text>
            <Text className="text-sm text-[#7f7f7f]">
              {symbol.toUpperCase()}
            </Text>
          </View>
        </View>
        {/* Right Side */}
        <View className="items-end">
          <Text className="text-lg">
            ${currentPrice.toLocaleString('en-US', { currency: 'USD' })}
          </Text>
          <Text className={`text-sm ${styleText}`}>
            {priceChangePercentage7d?.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
