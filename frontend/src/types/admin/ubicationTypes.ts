export type RegionType = {
  id: string;
  idReference: string;
  name: string;
}

export type ProvinceType = {
  id: string;
  idReference: string;
  name: string;
  idReferenceRegion: string;
}

export type GetAllRegionsType = {
  getAllRegions: {
    idReference: string;
    name: string;
  }[];
}

export type GetProvincesByRegionIdType = {
  getProvincesByRegionId: {
    idReference: string;
    name: string;
  }[];
}

/* */

export type GetRegionInput = {
  id: string;
}

export type GetProvincesByRegionIdInput = {
  id: string;
}

export type CreateRegionInput = {
  idReference: string;
  name: string;
}

export type CreateProvinceInput = {
  idReference: string;
  name: string;
  idReferenceRegion: string;
}

export type RegionOutput = {
  idReference: string;
  name: string;
}

export type ProvinceOutput = {
  idReference: string;
  name: string;
}