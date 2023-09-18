import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import "./Visitor.css";
import { parameterMap, weatherConditions } from "./weathercodes.js";
import { useDispatch, useSelector } from "react-redux";
import { visitorData } from "../../actions/weather";

const Visitor = () => {
  const dispatch = useDispatch();
  const [showTable, setShowTable] = useState(false);
  const data = useSelector((state) => state.weather.data);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaWxsdW1pbmF0dXM2NiIsImEiOiJjbGxnYnRpeXcxNDhjM21tZ25jcndxeDVzIn0.-vZDD9v0rvv-8GPCTpRvgg";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [72.87454485949254, 19.206438327005614],
      zoom: 9,
    });

    map.on("mousemove", (e) => {
      document.getElementById("info").innerHTML =
        JSON.stringify(e.point) +
        "<br />" +
        JSON.stringify(e.lngLat.wrap());
    });

    map.on("dblclick", async (e) => {
      console.log(`A dblclick event has occurred at ${e.lngLat}`);
      setShowTable(true);
      let arr = e.lngLat.toArray();
      let lng = arr[0];
      let lat = arr[1];
      console.log(arr);
      console.log(lat);
      console.log(lng);

      try {
        dispatch(visitorData({ lat, lng }));
      } catch (error) {
        console.error(error);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (data && data.data && data.data.timelines && data.data.timelines.length > 0) {
      const todTable = document.querySelector("#dayone tbody");
      const tomTable = document.querySelector("#daytwo tbody");
      todTable.innerHTML = "";
      tomTable.innerHTML = "";

      for (const parameter of Object.keys(data.data.timelines[0].intervals[0].values)) {
        const row = document.createElement("tr");
        const paramcell = document.createElement("td");
        const valuecell = document.createElement("td");

        paramcell.textContent = parameterMap[parameter] || parameter;
        let value = data.data.timelines[0].intervals[0].values[parameter];
        if (parameter === "sunriseTime" || parameter === "sunsetTime") {
          value = new Date(value).toLocaleString();
        } else if (parameter === "weatherCodeDay" || parameter === "weatherCodeNight") {
          value = weatherConditions[value] || "Unknown";
        }
        valuecell.textContent = value;

        row.appendChild(paramcell);
        row.appendChild(valuecell);
        todTable.appendChild(row);
      }

      for (const parameter of Object.keys(data.data.timelines[0].intervals[1].values)) {
        const row = document.createElement("tr");
        const paramcell = document.createElement("td");
        const valuecell = document.createElement("td");

        paramcell.textContent = parameterMap[parameter] || parameter;
        let value = data.data.timelines[0].intervals[1].values[parameter];
        if (parameter === "sunriseTime" || parameter === "sunsetTime") {
          value = new Date(value).toLocaleString();
        } else if (parameter === "weatherCodeDay" || parameter === "weatherCodeNight") {
          value = weatherConditions[value] || "Unknown";
        }
        valuecell.textContent = value;

        row.appendChild(paramcell);
        row.appendChild(valuecell);
        tomTable.appendChild(row);
      }
    }
  }, [data]);

  return (
    <div>
      <div>
        <div id="map"></div>
        <div id="info-container">
          <pre id="info"></pre>
        </div>

        <table
          id="dayone"
          style={{ visibility: showTable ? "visible" : "hidden" }}
        >
          <thead>
            <tr>
              <th>Parameter</th>
              <th>&nbsp;Predictions for Today&nbsp;&nbsp;</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>

        <table
          id="daytwo"
          style={{ visibility: showTable ? "visible" : "hidden" }}
        >
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Predictions for Tomorrow</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default Visitor;
