import React, { useEffect, useState } from 'react';
import { getAllEventSchemas } from '../../services/EventSchema.service';
import { EventSchema } from '../../services/types/EventSchema';
import CostumeSelect, { SelectData } from '../Common/CustomeSelect.component';
import { useSnackbar } from 'notistack';

export type EventSchemaSelectProps = {
  onChange: (value: any) => void
}

const EventSchemaSelect: React.FC<EventSchemaSelectProps> = ({ onChange }) => {
  const [eventSchemas, setEventSchemas] = useState<EventSchema[]>([]);
  const [data, setData] = useState<SelectData[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchEventSchemas();
  }, [])

  const fetchEventSchemas = () => {
    getAllEventSchemas().then((eventSchemas: EventSchema[]) => {
        setEventSchemas(eventSchemas);
        const selectOptions: SelectData[] = eventSchemas.map((evenetSchema: EventSchema) => { 
          return { name: evenetSchema.jsonschema.title, value: evenetSchema }
        });
        setData(selectOptions);
    }).catch(err => {
      enqueueSnackbar('Error Fetching event schemas',{variant : 'error'});
    });
  }
  

  return (
    <div>
       <CostumeSelect onChange={onChange} data={data} title='Event Schema'/>
    </div>
  );
}

export default EventSchemaSelect;

