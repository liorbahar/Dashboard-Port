import { Typography } from "@material-ui/core";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { getChartFactory } from "./ChartFactory.component";
import { ChartDetails } from "../../services/types/Chart";


export type ChartProps = {
  index: number,
  chart: ChartDetails
}


const Chart: React.FC<ChartProps> = ({ index, chart}) => {

  const indexUinq = `${chart.chart.id}${index}`

  return (
      <Draggable draggableId={indexUinq} key={indexUinq} index={index}>
      {(provided, snapshot) => (
        <div  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
           <Typography align="center">{chart.chart.name}</Typography>
            {getChartFactory(chart.chart.chartKind.type, chart.data)}
    </div>
        
      )}
    </Draggable>
  );
}

export default Chart;

