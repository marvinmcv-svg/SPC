import type { DocumentRef } from "./types";

/**
 * Document library. `url: null` means the PDF has not been uploaded yet;
 * the UI shows "Request this document" instead of a download link.
 */
export const documents: DocumentRef[] = [
  {
    id: "pds-sp-2888-rg-en",
    title: "SP-2888 RG Product Data Sheet",
    type: "PDS",
    product: "sp-2888-rg",
    language: "en",
    version: "TBC",
    updated: "TBC",
    url: null,
  },
  {
    id: "sds-sp-2888-rg-en",
    title: "SP-2888 RG Safety Data Sheet",
    type: "SDS",
    product: "sp-2888-rg",
    language: "en",
    version: "TBC",
    updated: "TBC",
    url: null,
    region: "North America",
  },
  {
    id: "guide-field-joint-en",
    title: "Field-Joint Application Guide (liquid epoxy)",
    type: "Application Guide",
    product: "sp-2888-rg",
    language: "en",
    version: "TBC",
    updated: "TBC",
    url: null,
  },
  {
    id: "cert-lloyds-register",
    title: "Lloyd's Register Approval Certificate",
    type: "Certificate",
    language: "en",
    version: "TBC",
    updated: "TBC",
    url: null,
  },
  {
    id: "brochure-company-en",
    title: "SPC Company Brochure",
    type: "Brochure",
    language: "en",
    version: "TBC",
    updated: "TBC",
    url: null,
  },
];

export function getDocument(id: string) {
  return documents.find((d) => d.id === id);
}
