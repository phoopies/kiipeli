import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { getRoute } from '../reducers/routesSlice';

export default function useRoute() {
  const { routeId } = useParams();
  const { route, loading } = useSelector((state: RootState) => state.routes);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!routeId) {
      return;
    }
    dispatch(getRoute(routeId));
  }, [dispatch, routeId]);


  return { route, loading: loading === 'pending' };
}
