import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import EventSchemaSelect from '../EventSchema/EventSchemaSelect.component';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import { EventSchema } from '../../services/types/EventSchema';
import { addEvent } from '../../services/Event.service';
import { EventCreationProps } from '../../services/types/Event';
import { useSnackbar } from 'notistack';


const Form = withTheme(MuiTheme);

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

const EventDialog: React.FC<EventSchemaCreationDialogProps> = ({ open, handleClose }) => {
  const classes = useStyles();
  const [event, setEvent] = useState<{ data: { [key: string]: object }}>({ data: {}});
  const [eventSchema, setEventSchema] = useState<EventSchema>();
  const [jsonSchema, setJsonSchema] = useState<Object>();
  const { enqueueSnackbar } = useSnackbar();

  const onChange = (eventForm: {formData: Object}) => {
    // do this logic instead of set to useState because of bug in the lib
    const properties = eventForm.formData; 
    const data = {}
    Object.keys(properties).forEach((key) => {
      const value: any = properties[key];
      data[key] = value;
    })

    event.data = data
  }

  const onChangeEventSchema = (eventSchema: EventSchema) => {
    const tempJsonSchema = Object.assign({}, eventSchema.jsonschema)
    delete tempJsonSchema.title
    delete tempJsonSchema.description

    setEventSchema(eventSchema);
    setJsonSchema(tempJsonSchema);
    setEvent({ data: {}});
  }

  const onCreateEvent = () => {
    const body: EventCreationProps = {
      eventSchemaId: eventSchema.id,
      properties: event.data
    }

    addEvent(body)
    .then(res => {
      handleClose();
      enqueueSnackbar('Event created successfully',{variant : 'success'});
    })
    .catch(err => {
      enqueueSnackbar('Error while create event',{variant : 'error'});
    });
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
          <Typography align='center' variant="h5">Add Event</Typography>
          <DialogContent>
            <EventSchemaSelect onChange={onChangeEventSchema}/>
            {eventSchema && <Form schema={jsonSchema} onChange={onChange}>{' '}</Form>}
          </DialogContent>
          <DialogActions>
            <Button className={classes.saveButton} onClick={onCreateEvent} fullWidth variant='contained' color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      
    </div>
  );
}

export default EventDialog;

