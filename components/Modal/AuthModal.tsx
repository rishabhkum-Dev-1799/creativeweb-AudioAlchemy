'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useSupabaseClient,
  useSessionContext,
} from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import Modal from './Modal';
import useAuthModal from '@/hooks/useAuthModal';

const AuthModal = () => {
  const router = useRouter();
  const { session } = useSessionContext();
  const supabaseClient = useSupabaseClient();
  const { isOpen, onClose } = useAuthModal();

  // useEffect for effect side handling
  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);
  // function handlers
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <>
      <Modal
        title='Welcome back'
        description='Login to your Account'
        isOpen={isOpen}
        onChange={onChange}
      >
        <Auth
          supabaseClient={supabaseClient}
          providers={['github']}
          magicLink={true}
          theme='dark'
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#404040',
                  brandAccent: '#22c55e',
                },
              },
            },
          }}
        />
      </Modal>
    </>
  );
};

export default AuthModal;
