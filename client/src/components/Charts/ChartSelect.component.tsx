import React, { useEffect, useState } from 'react';
import { getAllChartsKinds } from '../../services/Chart.service';
import { ChartKind } from '../../services/types/Chart';
import CostumeSelect, { SelectData } from '../Common/CustomeSelect.component';
import { useSnackbar } from 'notistack';

export type EventSchemaSelectProps = {
  onChange: (value: any) => void
}

const ChartSelect: React.FC<EventSchemaSelectProps> = ({ onChange }) => {
  const [chartsKinds, setChartKinds] = useState<ChartKind[]>([]);
  const [data, setData] = useState<SelectData[]>([]);
  const { enqueueSnackbar } = useSnackbar();

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
    }).catch(err => {
      enqueueSnackbar('Error Fetching charts',{variant : 'error'});
    });
  }
  

  return (
    <div>
      <CostumeSelect onChange={onChange} data={data} title='Chart'/>
    </div>
  );
}

export default ChartSelect;

