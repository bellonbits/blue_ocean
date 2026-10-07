// =========================================================
// Coastal & Marine Statistics — Historical Reference Dataset
//
// Reproduced from EarthTrends: The Environmental Information Portal,
// "Coastal and Marine Ecosystems — Somalia" country profile,
// World Resources Institute (WRI), 2003.
//
// Reference years vary by indicator (see each table) and mostly fall
// between 1990 and 2000. This is presented as an archival baseline —
// not current data — pending Blue Ocean's own updated national
// assessments. "X" marks indicators with no available data in the
// source document.
// =========================================================

export const statsSource = {
  title: 'Coastal and Marine Ecosystems — Somalia',
  publisher: 'EarthTrends: The Environmental Information Portal, World Resources Institute (WRI)',
  year: 2003,
  url: 'http://earthtrends.wri.org',
  citation:
    'World Resources Institute, "Coastal and Marine Ecosystems — Somalia," EarthTrends Country Profiles, 2003.',
};

export const NO_DATA = 'X';

export const statisticsTables = [
  {
    id: 'coastal-statistics',
    title: 'Coastal Statistics',
    subtitle: '2000',
    columns: ['Somalia', 'Sub-Saharan Africa', 'World'],
    rows: [
      { label: 'Length of coastline', unit: 'km', footnote: 'a', values: ['3,898', '63,124', '1,634,701'] },
      { label: 'Percent of population within 100 km of the coast', unit: null, values: ['55%', NO_DATA, '39%'] },
      { label: 'Area of continental shelf', unit: 'km²', footnote: 'b', values: ['40,392', '987,021', '24,285,959'] },
      { label: 'Territorial sea (up to 12 nautical miles)', unit: 'km²', values: ['68,849', '871,895', '18,816,919'] },
      { label: 'Claimed Exclusive Economic Zone', unit: 'km²', values: [NO_DATA, '7,866,074', '102,108,403'] },
    ],
  },
  {
    id: 'biodiversity-protected-areas',
    title: 'Coastal Biodiversity and Protected Areas',
    subtitle: '1990s',
    columns: ['Somalia', 'Sub-Saharan Africa', 'World'],
    rows: [
      { label: 'Area of mangrove forests', unit: 'km²', values: ['0', '38,013', '169,452'] },
      { label: 'Percent of mangrove forests protected', unit: null, values: [NO_DATA, '1%', '13%'] },
      { label: 'Number of mangrove species', unit: null, values: ['6', '17', '70'] },
      { label: 'Number of seagrass species', unit: null, values: ['4', '15', '58'] },
      { label: 'Number of Scleractinia coral genera', unit: null, footnote: 'c', values: ['50', '68', NO_DATA] },
      {
        label: 'International legal net trade in live coral',
        unit: 'pieces, 1997',
        footnote: 'd',
        values: [NO_DATA, '-202', NO_DATA],
      },
      { label: 'Number of marine or littoral protected areas', unit: '1999', values: ['2', '150', '3,636'] },
      { label: 'Wetlands of international importance, extent', unit: 'km², 2000', values: [NO_DATA, '143,481', '730,116'] },
    ],
  },
  {
    id: 'fisheries-production',
    title: 'Fisheries Production',
    subtitle: 'Average annual capture and aquaculture output, in metric tons',
    columns: ['Somalia', 'Sub-Saharan Africa', 'World'],
    groups: [
      {
        label: 'Average Annual Capture (excludes aquaculture)',
        rows: [
          { label: 'Marine fish', unit: '2000', values: ['20,000', NO_DATA, '84,411,066'] },
          { label: 'Molluscs and crustaceans', unit: '1997', values: ['900', '140,424', '12,055,801'] },
        ],
      },
      {
        label: 'Aquaculture Production',
        rows: [
          { label: 'Total (includes freshwater)', unit: '2000', values: [NO_DATA, '55,520', '45,715,559'] },
          { label: 'Marine and diadromous fish', unit: '1997', values: [NO_DATA, '1,202', '2,623,888'] },
          { label: 'Molluscs and crustaceans', unit: '1997', values: [NO_DATA, '6,299', '9,889,688'] },
          { label: 'Aquatic plants', unit: '1997', values: [NO_DATA, '3,095', '7,241,754'] },
        ],
      },
    ],
  },
  {
    id: 'fish-consumption-trade',
    title: 'Fish Consumption and Trade',
    subtitle: '2000',
    columns: ['Somalia', 'Sub-Saharan Africa', 'World'],
    rows: [
      { label: 'Per capita food supply from fish and fishery products', unit: 'kg/person', values: ['3', '8', '16'] },
      { label: 'Fish protein as a percent of total protein supply', unit: null, values: ['2%', '6%', '6%'] },
      { label: 'Imports of fish and fisheries products', unit: 'thousand US$', values: ['100', '778,886', '60,008,337'] },
      { label: 'Percent change in imports since 1980', unit: null, values: ['-53%', '-3%', '275%'] },
      { label: 'Exports of fish and fisheries products', unit: 'thousand US$', values: ['2,494', '1,642,028', '54,570,489'] },
      { label: 'Percent change in exports since 1980', unit: null, values: ['464%', NO_DATA, '258%'] },
    ],
  },
  {
    id: 'fishing-effort',
    title: 'Fishing Effort',
    subtitle: 'Both freshwater and marine',
    columns: ['Somalia', 'Sub-Saharan Africa', 'World'],
    rows: [
      { label: 'People employed in fishing and aquaculture', unit: 'number, 2000', values: ['18,900', '1,995,694', '36,116,329'] },
      { label: 'Docked fishery vessels', unit: 'number, 1995–98', footnote: 'e', values: ['9', NO_DATA, '1,297,017'] },
    ],
  },
];

