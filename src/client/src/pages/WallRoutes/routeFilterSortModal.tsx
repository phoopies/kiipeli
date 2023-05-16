import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import SouthIcon from '@mui/icons-material/South';

type Props = {};

export default function RouteFilterSortModal({}: Props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Button onClick={handleOpen} sx={{ width: '100%' }}>
        Filter and sort routes
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Filter and sort routes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is still WIP and does not work!
          </DialogContentText>
          <Box width="100%" display="flex">
            <FormControl fullWidth variant="standard">
              <InputLabel variant="standard" htmlFor="sort-by" id="sort-by">
                Sort by
              </InputLabel>
              <Select labelId="sort-by" id="sort-by" label="Sort by">
                <MenuItem value={'grade'}>Grade</MenuItem>
                <MenuItem value={'ticks'}>Ticks</MenuItem>
                <MenuItem value={'rating'}>Rating</MenuItem>
                <MenuItem value={'created'}>Creation</MenuItem>
              </Select>
            </FormControl>
            <IconButton>
              <SouthIcon />
            </IconButton>
          </Box>
          <Box marginY='1rem'>
          <Typography gutterBottom>Grade</Typography>
            <Slider
              name="grade"
              step={1}
              min={0}
              max={22}
              value={[2, 12]}
              valueLabelDisplay="auto"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
