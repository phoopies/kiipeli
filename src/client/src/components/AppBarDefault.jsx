import { Box, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';

function AppBarDefault({
  header,
  icon,
  startClickHandler,
  clickable,
  endIcon,
  endClickHandler,
}) {
  return (
    <Box>
      <AppBar color="primary" position="static">
        <Slide
          direction="right"
          in
          timeout={{ enter: 400 }}
          mountOnEnter
          unmountOnExit
        >
          <Toolbar>
            {icon && (
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="icon"
                sx={{ mr: 2 }}
                onClick={clickable ? startClickHandler : null}
              >
                {icon}
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {header}
            </Typography>
            {endIcon && (
              <IconButton
                size="small"
                edge="end"
                color="inherit"
                aria-label="icon"
                sx={{ mr: 2 }}
                onClick={clickable ? endClickHandler : null}
              >
                {endIcon}
              </IconButton>
            )}
          </Toolbar>
        </Slide>
      </AppBar>
    </Box>
  );
}

export default AppBarDefault;
