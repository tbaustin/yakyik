import constants from '../constants/constants';

export default {
  commentsReceived: (comments, zone) => {
    return {
      type: constants.COMMENTS_RECEIVED,
      comments: comments,
      zone: zone
    };
  },

  commentCreated: comment => {
    return {
      type: constants.COMMENT_CREATED,
      comment: comment
    };
  },

  zonesReceived: zones => {
    return {
      type: constants.ZONES_RECEIVED,
      zones: zones
    };
  },

  zoneCreated: zone => {
    return {
      type: constants.ZONE_CREATED,
      zone: zone
    };
  },

  selectZone: zoneIndex => {
    return {
      type: constants.SELECT_ZONE,
      selectedZone: zoneIndex
    };
  }
};
