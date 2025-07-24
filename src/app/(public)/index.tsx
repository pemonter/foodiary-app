import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Link } from 'expo-router';

import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';

export default function Greeting() {
  return (
    <ImageBackground
      source={require('../../assets/onboarding-bg/onboarding-bg.png')}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-between">
          <View className="mx-auto mt-4">
            <Logo width={100} height={32} />
          </View>

          <View className="w-full items-center">
            <Text className="text-white text-[32px] font-sans-semibold w-[311px] text-center">
              Controle sua dieta de forma simples
            </Text>

            <View className="w-full p-5 mt-6">
              <Link href="/signup" asChild>
                <Button className="w-full">Criar conta</Button>
              </Link>
            </View>

            <View className="mt-[30px] flex-row items-center justify-center gap-2">
              <Text className="text-white text-base font-sans-regular">
                Já tem conta?
              </Text>
              <Link href="/signin">
                <Text className="text-lime-500 text-base font-sans-medium">
                  Acesse agora!
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
