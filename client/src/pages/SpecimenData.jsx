import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpecimenAPI from '../../services/SpecimenAPI';
import { VStack, Text } from '@chakra-ui/react';
import '../css/SpecimenData.css'
import EditButton from '../components/EditButton';
import DeleteButton
 from '../components/DeleteButton';
export default function SpecimenData() {
  const { id } = useParams();
  const [specimen, setSpecimen] = useState(null);

  useEffect(() => {
    const fetchSpecimen = async () => {
      try {
        const data = await SpecimenAPI.getSpecimenById(id);
        setSpecimen(data);
      } catch (error) {
        console.error('Error catching species:', error);
      }
    };

    fetchSpecimen();
  }, [id]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (!specimen) {
    return <p>Loading...</p>;
  }

  return (
    <VStack className="specimen-cont" spacing={2} align='stretch'>
      <Text><strong>Genus</strong>: {specimen.genus}</Text>
      <Text><strong>Species</strong>: {specimen.species}</Text>
      <Text><strong>Extraction Number</strong>: {specimen.extraction_number}</Text>
      <Text><strong>Extraction Date</strong>: {specimen.extraction_date}</Text>
      <Text><strong>Field ID</strong>: {specimen.field_pop_id}</Text>
      <Text><strong>Greenhouse</strong>: {specimen.greenhouse}</Text>
      <Text><strong>Voucher</strong>: {specimen.voucher_specimen}</Text>
      <Text><strong>Collection Date:</strong> {new Date(specimen.collection_date).getDate()} {monthNames[new Date(specimen.collection_date).getMonth()]} {new Date(specimen.collection_date).getFullYear()}</Text>
      <Text><strong>Provenance</strong>: {specimen.provenance}</Text>
      <Text><strong>Country</strong>: {specimen.country}</Text>
      <Text><strong>State Provenance</strong>: {specimen.state_provenance}</Text>
      <Text><strong>Specific Local</strong>: {specimen.specific_locality}</Text>
      <Text><strong>Latitude</strong>: {specimen.lat}</Text>
      <Text><strong>Longitude</strong>: {specimen.long}</Text>
      <Text><strong>Notes</strong>: {specimen.notes}</Text>
      <Text><strong>Material</strong>: {specimen.material}</Text>
      <Text><strong>Nanodrop Concentration</strong>: {specimen.nanodrop_concentration}</Text>
      <Text><strong>Nanodrop Ratio</strong>: {specimen.nanodrop_ratio}</Text>
      <Text><strong>Published</strong>: {specimen.published ? "True" : "False"}</Text>
      <div className="edit-div">
        <EditButton row={specimen} />
        <DeleteButton row={specimen} />
      </div>
    </VStack>
  );
}
