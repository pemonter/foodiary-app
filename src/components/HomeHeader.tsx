import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

import { useAuth } from '@/hooks/useAuth';

import { colors } from '@/styles/colors';

import { LogOutIcon } from 'lucide-react-native';

export function HomeHeader() {
  const { user, signOut } = useAuth();

  return (
    <View className="bg-lime-400 h-[130px]">
      <StatusBar style="dark" />
      <SafeAreaView className="px-4 flex-row items-center justify-between">
        <View>
          <Text className="text-gray-700 text-sm font-sans-regular">
            Olá, 👋
          </Text>
          <Text className="text-black-700 text-base font-sans-semibold">
            {user?.name}
          </Text>
        </View>

        <TouchableOpacity
          className="size-12 items-center justify-center"
          onPress={signOut}
        >
          <LogOutIcon color={colors.black[700]} size={20} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
