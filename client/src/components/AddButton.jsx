import React, { useState } from 'react';
import {
  Button,
} from '@chakra-ui/react';
import AddEditModal from './AddEditModal';
import { useToast } from '@chakra-ui/react'

export default function AddButton() {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast()

  const [formData, setFormData] = useState({
    genus: '',
    species: '',
    field_id: '',
    greenhouse: '',
    voucher: '',
    collection_date: '',
    provenance: '',
    country: '',
    state: '',
    specific_local: '',
    latitude: '',
    longitude: '',
    notes: '',
    material: '',
    nanodrop_concentration: '',
    nanodrop_ratio: '',
    published: '',
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = (formData) =>{
    console.log(formData)
    handleClose()
    toast({
        title: 'Crreation Successful', 
        description: 'Successfully created new specimen', 
        status: 'success',
        duration: 3000,
        isClosable: true,
    });
  }


  return (
    <div className='add-button'>
      <Button onClick={handleOpen}>Add Specimen</Button>
      <AddEditModal isEditing={false} isOpen={isOpen} onClose={handleClose} onSubmit={handleFormSubmit} initialValues={formData} />
    </div>
  );
}