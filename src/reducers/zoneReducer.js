import constants from '../constants/constants';

const initialState = {
  list: [],
  selectedZone: 0
};

export default (state = initialState, action) => {
  let updatedState = Object.assign({}, state);

  switch (action.type) {
    case constants.ZONES_RECEIVED:
      updatedState['list'] = action.zones;
      return updatedState;

    case constants.ZONE_CREATED:
      let updatedList = Object.assign([], updatedState.list);
      updatedList.push(action.zone);
      updatedState['list'] = updatedList;
      return updatedState;

    case constants.SELECT_ZONE:
      updatedState['selectedZone'] = action.selectedZone;
      return updatedState;

    default:
      return state;
  }
};
