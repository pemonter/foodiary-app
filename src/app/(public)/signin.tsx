import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { router } from 'expo-router';

import { useAuth } from '@/hooks/useAuth';

import { AuthLayout } from '../../components/AuthLayout';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { colors } from '../../styles/colors';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon } from 'lucide-react-native';
import z from 'zod';

const schema = z.object({
  email: z.email('Informe um e-mail válido'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

export default function SignIn() {
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { signIn } = useAuth();

  const handleSignIn = handleSubmit(async (formData) => {
    try {
      await signIn(formData);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <AuthLayout
      icon="👤"
      title="Entre em sua conta"
      subtitle="Acesse sua conta para continuar"
    >
      <View className="justify-between flex-1">
        <View className="gap-6">
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <Input
                label="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Input
                label="Senha"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password"
                secureTextEntry
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </View>

        <View className="flex-row gap-6">
          <Button
            onPress={router.back}
            size="icon"
            color="gray"
            disabled={formState.isSubmitting}
          >
            <ArrowLeftIcon size={20} color={colors.black[700]} />
          </Button>
          <Button
            className="flex-1"
            onPress={handleSignIn}
            loading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </View>
      </View>
    </AuthLayout>
  );
}
