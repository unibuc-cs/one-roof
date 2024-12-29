import { useEffect, useState } from 'react';
import { viewingService } from '../services';
import { IViewing } from '../models';

export const useConfirmedViewings = (userId: string) => {
    const [ viewings, setViewings ] = useState<IViewing[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
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

    return { viewings, isLoading, error };
};