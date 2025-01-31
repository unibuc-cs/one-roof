import { useEffect, useState } from 'react';
import { viewingService } from '../services';
import { IViewing } from '../models';

export const acceptViewing = (viewingId: string, userId: string) => {
	viewingService.confirmViewing(viewingId, userId);
};

export const deleteViewing = (viewingId: string, userId: string) => {
	viewingService.deleteViewing(viewingId, userId);
};
