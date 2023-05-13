import { Box, Button, Grow } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function WallFooterAddRoute({ index, handleClick }) {
  return (
    <Box
      elevation={1}
      sx={{
        display: 'flex',
        width: '100%',
        backgroundColor: 'primary.main',
        color: 'secondary.main',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 'auto',
      }}
    >
      <List
        dense
        sx={{
          paddingLeft: '8px',
          paddingRight: '8px',
          height: '60px',
        }}
      >
        <ListItem>
          <Grow in={index === 0} timeout={500}>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<ArrowForwardIcon />}
              onClick={handleClick}
            >
              Tiedot
            </Button>
          </Grow>
        </ListItem>
      </List>
    </Box>
  );
}

export default WallFooterAddRoute;