export const footnotes = [
  { id: 'a', text: 'Figures should be interpreted as approximations. Estimates may differ from other published sources.' },
  { id: 'b', text: 'Up to 200 meters depth.' },
  { id: 'c', text: 'Reef forming corals (i.e. "true" or stony corals).' },
  { id: 'd', text: 'Imports minus exports = net trade. A negative value means the country or region exports more coral than it imports.' },
  { id: 'e', text: 'Data are for the most recent available year in the listed range of years.' },
];

export const definitions = [
  {
    term: 'Length of Coastline',
    text: 'Derived from the World Vector Shoreline database of the U.S. Mapping Agency, calculated via GIS at 1:250,000 km resolution. Coastline length of a country’s islands is generally included in its total.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=61&theme=1',
  },
  {
    term: 'Percent of Population within 100 km of Coast',
    text: 'Based on 1995 population figures from the Gridded Population of the World dataset, using a 100 km coastal buffer to estimate the coastal-zone population share.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=63&theme=1',
  },
  {
    term: 'Area of Continental Shelf',
    text: 'Under UNCLOS, the seabed and subsoil extending beyond the territorial sea to 200 nautical miles (or further under specified circumstances), over which coastal states hold sovereign exploration and exploitation rights.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=62&theme=1',
  },
  {
    term: 'Territorial Sea',
    text: 'The 12-nautical-mile zone from the coastal baseline, per UNCLOS, over which a state’s sovereignty extends — including sea-bed, subsoil, and airspace — subject to the right of "innocent passage" for foreign vessels.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=56&theme=1',
  },
  {
    term: 'Claimed Exclusive Economic Zone (EEZ)',
    text: 'Under UNCLOS, coastal states may claim a 200-nautical-mile EEZ for exploring, exploiting, conserving, and managing all natural resources in the seabed, subsoil, and overlying waters.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=58&theme=1',
  },
  {
    term: 'Area & Protection of Mangrove Forests',
    text: 'Mangrove extent compiled by the World Conservation Monitoring Centre (WCMC) from national and regional forest-cover data. "Percent protected" covers mangrove area within IUCN management category I–VI protected areas.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=317&theme=1',
  },
  {
    term: 'Number of Mangrove Species',
    text: 'Mangrove trees, shrubs, ferns, and palms tolerant of salt and brackish coastal water, compiled by WCMC. Data quality and vintage vary by country, so figures are not strictly comparable.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=65&theme=1',
  },
  {
    term: 'Number of Seagrass Species',
    text: 'Marine angiosperms forming underwater meadows in coastal soft substrates, providing habitat and feeding grounds for fish and shellfish.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=66&theme=1',
  },
  {
    term: 'Number of Scleractinia Coral Genera',
    text: 'Most reef-forming corals belong to the family Scleractinia ("true" or stony corals), found chiefly in shallow tropical waters between the Tropics of Cancer and Capricorn.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=67&theme=1',
  },
  {
    term: 'International Legal Net Trade in Live Coral',
    text: 'Pieces of coral traded under CITES regulation; net trade equals total imports minus total exports. Illegal or intra-national trade, and capture/transit mortality, are not reflected.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=154&theme=1',
  },
  {
    term: 'Marine or Littoral Protected Areas',
    text: 'IUCN defines a marine protected area as intertidal or subtidal terrain — with its overlying water, flora, fauna, and cultural features — reserved by law or other effective means. "Littoral" sites incorporate at least some intertidal area.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=116&theme=1',
  },
  {
    term: 'Wetlands of International Importance',
    text: 'Sites listed under the 1971 Ramsar Convention for their international significance in ecology, botany, zoology, limnology, or hydrology.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=720&theme=1',
  },
  {
    term: 'Marine Fish Capture',
    text: 'FAO-defined nominal catch of cods, hakes, flounders, herrings, jacks, tunas, and other marine fishes, taken for commercial, industrial, recreational, or subsistence purposes. Excludes aquaculture and discards.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=514&theme=1',
  },
  {
    term: 'Molluscs and Crustaceans Capture',
    text: 'Marine and inland waters molluscs and crustaceans caught or trapped, including crabs, lobsters, shrimps, and prawns.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=40&theme=1',
  },
  {
    term: 'Aquaculture',
    text: 'FAO-defined farming of aquatic organisms — fish, molluscs, crustaceans, and aquatic plants — involving active intervention (stocking, feeding, predator protection) and ownership of the cultivated stock.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=37&theme=1',
  },
  {
    term: 'Per Capita Food Supply from Fish',
    text: 'Quantity of freshwater and marine fish, seafood, and derived products available for human consumption per person, on a live-weight basis, including all edible and non-edible parts.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=50&theme=1',
  },
  {
    term: 'Fish Protein as % of Total Protein Supply',
    text: 'Protein from fish, seafood, and derived products available for human consumption, as a percentage of all animal protein available, on a live-weight basis.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=53&theme=1',
  },
  {
    term: 'Annual Trade in Fish and Fishery Products',
    text: 'Import and export values of live, fresh, chilled, frozen, dried, salted, smoked, or canned fish and fish products, plus molluscs, crustaceans, meals, oils, sponges, corals, and inedible products, in thousands of US dollars.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=42&theme=1',
  },
  {
    term: 'People Employed in Fishing and Aquaculture',
    text: 'Number of people employed in commercial and subsistence fishing (vessel and shore-based) and in aquaculture production, across freshwater, brackish, and marine areas.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=54&theme=1',
  },
  {
    term: 'Docked Fishery Vessels',
    text: 'Mobile floating craft used for catching, harvesting, transporting, or processing fish and other aquatic organisms, with a fixed structural deck covering the entire hull above the deepest operating waterline.',
    url: 'http://earthtrends.wri.org/searchable_db/variablenotes_static.cfm?varid=98&theme=1',
  },
];

