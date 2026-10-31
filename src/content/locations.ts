import type { Location } from "./types";

/** Offices and partners. Everything except the website-listed HQ needs confirmation. */
export const locations: Location[] = [
  {
    id: "hq-delta",
    name: "SPC Head Office & Technical Service",
    kind: "office",
    address: "#14 – 1595 Cliveden Avenue, Delta, BC V3M 6M2, Canada",
    country: "Canada",
    phone: "+1 604 514 9711",
    coords: [-122.95, 49.17],
    verified: true,
    note: "Listed on spc-net.com. 2016 press named Langley, BC — confirm the current HQ.",
  },
  {
    id: "houston",
    name: "SPC Houston Office",
    kind: "office",
    address: "Houston, TX, USA (full address to confirm)",
    country: "USA",
    coords: [-95.37, 29.76],
    verified: false,
  },
  {
    id: "angleton",
    name: "Angleton Office & Warehouse",
    kind: "warehouse",
    address: "Angleton, TX, USA (from 2016 press; confirm)",
    country: "USA",
    coords: [-95.43, 29.17],
    verified: false,
  },
  {
    id: "brantford",
    name: "Brantford Plant",
    kind: "plant",
    address: "Brantford, ON, Canada (from 2016 press; confirm)",
    country: "Canada",
    coords: [-80.26, 43.14],
    verified: false,
  },
  {
    id: "australia",
    name: "Australia Partner",
    kind: "distributor",
    address: "Australia (partner details to confirm)",
    country: "Australia",
    coords: [151.21, -33.87],
    verified: false,
  },
];
