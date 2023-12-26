import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { getAllChartsKinds } from '../../services/Chart.service';
import { ChartKind } from '../../services/types/Chart';
import CostumeSelect, { SelectData } from '../Common/CustomeSelect.component';

export type EventSchemaSelectProps = {
  onChange: (value: any) => void
}

const ChartSelect: React.FC<EventSchemaSelectProps> = ({ onChange }) => {
  const [chartsKinds, setChartKinds] = useState<ChartKind[]>([]);
  const [data, setData] = useState<SelectData[]>([]);

  useEffect(() => {
    fetchallChartKinds();
  }, [])

  const fetchallChartKinds = () => {
    getAllChartsKinds().then((chartKind: ChartKind[]) => {
      setChartKinds(chartKind);
      const selectOptions: SelectData[] = chartKind.map((chartKind: ChartKind) => { 
        return { name: chartKind.type, value: chartKind }
      });
      setData(selectOptions);
    });
  }
  

  return (
    <div>
     <CostumeSelect onChange={onChange} data={data}/>
    </div>
  );
}

export default ChartSelect;

