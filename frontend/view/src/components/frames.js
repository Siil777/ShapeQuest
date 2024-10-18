import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function ShapeQuestFrame({ children }) {
  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', padding: '20px', boxShadow: 3 }}>
      <CardContent>
        <Typography style={{fontFamily:'Comic Sans MS, Comic Sans, cursive'}} variant="h5" component="div" gutterBottom>
          ShapeQuest questionnaire
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}

export default ShapeQuestFrame;
