import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CircularProgress, Fab, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ChartDialog from './Charts/ChartDialog.component';
import { getAllCharts } from '../services/Chart.service';
import { ChartDetails } from '../services/types/Chart';
import ChartList from './Charts/ChartList.component';
import { useSnackbar } from 'notistack';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchAllCharts()
  }, []);

  const fetchAllCharts = () => {
    setIsLoading(true);
    getAllCharts()
    .then((charts: ChartDetails[]) => {
      const sortedCharts: ChartDetails[] = charts.sort((a:ChartDetails, b: ChartDetails) => a.chart.order - b.chart.order);
      setCharts(sortedCharts);
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
      enqueueSnackbar('Error Fetching all charts',{variant : 'error'});
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
      {isLoading ? <CircularProgress color="secondary" /> : <ChartList charts={charts} setCharts={setCharts}/>} 
        
    </div>  
  );
};

export default DashboardPage;
