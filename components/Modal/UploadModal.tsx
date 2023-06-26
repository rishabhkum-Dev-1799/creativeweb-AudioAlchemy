import useUploadModal from '@/hooks/useUploadModal';
import React from 'react';
import Modal from './Modal';

const UploadModal = () => {
  const uploadModalState = useUploadModal();
  // function handlers
  const closeModalHandler = (open: boolean) => {
    if (!open) {
      uploadModalState.onClose();
    }
  };
  const submitModalHandler = () => {};
  return (
    <Modal
      title='Add a Song'
      description='Upload .mp3 file of your Song'
      isOpen={uploadModalState.isOpen}
      onChange={closeModalHandler}
    >
      Upload Modal
    </Modal>
  );
};

export default UploadModal;

/**
 * Things to do for creating the upload Modal functionality
 * 1) To create the ui structure of the modal
 * 2) to handle the states of the modal
 * 3) to create the submit functionality of the modal while uploading the data to the supabase
 */
