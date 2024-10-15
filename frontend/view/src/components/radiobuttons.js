import * as React from 'react';
import Radio from '@mui/material/Radio';

const RadioBtn = ({value,onChange,checked}) =>{
    return(
        <div>
            <Radio 
            value={value}
            onChange={onChange}
            checked={checked}
            color='primary'
            />
            {value}
        </div>
    )
}
export default RadioBtn;