export const dataSources = [
  'Center for International Earth Science Information Network (CIESIN), World Resources Institute, and International Food Policy Research Institute, "Gridded Population of the World, Version 2 alpha" (Columbia University, Palisades, NY, 2000).',
  'Pruett, L. and Cimino, J. Unpublished data, Global Maritime Boundaries Database (GMBD), Veridian – MRJ Technology Solutions (Fairfax, Virginia, January 2000).',
  'Convention on International Trade in Endangered Species of Wild Fauna and Flora (CITES) annual report data, World Conservation Monitoring Centre (WCMC) CITES Trade Database (WCMC, Cambridge, U.K., December 1999).',
  'Iremonger, S., C. Ravilious, T. Quinton, "A Statistical Analysis of Global Forest Conservation," in "A Global Overview of Forest Conservation CD-ROM" (WCMC and Centre for International Forestry Research, Cambridge, U.K., 1997).',
  'Protected Areas Database of the World Conservation Monitoring Centre (WCMC), unpublished data (WCMC, Cambridge, U.K., August 1999).',
  'Ramsar Convention Bureau, Gland, Switzerland.',
  'Spalding, M., F. Blasco, and C. Field (Eds.), "World Mangrove Atlas," International Society for Mangrove Ecosystems (ISME), Okinawa, Japan, 1997.',
  'World Conservation Monitoring Centre, unpublished data (WCMC, Cambridge, U.K., August 1999).',
  'Fishery Information, Data and Statistics Unit, Food and Agriculture Organization of the United Nations (FAO), FISHSTAT Plus, Version 2.3, Aquaculture Production dataset. Rome: FAO, 2002.',
  'Food and Agriculture Organization of the United Nations (FAO), FAOSTAT on-line statistical service. Rome: FAO, 2002.',
  'Fishery fleet data, Food and Agriculture Organization of the United Nations (FAO), Fishery Information, Data and Statistics Unit (FIDI), July 2002.',
];
