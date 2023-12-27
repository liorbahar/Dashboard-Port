import React from 'react';
import { MenuItem, OutlinedInput, Select, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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
    },
    title: {
      marginTop: '2%'
    }
  })
);

export type SelectData = {
  value: any;
  name: string
}
export type EventSchemaSelectProps = {
  onChange: (value: any) => void,
  data: SelectData[],
  title: string
}

const CostumeSelect: React.FC<EventSchemaSelectProps> = ({ onChange, data, title }) => {
  const classes = useStyles();
  
  return (
    <div>
      <Typography className={classes.title}>{title}</Typography>
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
     
    </div>
  );
}

export default CostumeSelect;

