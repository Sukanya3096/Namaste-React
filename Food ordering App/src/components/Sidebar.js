import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import PlacesAutoComplete from "react-places-autocomplete";

export const Sidebar = (props) => {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState("");

  const handleClose = () => setShow(false);

  const handleCloseClick = () => {
    setAddress("");
  };

  const handleSelect = (value) => {
    const formatted_addr = value.split(",").filter((el, i) => {
      return ![1, 2, 3].includes(i);
    });
    setAddress(formatted_addr.join(","));
    props.addressChange(formatted_addr.join(","));
    setShow(false);
  };

  useEffect(() => {
    setShow(props.flag);
  }, [props.flag]);
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Delivery At?</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <PlacesAutoComplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
            className="addressInput"
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => {
              return (
                <div>
                  <div className="input-block">
                    <input
                      {...getInputProps({
                        placeholder: "Search for area, street name..",
                        className: "input-3",
                      })}
                    />
                    {address.length > 0 && (
                      <button
                        className="Demo__clear-button"
                        onClick={handleCloseClick}
                      >
                        x
                      </button>
                    )}
                  </div>
                  {suggestions.length > 0 && (
                    <div className="Demo__autocomplete-container">
                      {suggestions.map((suggestion) => {
                        const className = `Demo__suggestion-item ${
                          suggestion.active
                            ? "emo__suggestion-item--active"
                            : ""
                        }`;

                        return (
                          /* eslint-disable react/jsx-key */
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                            })}
                            key={suggestion.placeId}
                          >
                            <strong>
                              {suggestion.formattedSuggestion.mainText}
                            </strong>{" "}
                          </div>
                        );
                        /* eslint-enable react/jsx-key */
                      })}
                    </div>
                  )}
                </div>
              );
            }}
          </PlacesAutoComplete>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
