import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import EventSchemaCreationDialog from './EventSchema/EventSchemaCreationDialog.component';
import { Paper, Typography } from '@material-ui/core';
import EventDialog from './Event/EventDialog.component';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '3%',
    },
    paperButton: {
      width: 300,
      height: 300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      color: theme.palette.primary.dark,
      transition: 'background-color 0.3s ease',
      margin: theme.spacing(2),
      border: `2px solid ${theme.palette.primary.main}`
  }
  }),
);


const AdminPage = ({  }) => {
  const classes = useStyles();
  const [openEventSchema, setOpenEventSchema] = useState<boolean>(false);
  const [openEventDialog, setOpenEventDialog] = useState<boolean>(false);

  const onCreateEventSchemaClick = () => setOpenEventSchema(true);
  const onCreateEventClick = () => setOpenEventDialog(true);

  const onCloseEventSchemaClick = () => setOpenEventSchema(false);
  const onCloseEventClick = () => setOpenEventDialog(false);
  
  return (
    <div className={classes.root}>
      <Paper onClick={onCreateEventSchemaClick} className={classes.paperButton} elevation={3}>
        <Typography>Create Event Schema</Typography>
      </Paper>

      <Paper onClick={onCreateEventClick} className={classes.paperButton} elevation={3}>
        <Typography>Add Event</Typography>
      </Paper>
      <EventSchemaCreationDialog open={openEventSchema} handleClose={onCloseEventSchemaClick}/>
      <EventDialog open={openEventDialog} handleClose={onCloseEventClick}/>
    </div>  
  );
};

export default AdminPage;
