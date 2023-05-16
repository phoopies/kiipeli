import AddIcon from '@mui/icons-material/Add';
import { Fab, FabProps } from '@mui/material';

export default function AddFab(props: FabProps) {
  return (
    <Fab
      {...props}
      color="primary"
      sx={{ position: 'fixed', bottom: 24, right: 24 }}
    >
      <AddIcon />
    </Fab>
  );
}
