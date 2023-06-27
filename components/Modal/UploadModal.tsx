'use client';

import React, { useState } from 'react';
import useUploadModal from '@/hooks/useUploadModal';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import uniqid from 'uniqid';
import { useRouter } from 'next/navigation';

import Modal from './Modal';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { useUserState } from '@/hooks/useUser';

const UploadModal = () => {
  //common imports and states for the component.
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const uploadModalState = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUserState();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      author: '',
      song: null,
      image: null,
    },
  });

  // function handlers
  const closeModalHandler = (open: boolean) => {
    if (!open) {
      uploadModalState.onClose();
    }
  };

  const submitModalHandler: SubmitHandler<FieldValues> = async (values) => {
    // in this function we would be writing the core functionality of the upload song to the blob and supabase database -->
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!user && !imageFile && !songFile) {
        toast.error('Fill all Fields');
        return;
      }
      const uniqueId = uniqid();
      // upload the song and image to the blob or bucket of the supabase
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values.name}-${uniqueId}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        toast.error('Song Upload Failed');
        return;
      }
      // image Upload to storage==>
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${values.name}-${uniqueId}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        toast.error('Image upload failed');
        return;
      }
      // uploading the songs entry to the tables also ;
      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user?.id,
          title: values?.name,
          author: values.author,
          song_path: songData.path,
          image_path: imageData.path,
        });
      if (supabaseError) {
        setIsLoading(false);
        toast.error(supabaseError.message);
        return;
      }
      router.refresh();
      toast.success('Song Uploaded');
      setIsLoading(false);
      reset();
      uploadModalState.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title='Add a Song'
      description='Upload .mp3 file of your Song'
      isOpen={uploadModalState.isOpen}
      onChange={closeModalHandler}
    >
      <form
        className='flex flex-col gap-y-4'
        onSubmit={handleSubmit(submitModalHandler)}
      >
        <Input
          id='Song_Name'
          placeholder='Song Name'
          {...register('name', { required: true })}
          disabled={isLoading}
        />
        <Input
          id='Author'
          placeholder='Author'
          {...register('author', { required: true })}
          disabled={isLoading}
        />
        <div>
          <div className='pb-1'>Select a Song File</div>
          <Input
            id='Song'
            placeholder='Author'
            {...register('song', { required: true })}
            disabled={isLoading}
            type='file'
            accept='.mp3'
          />
        </div>
        <div>
          <div className='pb-1'>Select a Image</div>
          <Input
            id='Image'
            placeholder='Add Image'
            {...register('image', { required: true })}
            disabled={isLoading}
            type='file'
            accept='image/*'
          />
        </div>
        <Button className='text-white' type='submit' disabled={isLoading}>
          Add
        </Button>
      </form>
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
