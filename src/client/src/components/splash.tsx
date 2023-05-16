import { Box, Fade } from '@mui/material';

type Props = {
  full: boolean;
};

export default function Splash({ full }: Props) {
  const style = {
    width: '100%',
    height: full ? '100%' : 'min-content',
    backgroundColor: 'primary.main',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Box sx={style}>
      <Fade appear in timeout={1000}>
        <img alt="splash" src='/kiipeli.svg' />
      </Fade>
    </Box>
  );
}
