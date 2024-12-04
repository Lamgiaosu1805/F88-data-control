import { Badge, Popover, Typography } from "@mui/material";
import { useState } from "react";
import NotiIcon from "../assets/svg/notification.svg";
const NotificationHeader = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div>
      <div
        aria-describedby={"button-id"}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Badge badgeContent={4} color="error">
          <img width={32} height={32} src={NotiIcon} />
        </Badge>
      </div>
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: "none" }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        
      >
        <div style={{padding: 20, width:300}}>
        <Typography sx={{ p: 1 }}>Notification 1.</Typography>
        <Typography sx={{ p: 1 }}>Notification 2.</Typography>
        <Typography sx={{ p: 1 }}>Notification 3.</Typography>
        <Typography sx={{ p: 1 }}>Notification 4.</Typography>

        </div>
      </Popover>
    </div>
  );
};

export default NotificationHeader;
