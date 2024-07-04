import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/services/auth/auth.helper';
import { useEffect } from 'react';

export default function UseIsAuth() {
  const accessToken = getAccessToken();
  const { replace } = useRouter();
  useEffect(() => {
    if (!accessToken) {
      return replace('/login');
    }
  }, [replace, accessToken]);
}
