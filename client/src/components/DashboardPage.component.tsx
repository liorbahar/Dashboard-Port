import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Container, Fab, List, Tooltip, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ChartDialog from './Charts/ChartDialog.component';
import { getAllCharts } from '../services/Chart.service';
import { ChartDetails } from '../services/types/Chart';
import { getChartFactory } from './Charts/ChartFactory.component';
import { Droppable,DragDropContext, DropResult,Draggable } from 'react-beautiful-dnd';
import Chart from './Charts/Chart.component';
import { Sector } from 'recharts';
import ChartList from './Charts/ChartList.component';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop:'3%'
    },
    addButton: {
      display:'flex',
      justifyContent:'flex-end',
      flexDirection:'row',
      alignItems:'flex-end',
      width:'100%',
      marginRight:'1%'
    },
    charts: {
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap'
    },
    rowContainer: {
      display:'flex',
      flexDirection:'column',
      marginTop:'1%'
  }
  }),
);


const DashboardPage = ({  }) => {
  const classes = useStyles();
  const [openChartDialog, setOpenChartDialog] = useState(null);
  const [charts, setCharts] = useState<ChartDetails[]>([]);


  useEffect(() => {
    fetchAllCharts()
  }, []);

  const fetchAllCharts = () => {
    getAllCharts().then((charts: ChartDetails[]) => {
      const sortedCharts: ChartDetails[] = charts.sort((a:ChartDetails, b: ChartDetails) => a.chart.order - b.chart.order);
      setCharts(sortedCharts)
    })
  }

  const onOpenChartClient = () => {
    setOpenChartDialog(true);
  }

  const onCloseChartClient = () => {
    setOpenChartDialog(false);
  }

  return (
    <div className={classes.root}>
      <div className={classes.addButton}>
        <Tooltip onClick={onOpenChartClient} title="Add" aria-label="add">
          <Fab color="secondary">
            <AddIcon />
            </Fab>
        </Tooltip>
      </div>
      <ChartDialog open={openChartDialog} handleClose={onCloseChartClient} onSuccess={fetchAllCharts}/> 
      <ChartList charts={charts} setCharts={setCharts}/>
              
    </div>  
  );
};

export default DashboardPage;
