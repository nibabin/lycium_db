import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';

import '../css/AddEditModal.css'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 

export default function AddEditModal({
  isOpen,
  onClose,
  onSubmit,
  isEditing,
  initialValues,
}) {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    if (!isEditing) {
      setFormData(initialValues);
    }
  }, [isEditing, initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditing ? 'Edit Specimen' : 'Add Specimen'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl className="datepicker-div">
              <FormLabel>Genus</FormLabel>
              <Input
                type="text"
                name="genus"
                value={formData.genus}
                onChange={handleChange}
              />
              <FormLabel>Species</FormLabel>
              <Input
                type="text"
                name="species"
                value={formData.species}
                onChange={handleChange}
              />
              <FormLabel>Field ID</FormLabel>
              <Input
                type="text"
                name="field_id"
                value={formData.field_id}
                onChange={handleChange}
              />
              <FormLabel>Greenhouse</FormLabel>
              <Input
                type="text"
                name="greemhouse"
                value={formData.greenhouse}
                onChange={handleChange}
              />
              <FormLabel>Voucher</FormLabel>
              <Input
                type="text"
                name="voucher"
                value={formData.voucher}
                onChange={handleChange}
              />
              <FormLabel>Collection Date</FormLabel>
              <div className="datepicker-div"> 
              <DatePicker
                className="date-picker"
                  selected={
                    formData.collection_date ? new Date(formData.collection_date) : null
                  }
                  onChange={(date) =>
                    setFormData({
                      ...formData,
                      collection_date: date.toISOString(),
                    })
                  }
                  dateFormat="yyyy-MM-dd"
                />
                </div>
              <FormLabel>Provenance</FormLabel>
              
              <Input
                type="text"
                name="provenance"
                value={formData.provenance}
                onChange={handleChange}
              />
              <FormLabel>Country</FormLabel>
              <Input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
              <FormLabel>State</FormLabel>
              <Input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              <FormLabel>Specific Local</FormLabel>
              <Input
                type="text"
                name="specific_local"
                value={formData.specific_local}
                onChange={handleChange}
              />
              <FormLabel>Latitude</FormLabel>
              <Input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
              />
              <FormLabel>Longitude</FormLabel>
              <Input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
              />
              <FormLabel>Notes</FormLabel>
              <Textarea
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
              <FormLabel>Material</FormLabel>
              <Input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
              />
              <FormLabel>Nanodrop Concentration</FormLabel>
              <Input
                type="number"
                name="nanodrop_concentration"
                value={formData.nanodrop_concentration}
                onChange={handleChange}
              />
              <FormLabel>Nanodrop Ratio</FormLabel>
              <Input
                type="number"
                name="material"
                value={formData.nanodrop_ratio}
                onChange={handleChange}
              />
              <div>
                <FormLabel>Published</FormLabel>
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      published: e.target.checked,
                    })
                  }
                />
              </div>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            onClick={handleSubmit}
          >
            {isEditing ? 'Save Changes' : 'Add'}
          </Button>
          <Button colorScheme="gray" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}