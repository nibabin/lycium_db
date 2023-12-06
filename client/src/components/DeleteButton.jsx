import React, { useState } from 'react';
import {
  Button,
  useToast
} from '@chakra-ui/react';
import SpecimenAPI from '../../services/SpecimenAPI';

import { DeleteIcon } from '@chakra-ui/icons';


export default function DeleteButton({row}) {
  
  const toast = useToast()
  const handleDelete = async (row) =>{
      console.log(row.specimen_id)
      await SpecimenAPI.deleteSpecimen(row.specimen_id)
      toast({
          title: 'Delete Successful', 
          description: 'Successfully deleted specimen', 
          status: 'success',
          duration: 3000,
          isClosable: true,
    });

  }

  return (
    <div className='delete-button'>
      <Button onClick={() => handleDelete(row)}><DeleteIcon/></Button>
    </div>
  );
}