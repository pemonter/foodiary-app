import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { httpClient } from '@/services/httpClient';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  goal: string;
  gender: string;
  birthDate: string;
  activityLevel: number;
  height: number;
  weight: number;
  account: {
    name: string;
    email: string;
    password: string;
  };
};

type User = {
  name: string;
  id: string;
  email: string;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
};

interface AuthContextValue {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  signIn: (data: SignInParams) => Promise<void>;
  signUp: (data: SignUpParams) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextValue);

const TOKEN_STORAGE_KEY = '@foodiary:token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingToken, setIsLoadingToken] = useState(true);
  const queryClient = useQueryClient();

  const { mutateAsync: signIn } = useMutation({
    mutationFn: async (params: SignInParams) => {
      const { data } = await httpClient.post('/signin', params);
      setToken(data.accessToken);
    },
  });

  const { mutateAsync: signUp } = useMutation({
    mutationFn: async (params: SignUpParams) => {
      const { data } = await httpClient.post('/signup', params);
      setToken(data.accessToken);
    },
  });

  const { data: user, isFetching } = useQuery({
    enabled: !!token,
    queryKey: ['user', token],
    queryFn: async () => {
      const { data } = await httpClient.get('/me');
      const { user } = data;

      return user;
    },
  });

  const signOut = useCallback(async () => {
    setToken(null);
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    queryClient.clear();
  }, []);

  useEffect(() => {
    async function load() {
      const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      setToken(token);
      setIsLoadingToken(false);
    }

    load();
  }, []);

  useEffect(() => {
    async function run() {
      if (!token) {
        httpClient.defaults.headers.common.Authorization = null;
        return;
      }

      httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
    }

    run();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        isLoading: isLoadingToken || isFetching,
        user: user ?? null,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
