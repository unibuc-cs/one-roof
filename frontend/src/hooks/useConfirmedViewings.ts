import { useCallback, useEffect, useState } from 'react';
import { viewingService } from '../services';
import { IViewing } from '../models';

export const useConfirmedViewings = (userId: string) => {
    const [ viewings, setViewings ] = useState<IViewing[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const fetchViewings = useCallback(async () => {
        setIsLoading(true);
        viewingService.getUserViewings(userId)
            .then(data => {
                setViewings(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err);
                setIsLoading(false);
            });
    }, [userId]);

    useEffect(() => {
        if (userId) fetchViewings();
    }, [userId, fetchViewings]);

    return { viewings, isLoading, error, refetch: fetchViewings };
};