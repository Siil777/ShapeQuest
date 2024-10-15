import * as React from 'react';
import  {ButtonGroup, Button}  from '@mui/material';

const Buttons = ({onNext,onPrevious,disableNext,disablePrevious})=>{
    return(
     <ButtonGroup variant='outlined' aria-label='Basic button group'>
        <Button onClick={onPrevious} disabled={disablePrevious}>
            Previous
        </Button>
        <Button onClick={onNext} disabled={disableNext}>
            Next
        </Button>

     </ButtonGroup>
    )
}
export default Buttons;