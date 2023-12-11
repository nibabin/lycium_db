import React, { useState } from 'react';
import {
  Button,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import SpecimenAPI from '../../services/SpecimenAPI';
import { DeleteIcon } from '@chakra-ui/icons';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Tooltip } from '@chakra-ui/react';

export default function DeleteButton({ row }) {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async (row) => {
    onOpen();
  };

  const confirmDelete = async () => {
    try {
      const response = await SpecimenAPI.deleteSpecimen(row.specimen_id);
      if (response.success === true){
        toast({
          title: 'Delete Successful',
          description: 'Successfully deleted specimen, please refresh the page to see the new table.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      else{
        toast({
          title: 'Delete Failed',
          description: 'Failed to delete specimen.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error deleting specimen:', error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="delete-button">
    <Tooltip hasArrow label="Delete Entry" fontSize="md" openDelay={800}>
      <Button colorScheme="teal" onClick={handleDelete}>
        <DeleteIcon />
      </Button>
    </Tooltip>


      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this specimen?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
