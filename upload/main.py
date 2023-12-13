import psycopg2
import csv
import random
import string

length = 25

def get_random_string():
    random_string = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(length))
    return random_string


host = 'cosc-257-node09.cs.amherst.edu'  
port = '5432' 
dbname = 'postgres'
user = 'postgres'
password = 'millerlab'

conn = psycopg2.connect(
    dbname=dbname,
    user=user,
    password=password,
    host=host,
    port=port
)

cursor = conn.cursor()


csv_file = 'specimen.csv'

with open(csv_file, 'r') as file:
    csv_reader = csv.reader(file)
    next(csv_reader) 

    for row in csv_reader:
        try:
            genomic, genus, species, field_pop_id, greenhouse, voucher_specimen, \
            collection_date, provenance, country, state_provenance, specific_location, \
            latitude, longitude, notes, material, nanodrop_concentration, nanodrop_ratio, published    = row

            genomic = genomic.strip()
            genus = genus.strip()
            species = species.strip()
            field_pop_id = field_pop_id.strip()
            greenhouse = greenhouse.strip()
            voucher_specimen = voucher_specimen.strip()
            collection_date = collection_date.strip()
            provenance = provenance.strip()
            country = country.strip()
            state_provenance = state_provenance.strip()
            specific_location = specific_location.strip()
            latitude = latitude.strip()
            longitude = longitude.strip()
            notes = notes.strip()
            material = material.strip()
            nanodrop_concentration = nanodrop_concentration.strip()
            nanodrop_ratio = nanodrop_ratio.strip()
            published = published.strip()


            if latitude == "": latitude = None
            if longitude == "": longitude = None
            if nanodrop_concentration == "": nanodrop_concentration = None
            if nanodrop_ratio == "": nanodrop_ratio = None
            if published == "": published = None
            if collection_date == "": collection_date = None
            extraction_date = None
            
            check_genetics_query = """
            SELECT genetics_id FROM Genetics
            WHERE genus = %s AND species = %s;
            """

            cursor.execute(check_genetics_query, (genus, species))
            genetics_id = cursor.fetchone()

            if genetics_id:
                genetics_id = genetics_id[0]
            else:
                insert_genetics_query = """
                INSERT INTO Genetics (genus, species)
                VALUES (%s, %s)
                RETURNING genetics_id;
                """

                cursor.execute(insert_genetics_query, (genus, species))
                genetics_id = cursor.fetchone()[0] 


            insert_specimen_query = """
            INSERT INTO Specimen (genetics_id, material, notes, collection_date,
            voucher_specimen, greenhouse, field_pop_id, published, nanodrop_concentration, nanodrop_ratio)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING specimen_id;
            """
            
            specimen_data = (
                genetics_id,
                material,
                notes,
                collection_date,
                voucher_specimen,
                greenhouse,
                field_pop_id,
                published,
                nanodrop_concentration,
                nanodrop_ratio
            )

            cursor.execute(insert_specimen_query, specimen_data)
            specimen_id = cursor.fetchone()[0]

            insert_location_query = """
            INSERT INTO Location (specimen_id, provenance, country, state_provenance, specific_locality, lat, long)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING location_id;
            """

            location_data = (
                specimen_id,  
                provenance,  
                country,  
                state_provenance, 
                specific_location,  
                latitude,  
                longitude 
            )

            cursor.execute(insert_location_query, location_data)

            insert_genomics_query = """
            INSERT INTO Genomics (extraction_number, extraction_date, specimen_id)
            VALUES (%s, %s, %s);
            """

            genomics_data = (
                genomic, 
                None,
                specimen_id
            )

            cursor.execute(insert_genomics_query, genomics_data)

            
            conn.commit()

        except Exception as e:
            print(e)
            print(row)
            conn.rollback()
            break



cursor.close()
conn.close()