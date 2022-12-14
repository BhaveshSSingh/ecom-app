import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

export function ComboBox({ items, onSelectionChange, onSearch }) {
  // For the drop down on Search
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("searchterm") ?? ""
  );

  const handleChange = (e) => {
    const { value } = e.target;
    if (!value && searchTerm !== value) {
      // empyt value or the combobox is cleared
      onSelectionChange(value);
    }
    setSearchTerm(value);
  };

  const handleProductSelection = (productTitle) => {
    setSearchTerm(productTitle);
    onSelectionChange(productTitle);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const results = searchTerm
    ? items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : items;

  return (
    <>
      <Combobox aria-label="products" onSelect={handleProductSelection}>
        <ComboboxInput
          className="city-search-input"
          onChange={handleChange}
          type="search"
          value={searchTerm}
        />
        <button onClick={handleSearch}>🔎</button>
        {results && (
          <ComboboxPopover className="shadow-popup">
            {results.length > 0 ? (
              <ComboboxList>
                {results.slice(0, 5).map((prod, index) => (
                  <ComboboxOption key={prod.id} value={prod.title} />
                ))}
              </ComboboxList>
            ) : (
              <span style={{ display: "block", margin: 8 }}>
                No results found
              </span>
            )}
          </ComboboxPopover>
        )}
      </Combobox>
    </>
  );
}
