import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TextareaAutosize } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textArea: {
        width: '100%',
        minHeight:'13%',
        display: 'flex',
        justifyContent: 'center',
        marginTop:'0.5%'
    }
  }),
);

export type InputJsonViewerProps = {
  onChange: (value: any) => void,
  isValid: boolean
}

const InputJsonViewer = ({ onChange, isValid }) => {
  const classes = useStyles();

  return (
    <div>
        <TextareaAutosize
            onChange={(event) => { onChange(event.target.value) }}
            className={classes.textArea}
            minRows={6}
            style={{
              borderColor: isValid ? 'black' : 'red',
              outlineColor: isValid ? 'black' : 'red'
            }}
        />
         
    </div>  
  );
};

export default InputJsonViewer;
