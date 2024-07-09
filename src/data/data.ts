export type City = {
    id: number;
    isStock: number;
};

export type Road = {
    srcCityId: number;
    dstCityId: number;
    distance: number;
};

export const cities: City[] = [
    { id: 1, isStock: 1 },
    { id: 2, isStock: 0 },
    { id: 3, isStock: 1 },
];

export const roads: Road[] = [
    { srcCityId: 1, dstCityId: 2, distance: 15 },
    { srcCityId: 1, dstCityId: 3, distance: 20 },
    { srcCityId: 2, dstCityId: 1, distance: 15 },
];
