import React, { useState } from 'react';
import {
  Button,
  useToast
} from '@chakra-ui/react';

import { DeleteIcon } from '@chakra-ui/icons';


export default function DeleteButton({row}) {
    const toast = useToast()
    const handleDelete = (row) =>{
        console.log(row.specimen_id)
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