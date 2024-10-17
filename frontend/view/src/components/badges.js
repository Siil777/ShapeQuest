import { Badge, Typography } from "@mui/material";

const Badges = ({ children }) => {
    return (
        <div className="d-flex justify-content-center">
            <Badge badgeContent={1} variant="solid">
                <Typography sx={{ fontSize: 'xl' }}>💌</Typography>
            </Badge>
            <Typography variant="body1" sx={{ marginLeft: '10px' }}>
                {children}
            </Typography>
        </div>
    )
}
export default Badges;