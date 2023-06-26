'use client';
import UploadModal from '@/components/Modal/UploadModal';
import React, { useState, useEffect } from 'react';
import AuthModal from '../../components/Modal/AuthModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
