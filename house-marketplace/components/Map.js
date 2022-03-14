import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = ({ listing }) => {
  return (
    <div className="leafletContainer">
      <MapContainer
        style={{
          height: "700px",
          width: "100%",
        }}
        center={[listing?.geolocation.lat, listing?.geolocation.lng]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default Map;
