import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import BarChartEvent from './Charts/BarChartEvent.component';
import PieChartExample from './Charts/PieChartEvent.component';
import { Fab, Tooltip, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ChartDialog from './Charts/ChartDialog.component';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop:'3%'
    }
  }),
);


const DashboardPage = ({  }) => {
  const classes = useStyles();
  const [openChartDialog, setOpenChartDialog] = useState(null);


  useEffect(() => {
  
  }, []);

  const onOpenChartClient = () => {
    setOpenChartDialog(true);
  }

  const onCloseChartClient = () => {
    setOpenChartDialog(false);
  }


  return (
    <div className={classes.root}>

      <Tooltip onClick={onOpenChartClient} title="Add" aria-label="add">
            <Fab color="secondary">
            <AddIcon />
          </Fab>
      </Tooltip>
      <ChartDialog open={openChartDialog} handleClose={onCloseChartClient}/>
      {/* <BarChartEvent/>
      <PieChartExample/> */}
              
    </div>  
  );
};

export default DashboardPage;
