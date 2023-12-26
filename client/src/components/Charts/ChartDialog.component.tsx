import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Fab, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ChartSelect from './ChartSelect.component';
import { ChartKind } from '../../services/types/Chart';
import EventSchemaSelect from '../EventSchema/EventSchemaSelect.component';
import { EventSchema } from '../../services/types/EventSchema';
import CostumeSelect, { SelectData } from '../Common/CustomeSelect.component';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customDialog: {
      minHeight: '30%',
    },
    saveButton: {
      textTransform: 'none',
      width:'100%'
    }
  }),
);


export type EventSchemaCreationDialogProps = {
    open: boolean,
    handleClose: () => void
}

const ChartDialog: React.FC<EventSchemaCreationDialogProps> = ({ open, handleClose }) => {
  const classes = useStyles();
  const [selectedChartKind, setSelectedChartKind] = useState<ChartKind>();
  const [selectedEventSchema, setSelectedEventSchema] = useState<EventSchema>();
  const [selectedEventSchemaProperty, setSelectedEventSchemaProperty] = useState<string>();
  const [eventSchemaProperties, setEventSchemaProperties] = useState<SelectData[]>([]);

  const onChangeChartKind = (chartKind: ChartKind) => {
    setSelectedChartKind(chartKind);
  }

  const onChangeEventSchema = (eventSchema: EventSchema) => {
    setSelectedEventSchema(eventSchema);
    const eventSchemaPropertiesOptions: SelectData[] = Object.keys(eventSchema.jsonschema.properties).map((propertyKey: string) => {
      return { name: propertyKey,  value: propertyKey };
    });
    setEventSchemaProperties(eventSchemaPropertiesOptions);
  }

  const onChangEventSchemaProperty = (eventSchemaProperty: string) => {
    setSelectedEventSchemaProperty(eventSchemaProperty);
  }

  const onCreateChart =  () => {

  }


  return (
    <div>
      
      <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth 
          classes={{ paper: classes.customDialog }}
        >
          <Typography align='center' variant="h5">Create Chart</Typography>
          <DialogContent>
            <ChartSelect onChange={onChangeChartKind}/>
            <EventSchemaSelect onChange={onChangeEventSchema}/> 
            <CostumeSelect onChange={onChangEventSchemaProperty} data={eventSchemaProperties}/>
          </DialogContent>
          <DialogActions>
            <Button className={classes.saveButton} onClick={onCreateChart} fullWidth variant='contained' color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      
    </div>
  );
}

export default ChartDialog;

