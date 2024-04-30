import { useState } from 'react'

import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native'
import images from '../../constants/images'
import FormField from '../../components/form-field'
import CustomButton from '../../components/custom-button'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/global-provider'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const { setUser, setIsLogged } = useGlobalContext()
  const [isSubmitting, setSubmitting] = useState(false)

  const submit = async () => {
    if (form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields')
    }

    setSubmitting(true)

    try {
      await signIn(form.email, form.password)
      const result = await getCurrentUser()
      setUser(result)
      setIsLogged(true)

      console.log(result)

      Alert.alert('Success', 'User signed in successfully')
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>

            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
