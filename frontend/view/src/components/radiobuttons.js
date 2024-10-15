import * as React from 'react';
import Radio from '@mui/material/Radio';

const RadioBtn = ({value,onChange,checked,name}) =>{
    return(
        <div>
            <Radio 
            value={value}
            onChange={onChange}
            checked={checked}
            name={name}
            color='primary'
            />
            {value}
        </div>
    )
}
export default RadioBtn;