import React, { useEffect, useState } from 'react';
import { MenuItem, OutlinedInput, Select } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { getAllChartsKinds } from '../../services/Chart.service';
import { ChartKind } from '../../services/types/Chart';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop:'3%'
    },
    option: {
        height: '10%',
    },
    input: {
        height: '10%'
    },
    select: {
        borderRadius: '6px',
        width: '100%'
    }
  })
);

export type SelectData = {
  value: any;
  name: string
}
export type EventSchemaSelectProps = {
  onChange: (value: any) => void,
  data: SelectData[]
}



const CostumeSelect: React.FC<EventSchemaSelectProps> = ({ onChange, data }) => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
     <Select
        className={classes.select}
        onChange={(event) => { onChange(event.target.value)}}
        input={<OutlinedInput margin='dense' classes={{ input: classes.input }} />}
        >
            {data.map((option: SelectData, index: number) => {
                return (
                    <MenuItem key={index} value={option.value} className={classes.option}>
                        {option.name}
                    </MenuItem>
                )
            })}
    </Select>
    </div>
  );
}

export default CostumeSelect;

