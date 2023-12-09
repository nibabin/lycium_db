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
    field_pop_id: '',
    greenhouse: '',
    voucher_specimen: '',
    collection_date: '',
    provenance: '',
    country: '',
    state_provenance: '',
    specific_locality: '',
    lat: '',
    long: '',
    notes: '',
    material: '',
    nanodrop_concentration: '',
    nanodrop_ratio: '',
    published: '',
    extraction_number: '',
    extraction_date: '',
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
          if (key == 'collection_date' || key == 'lat' || key == 'long' || key == 'nanodrop_concentration' || key == 'nanodrop_ratio' || key == 'published' || key == 'extraction_date'){
            formData[key] = undefined
          }
          if (key == 'published' && (value == 'true' || value == 'True')){
            formData['published'] = true
          }
          if (key == 'published' && (value == 'false' || value == 'False')){
            formData['published'] = false
          }
        }
      }
    }

    const response = await SpecimenAPI.createSpecimen(formData)
    if (response.success == true){
      handleClose()
      toast({
          title: 'Creation Successful', 
          description: 'Successfully created new specimen', 
          status: 'success',
          duration: 3000,
          isClosable: true,
      });
    }
    else{
      toast({
        title: 'Creation Failed', 
        description: 'Failed to create new specimen', 
        status: 'error',
        duration: 3000,
        isClosable: true,
    });
    }

  }

  return (
    <>
      <Button colorScheme='teal' onClick={handleOpen}>Add Specimen</Button>
      <AddEditModal isEditing={false} isOpen={isOpen} onClose={handleClose} onSubmit={handleFormSubmit} initialValues={formData} />
    </>
  );
}