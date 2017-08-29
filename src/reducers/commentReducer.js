import constants from '../constants/constants';

const initialState = {
  map: {}
};

export default (state = initialState, action) => {
  let updatedState = Object.assign({}, state);
  let updatedMap = Object.assign({}, updatedState.map);

  switch (action.type) {
    case constants.COMMENTS_RECEIVED:
      let zoneComments = updatedMap[action.zone._id]
        ? Object.assign([], updatedMap[action.zone._id]) //old way of copying Obj/Arr
        : [];

      action.comments.map((comment, i) => {
        zoneComments.push(comment);
      });

      updatedMap[action.zone._id] = zoneComments;
      updatedState['map'] = updatedMap;

      return updatedState;

    case constants.COMMENT_CREATED:
      let zoneComment = updatedMap[action.comment.zone]
        ? [...updatedMap[action.comment.zone]] //new way of copying Obj/Arr
        : [];
      // let ZoneComment = updatedMap[action.comment.zone]
      //   ? Object.assign([], updatedMap[action.comment.zone])
      //   : [];
      zoneComment.push(action.comment);
      updatedMap[action.comment.zone] = zoneComment;
      updatedState['map'] = updatedMap;

      return updatedState;

    case constants.SELECT_ZONE:
      return updatedState;

    default:
      return state;
  }
};
