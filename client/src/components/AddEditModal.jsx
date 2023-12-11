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
    if (isEditing) {
      const keys = Object.keys(initialValues);
      for (const key of keys) {
        if (initialValues[key] === null || initialValues[key] === undefined) {
          initialValues[key] = '';
        }
      }
      setFormData(initialValues);
    }
  }, [isEditing, initialValues, isOpen]);

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
      <ModalContent minW="50vw" maxW="fit-content">
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
                marginBottom={4}
              />
              <FormLabel>Species</FormLabel>
              <Input
                type="text"
                name="species"
                value={formData.species}
                onChange={handleChange}
                marginBottom={4}
              />
              <FormLabel>Field ID</FormLabel>
              <Input
                type="text"
                name="field_pop_id"
                value={formData.field_pop_id}
                onChange={handleChange}
                marginBottom={4}
              />
              <FormLabel>Greenhouse</FormLabel>
              <Input
                type="text"
                name="greenhouse"
                value={formData.greenhouse}
                onChange={handleChange}
                marginBottom={4}
              />
              <FormLabel>Voucher</FormLabel>
              <Input
                type="text"
                name="voucher_specimen"
                value={formData.voucher_specimen}
                onChange={handleChange}
                marginBottom={4}
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
                  marginBottom={4}
                />
                </div>
              <FormLabel>Provenance</FormLabel>

              <Input
                type="text"
                name="provenance"
                value={formData.provenance}
                onChange={handleChange}
                marginBottom={4}
              />
              <FormLabel>Country</FormLabel>
              <Input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                marginBottom={4}
              />
              <FormLabel>State</FormLabel>
              <Input
                type="text"
                name="state_provenance"
                value={formData.state_provenance}
                onChange={handleChange}
                marginBottom={4}
              />
              <FormLabel>Specific Local</FormLabel>
              <Input
                type="text"
                name="specific_locality"
                value={formData.specific_locality}
                onChange={handleChange}
                marginBottom={4}
              />
              <FormLabel>Latitude</FormLabel>
              <Input
                type="number"
                name="lat"
                value={formData.lat}
                onChange={handleChange}
                marginBottom={4}
              />
              <FormLabel>Longitude</FormLabel>
              <Input
                type="number"
                name="long"
                value={formData.long}
                onChange={handleChange}
                marginBottom={4}
              />
              <FormLabel>Notes</FormLabel>
              <Textarea
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                marginBottom={4}
              />
              <FormLabel>Material</FormLabel>
              <Input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                marginBottom={4}
              />
              <FormLabel>Nanodrop Concentration</FormLabel>
              <Input
                type="number"
                name="nanodrop_concentration"
                value={formData.nanodrop_concentration}
                onChange={handleChange}
                marginBottom={4}
              />
              <FormLabel>Nanodrop Ratio</FormLabel>
              <Input
                type="number"
                name="nanodrop_ratio"
                value={formData.nanodrop_ratio}
                onChange={handleChange}
                marginBottom={4}
              />
              <FormLabel>Extraction Number</FormLabel>
              <Input
                type="text"
                name="extraction_number"
                value={formData.extraction_number}
                onChange={handleChange}
                marginBottom={4}
              />
              <FormLabel>Extraction Date</FormLabel>
              <div className="datepicker-div">
              <DatePicker
                className="date-picker"
                  selected={
                    formData.extraction_date ? new Date(formData.extraction_date) : null
                  }
                  onChange={(date) =>
                    setFormData({
                      ...formData,
                      extraction_date: date.toISOString(),
                    })
                  }
                  dateFormat="yyyy-MM-dd"
                />
                </div>
              <div>
                <FormLabel marginTop={4}>Published</FormLabel>
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
