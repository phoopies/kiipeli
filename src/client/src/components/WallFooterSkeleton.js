import { Box, Skeleton, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';


function WallFooterSkeleton() {
  return (
    <Box
      elevation={1}
      sx={{
        width: '100%',
        backgroundColor: 'primary.main',
        color: 'secondary.main',
        alignSelf: 'flex-end',
        marginTop: 'auto',
      }}
    >
      <List sx={{ paddingLeft: '8px', paddingRight: '8px' }}>
        <ListItem>
          <ListItemAvatar sx={{ paddingRight: '16px' }}>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ bgcolor: 'grey.900' }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="body1">
                <Skeleton sx={{ bgcolor: 'grey.900' }} />
              </Typography>
            }
            secondary={
              <Typography variant="body2">
                <Skeleton sx={{ bgcolor: 'grey.900' }} />
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  );
}

export default WallFooterSkeleton;
