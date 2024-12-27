export interface ISavedList{
    _id:string,
    name: string,
    ownerId: string,
    sharedWith: string[];
    savedListings: string[];
}