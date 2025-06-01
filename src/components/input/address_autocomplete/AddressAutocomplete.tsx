import { useEffect, useRef, useState } from "react";

type AddressAutocompleteProps = {
  name: string;
  onSelect: (address: string, coords: { lat: number; lng: number }) => void;
  defaultValue?: string;
  className?: string;
};

export default function AddressAutocomplete(props: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState(props.defaultValue ?? "");

  useEffect(() => {
    if (props.defaultValue && props.defaultValue !== address) {
      setAddress(props.defaultValue);
    }
  }, [props.defaultValue]);

  useEffect(() => {
    if (!window.google || !inputRef.current) {
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        fields: ["formatted_address", "geometry"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry?.location) {
        return;
      }

      const coords = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      const fullAddress = place.formatted_address ?? "";
      setAddress(fullAddress);
      props.onSelect(fullAddress, coords);
    });
  }, []);

  return (
    <>
      <input
        ref={inputRef}
        name={props.name}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Search for an address..."
        className={props.className}
      />
    </>
  );
}
