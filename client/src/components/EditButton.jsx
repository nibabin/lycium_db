import React, { useState } from 'react';
import {
  Button,
  useToast,
  Tooltip
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
    field_pop_id: row.field_pop_id,
    greenhouse: row.greenhouse,
    voucher_specimen: row.voucher_specimen,
    collection_date: row.collection_date,
    provenance: row.provenance,
    country: row.country,
    state_provenance: row.state_provenance,
    specific_locality: row.specific_locality,
    lat: row.lat,
    long: row.long,
    notes: row.notes,
    material: row.material,
    nanodrop_concentration: row.nanodrop_concentration,
    nanodrop_ratio: row.nanodrop_ratio,
    published: row.published,
    extraction_number: row.extraction_number,
    extraction_date: row.extraction_date,
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
    const response = await SpecimenAPI.updateSpecimen(row.specimen_id, formData)
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
      <Tooltip hasArrow label="Edit Entry" fontSize="md" openDelay={800}>
        <Button colorScheme='teal' onClick={handleOpen}><EditIcon/></Button>
      </Tooltip>
      <AddEditModal isEditing={true} isOpen={isOpen} onClose={handleClose} onSubmit={handleFormSubmit} initialValues={formData} />
    </div>
  );
}
