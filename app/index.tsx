import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import SplashScreen from './loading/splash';

export default function Index() {
  const router = useRouter();
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashFinish = () => {
    setSplashDone(true);
    router.replace('/auth/login');
  };

  return (
    <View style={{ flex: 1 }}>
      {!splashDone && <SplashScreen onFinish={handleSplashFinish} />}
    </View>
  );
}
