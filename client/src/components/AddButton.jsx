import React, { useState } from 'react';
import {
  Button,
} from '@chakra-ui/react';
import AddEditModal from './AddEditModal';
import { useToast } from '@chakra-ui/react'
import SpecimenAPI from '../../services/SpecimenAPI';

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
    extraction_data: '',
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = async (formData) =>{
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) { 
        const value = formData[key];
        if (value == ''){
          if (key == 'collection_date' || key == 'latitude' || key == 'longitude' || key == 'nanodrop_concentration' || key == 'nanodrop_ratio' || key == 'published'){
            formData[key] = undefined
          }
        }
      }
    }

    console.log(formData)
    const x = await SpecimenAPI.createSpecimen(formData)
    console.log(x)
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
    <>
      <Button colorScheme='teal' onClick={handleOpen}>Add Specimen</Button>
      <AddEditModal isEditing={false} isOpen={isOpen} onClose={handleClose} onSubmit={handleFormSubmit} initialValues={formData} />
    </>
  );
}