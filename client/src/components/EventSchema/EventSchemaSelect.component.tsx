import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { getAllEventSchemas } from '../../services/EventSchema.service';
import { EventSchema } from '../../services/types/EventSchema';
import CostumeSelect, { SelectData } from '../Common/CustomeSelect.component';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
    option: {
        height: '10%',
    },
    input: {
        height: '10%'
    },
    select: {
        borderRadius: '6px',
        width: '100%'
    }
  })
);

export type EventSchemaSelectProps = {
  onChange: (value: any) => void
}

const EventSchemaSelect: React.FC<EventSchemaSelectProps> = ({ onChange }) => {
  const classes = useStyles();
  const [eventSchemas, setEventSchemas] = useState<EventSchema[]>([]);
  const [data, setData] = useState<SelectData[]>([]);


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
    });
  }
  

  return (
    <div>
       <CostumeSelect onChange={onChange} data={data} title='Event Schema'/>
    </div>
  );
}

export default EventSchemaSelect;

