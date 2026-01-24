
export const payloadBubuLeave = {
  version: 47,
  stations: [
    { name: 'Moltrechtweg', id: 'Master:90018', city: 'Hamburg', type: 'STATION' },
    { name: 'Suhrenkamp', id: 'Master:91031', city: 'Hamburg', type: 'STATION' }
  ],
  filter: [
    { serviceID: 'HHA-B:23_HHA-B', stationIDs: ['Master:90031'] },
    { serviceID: 'HHA-B:28_HHA-B', stationIDs: ['Master:90031'] },
    { serviceID: 'HHA-B:174_HHA-B', stationIDs: ['Master:90038'] },
    { serviceID: 'HHA-B:218_HHA-B', stationIDs: ['Master:90030'] }
  ],
  time: { time: 'jetzt' },
  maxList: 15,
  allStationsInChangingNode: 'true',
  maxTimeOffset: 200,
  useRealtime: 'true'
};

export const payloadBibiLeave = {
  version: 47,
  stations: [
    { "name": "Habichtsplatz", "id": "Master:70045", "city": "Hamburg", "type": "STATION" }
  ],
  filter: [
    { "serviceID": "HHA-B:28_HHA-B", "stationIDs": ["Master:70097"] }
  ],
  time: { time: 'jetzt' },
  maxList: 5,
  allStationsInChangingNode: 'true',
  maxTimeOffset: 200,
  useRealtime: 'true'
}