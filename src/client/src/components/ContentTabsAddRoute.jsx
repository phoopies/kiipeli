import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';

function ContentTabsAddRoute({ index, handleChange }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        bgcolor: 'primary.main',
      }}
    >
      <Tabs
        value={index}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab sx={{ color: 'secondary.dark' }} label="Reitti" />
        <Tab sx={{ color: 'secondary.dark' }} label="Tiedot" />
      </Tabs>
    </Box>
  );
}

export default ContentTabsAddRoute;
