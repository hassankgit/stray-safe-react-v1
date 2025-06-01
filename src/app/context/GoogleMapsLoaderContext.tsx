"use client";
import { createContext, useContext, ReactNode } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

type GoogleMapsContextType = {
  isLoaded: boolean;
};

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
});

export function GoogleMapsLoaderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

export function useGoogleMaps() {
  return useContext(GoogleMapsContext);
}
