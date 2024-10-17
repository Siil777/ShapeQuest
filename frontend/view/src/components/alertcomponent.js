import React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/material/Typography';

const AlertComponent = ({ alert, onClose }) => {
    return (
        <div>
            <Modal open={alert.visible} onClose={onClose}>
                <ModalDialog>
                <Typography 
                        dangerouslySetInnerHTML={{ 
                            __html: `<div>your motivation: ${alert.score}</div><div>Feedback: ${alert.feedback}</div>` 
                        }} 
                    />
                </ModalDialog>
            </Modal>
            {alert.visible && (
                <Box sx={{ width: '100%' }}>
                    <Alert>{`<div>Motivation:</div>${alert.score}<div>feedback:</div> ${alert.feedback}`}</Alert>
                </Box>
            )}
        </div>
    );
};
export default AlertComponent;
