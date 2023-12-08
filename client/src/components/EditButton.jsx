import React, { useState } from 'react';
import {
  Button,
  useToast
} from '@chakra-ui/react';
import AddEditModal from './AddEditModal';
import { EditIcon } from '@chakra-ui/icons';
import SpecimenAPI from '../../services/SpecimenAPI';

export default function EditButton({row}) {

  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const [formData, setFormData] = useState({
    genus: row.genus,
    species: row.species,
    field_id: row.field_id,
    greenhouse: row.greenhouse,
    voucher: row.voucher,
    collection_date: row.collection_date,
    provenance: row.provenance,
    country: row.country,
    state: row.state,
    specific_local: row.specific_local,
    latitude: row.latitude,
    longitude: row.longitude,
    notes: row.notes,
    material: row.material,
    nanodrop_concentration: row.nanodrop_concentration,
    nanodrop_ratio: row.nanodrop_ratio,
    published: row.published,
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = async (formData) =>{
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) { // Ensure it's a direct property and not inherited
        const value = formData[key];
        if (value == ''){
          if (key == 'collection_date' || key == 'latitude' || key == 'longitude' || key == 'nanodrop_concentration' || key == 'nanodrop_ratio' || key == 'published'){
            formData[key] = undefined
          }
        }
      }
    }
    console.log("EDIT")
    console.log(formData)
    const response = await SpecimenAPI.createSpecimen(formData)
    console.log(response)
    if (response.success == true){
      handleClose()
      toast({
          title: 'Edit Successful', 
          description: 'Successfully edited specimen data', 
          status: 'success',
          duration: 3000,
          isClosable: true,
      });
    }
    else{
      toast({
          title: 'Edit Failed', 
          description: 'Failed to edit specimen data', 
          status: 'error',
          duration: 3000,
          isClosable: true,
      });
    }
  }


  return (
    <div className='edit-button'>
      <Button colorScheme='teal' onClick={handleOpen}><EditIcon/></Button>
      <AddEditModal isEditing={true} isOpen={isOpen} onClose={handleClose} onSubmit={handleFormSubmit} initialValues={formData} />
    </div>
  );
}