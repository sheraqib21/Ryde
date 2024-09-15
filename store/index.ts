import { create } from "zustand";
import {LocationStore,DriverStore} from "@/types/type";
export const useLocationStore = create<LocationStore>((set) => ({

    userAddress: null,
    userLongitude: null,
    userLatitude: null,
    destinationLongitude: null,
    destinationLatitude: null,
    destinationAddress: null,
    setUserLocation: ({
        latitude,
        longitude,
        address }: {

            latitude: number,
            longitude: number,
            address: string
        }) => {
        set(() => ({
            userLatitude: latitude,
            userLongitude: longitude,
            userAddress: address
        }));
    },
    setDestinationLocation: ({
        latitude,
        longitude,
        address }: {

            latitude: number,
            longitude: number,
            address: string
        }) => {
        set(() => ({
            destinationLatitude: latitude,
            destinationLongitude: longitude,
            destinationAddress: address
        }));
    }

}))

export const useDriverStore=create<DriverStore>((set)=>({
drivers:[] as MarketData[],
selectDriver:null,
setSelectedDriver:(driveId:number)=>set(()=>({

    selectedDriver:driveId
})),
setDrivers:(drivers:MarketData[])=>set(()=>({

    drivers:drivers
    
})),
clearSelectedDriver:()=>set(()=>({selectedDriver:null}))
}))

