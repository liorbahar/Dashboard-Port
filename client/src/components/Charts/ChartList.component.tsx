import { Theme, createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { ChartDetails, ChartReplacmentParams } from "../../services/types/Chart";
import { Droppable,DragDropContext, DropResult } from 'react-beautiful-dnd';
import Chart from "./Chart.component";
import { replaceChartLocations } from "../../services/Chart.service";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

export type ChartListProps = {
  charts: ChartDetails[],
  setCharts: (charts: ChartDetails[]) => void
}

const ChartList: React.FC<ChartListProps> = ({ charts, setCharts }) => {
    const classes = useStyles();

    const replaceCharts = async (sourceChartId: string, destinationChartId: string) => {
        const body: ChartReplacmentParams = {
            sourceChartId: sourceChartId,
            destinationChartId: destinationChartId
        } 
        await replaceChartLocations(body)
    }

    const onDragEnd = async (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
          return;
        }
    
        let active = charts;
        const sourceElement = active[source.index];
        const destinationElement  = active[destination.index];

        active[destination.index] = sourceElement;
        active[source.index] = destinationElement;
        setCharts(active);
        await replaceCharts(sourceElement.chart.id, destinationElement.chart.id);
    };

  return (
     <div>
         <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="ChartList">
                {(provided, snapshot) => (
                    <div className={classes.charts} ref={provided.innerRef} {...provided.droppableProps}>
                        {charts.map((chart: ChartDetails, index: number) => (
                            <div key={index} className={classes.rowContainer}>
                                <Chart key={index} index={index} chart={chart}/>
                            </div>
                        ))
                        }
                        {provided.placeholder}
                    </div>    
                )}
            </Droppable>
        </DragDropContext>
     </div>
  );
}

export default ChartList;