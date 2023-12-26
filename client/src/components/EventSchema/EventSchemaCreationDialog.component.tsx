import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputJsonViewer from './InputJsonViewer.component';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { createEventSchema } from '../../services/EventSchema.service';

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

const EventSchemaCreationDialog: React.FC<EventSchemaCreationDialogProps> = ({ open, handleClose }) => {
  const classes = useStyles();
  const [jsonschema, setJsonschema] = useState(null);
  const [validJson, setIsValidJson] = useState<boolean>(true);


  const onCreateEventSchema = () => {
    createEventSchema(jsonschema)
    .then(res => {
      handleClose()
    });
  }

  const onChangeInputJson = (value: any) => {
    const isValidJson: boolean = validateJson(value);
    setIsValidJson(isValidJson)
    if (isValidJson && value !== '') {
      setJsonschema(JSON.parse(value));
    } 
  }

  const validateJson = (value: any) => {
    if (value === '') {
      return true;
    }
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
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
        <Typography align='center' variant="h5">Create Event Schema</Typography>
        <DialogContent>
          <InputJsonViewer onChange={onChangeInputJson} isValid={validJson}/>
        </DialogContent>
        <DialogActions>
          <Button disabled={!validJson} className={classes.saveButton} onClick={onCreateEventSchema} fullWidth variant='contained' color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventSchemaCreationDialog;
