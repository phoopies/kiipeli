import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getWall } from '../reducers/wallSlice';
import { RootState, AppDispatch } from '../store';

export default function useWall() {
  const { wallId } = useParams();
  const { wall, loading } = useSelector((state: RootState) => state.wall);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!wallId) {
      return;
    }
    dispatch(getWall(wallId));
  }, [dispatch, wallId]);

  return { wall, loading: loading === 'pending' };
}
