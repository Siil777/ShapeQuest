import * as React from 'react';
import propTypes from 'prop-types';
import  CircularProgress  from '@mui/material/CircularProgress';
import  Typography  from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressIcon(props){
    return(
        <Box sx={{position: 'relative', display: 'flex', justifyContent:'center', paddingTop: '50px'}}>
            <CircularProgress variant="determinate" {...props} />
            <Box
            sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
                <Typography
                variant='caption'
                component='div'
                sx={{color: 'text.secondary'}}
                >
                {`${Math.round(props.value)}%`}
                </Typography>

            </Box>
        </Box>
    )
}
CircularProgressIcon.propTypes={
    value: propTypes.number.isRequired,
}
export default function CircularProgressIconValue(){
    const [progress,setProgress] =React.useState(10);

    React.useEffect(()=>{
        const timer = setInterval(()=>{
            setProgress((prevProgress)=>(prevProgress>=100 ? 0 : prevProgress + 10));
        }, 800);
        return ()=>{
            clearInterval(timer);
        };
    }, []);

    return <CircularProgressIcon value={progress} />
}