import { Image, Text, View } from 'react-native'
import images from '../constants/images'
import CustomButton from './custom-button'
import { router } from 'expo-router'

const EmptyState = ({ title, subTitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />

      <Text className="font-pmedium text-sm text-gray-100">{title}</Text>
      <Text className="font-psemibold text-xl text-white">{subTitle}</Text>
      <CustomButton
        title="Create video"
        handlePress={() => router.push('/create')}
        containerStyles="w-full my-5"
      />
    </View>
  )
}

export default EmptyState
