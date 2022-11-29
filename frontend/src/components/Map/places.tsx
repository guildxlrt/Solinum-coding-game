import React from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

type PlacesProps = {
    setOffice: (position: google.maps.LatLngLiteral) => void;
};

export default function Places({ setOffice }: PlacesProps) {
    const {
        ready,
        value,
        setValue,
        suggestions : {status, data},
        clearSuggestions
    } = usePlacesAutocomplete();

    const handleSelect = async (val: string) => {
        setValue(val, false);
        clearSuggestions();
    
        const results = await getGeocode({ address: val });
        const { lat, lng } = await getLatLng(results[0]);
        setOffice({ lat, lng });
    };
    
    return (
    <Combobox onSelect={handleSelect}>
        <ComboboxInput
            className="combobox-input"
            value={value}
            onChange={e => setValue(e.target.value)}
            disabled={!ready}
            placeholder="Search office adress"
        />
    </Combobox>
  )
}