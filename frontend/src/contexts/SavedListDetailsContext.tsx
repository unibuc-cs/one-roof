import { createContext, ReactNode, useContext, useState } from "react";
import { SavedListDetailsScreen } from "../screens/SavedListDetailsScreen";

interface SavedListDetails {
    // name: string,
    // setName: React.Dispatch<React.SetStateAction<string>>,
    // ownerId: string,
    // setOwnerId: React.Dispatch<React.SetStateAction<string>>
    savedListId: string,
    sharedWith: string[],
    setSharedWith: React.Dispatch<React.SetStateAction<string[]>>,
    savedListings: string[],
    setSavedListings: React.Dispatch<React.SetStateAction<string[]>>,
}

const defaultSavedListDetails: SavedListDetails = {
    savedListId: '',
    sharedWith: [],
    setSharedWith: () => {},
    savedListings: [],
    setSavedListings: () => {}
}

const SavedListDetailsContext = createContext<SavedListDetails>(defaultSavedListDetails);

interface SavedListDetailsProviderProps {
    savedListId: string,
	children: ReactNode,
}

export const SavedListDetailsProvider : React.FC<SavedListDetailsProviderProps> = ({ savedListId, children }) => {
    const [sharedWith, setSharedWith] = useState<string[]>([]);
    const [savedListings, setSavedListings] = useState<string[]>([]);

    return (
        <SavedListDetailsContext.Provider value={{savedListId, sharedWith, setSharedWith, savedListings, setSavedListings}}>
            {children}
        </SavedListDetailsContext.Provider>
    )
};

export const useSavedListDetails = () => useContext(SavedListDetailsContext);