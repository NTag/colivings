import "leaflet/dist/leaflet.css";

import styled from "styled-components/macro";
import { useState } from "react";
import { CircleMarker, MapContainer, ImageOverlay } from "react-leaflet";
import DottedMap from "dotted-map/without-countries";

import mapJson from "./map.json";
import "./App.css";
import { colivings } from "./colivings";

const map = new DottedMap({ map: mapJson });

const svgMap = map.getSVG({
  radius: 0.22,
  color: "#423B38",
  shape: "circle",
  backgroundColor: "#020300",
});
const { region } = map.image;

const bounds = [
  [region.lat.min, region.lng.min],
  [region.lat.max, region.lng.max],
];

const Map = styled(MapContainer)`
  height: 100vh;
  width: 100vw;
`;
const Tooltip = styled.div`
  position: fixed;
  top: 100px;
  left: 100px;
  z-index: 100000;
  color: white;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left + 12}px;
  padding-left: 4px;
  border-left: 2px solid white;
  pointer-events: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};

  ${({ $visible }) => ($visible ? "" : "transition: opacity 0.2s;")}
`;

const App = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [displayedColiving, setDisplayedColiving] = useState(null);
  const [tooltipCoords, setTooltipCoords] = useState({ top: 0, left: 0 });

  return (
    <div>
      <Map center={[46.204391, 6.143158]} zoom={5} maxZoom={6} minZoom={4}>
        <ImageOverlay
          url={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          bounds={bounds}
        />
        {colivings.map((coliving) => {
          const isColivingDisplayed =
            coliving === displayedColiving && isTooltipVisible;
          const isAnotherColivingDisplayed =
            !isColivingDisplayed && isTooltipVisible;
          const [lat, lng] = coliving.location;
          const pin = map.getPin({ lat, lng });

          return (
            <CircleMarker
              center={[pin.lat, pin.lng]}
              radius={4}
              pathOptions={{
                fillColor: isColivingDisplayed ? "#F0F600" : "#00E5E8",
                color: "transparent",
                fillOpacity: isAnotherColivingDisplayed ? 0.6 : 1,
              }}
              key={coliving.website}
              eventHandlers={{
                mouseover: (e) => {
                  setTooltipCoords({
                    top: e.originalEvent.clientY,
                    left: e.originalEvent.clientX,
                  });
                  setDisplayedColiving(coliving);
                  setIsTooltipVisible(true);
                },
                mouseout: () => {
                  setIsTooltipVisible(false);
                },
                click: () => window.open(coliving.website, "_blank"),
              }}
            />
          );
        })}
      </Map>
      <Tooltip
        $top={tooltipCoords.top}
        $left={tooltipCoords.left}
        $visible={isTooltipVisible}
      >
        <div>
          <b>{displayedColiving?.name}</b>
        </div>
        {displayedColiving?.city}
      </Tooltip>
    </div>
  );
};

export default App;
