import { Badge, Popover, Typography } from "@mui/material";
import { useState } from "react";
import Setting from "../assets/svg/setting.svg";
const SettingHeader = () => {
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
        <img width={32} height={32} src={Setting} />
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
        <div style={{ padding: 20, width: 200 }}>
          <Typography sx={{ p: 1 }}>Setting 1.</Typography>
          <Typography sx={{ p: 1 }}>Setting 2.</Typography>
          <Typography sx={{ p: 1 }}>Setting 3.</Typography>
          <Typography sx={{ p: 1 }}>Setting 4.</Typography>
        </div>
      </Popover>
    </div>
  );
};

export default SettingHeader;
