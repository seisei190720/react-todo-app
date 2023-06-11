import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRecoilState } from 'recoil';
import { deleteTodo, taskCacheAtom } from '../../../../atoms/RegisterDialogContent';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number},
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" color="secondary" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function CircularStatic(todoId: any) {
  const [progress, setProgress] = React.useState(0);
    const [cachedTask, setCachedTask] = useRecoilState(taskCacheAtom);


  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 2.5));
    }, 125);
    // return () => {
    //     console.log("今呼ばれまいた");
    //     clearInterval(timer);
    //     if (cachedTask === null) return;
    //     console.log("今呼ばれまいたdesu");
    //     setCachedTask(cachedTask?.filter((v) => v.id !== todoId));
    //     deleteTodo(todoId);
    // };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}