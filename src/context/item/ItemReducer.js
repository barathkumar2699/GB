import * as types from "../types";

export default (state, action) => {
  switch (action.type) {
    case types.GET_BATTERIES:
      return {
        ...state,
        loading: false,
        batteries: action.payload,
        battery: null,
      };
    case types.ADD_BATTERY:
      return {
        ...state,
        batteries: [...state.batteries, action.payload],
      };
    case types.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };

    case types.GET_BATTERY_BY_ID:
      return {
        ...state,
        battery: action.payload,
        loading: false,
      };

    case types.ADMIN_LOGIN:
      return {
        ...state,
        admin: action.payload,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        admin: false,
        error: action.payload,
      };
    case types.DELETE_BATTERY:
      return {
        ...state,
        batteries: state.batteries.filter(
          (batteries) => batteries.id !== action.payload
        ),
      };
    case types.UPDATE_BATTERY:
      return {
        ...state,
        batteries: state.batteries.map((battery) =>
          battery.id === action.payload.id ? action.payload : battery
        ),
      };
    case types.SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case types.CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

      case types.DELETE_ENQUIRY:
      return {
        ...state,
        enquiry: state.enquiry.filter(
          (e) => e.id !== action.payload
        ),
      };

      case types.FETCH_ENQUIRY:
        return{
          ...state,
          enquiry:action.payload
        }

      case types.FETCH_COMMENT:
        return{
          ...state,
          comments: (action.payload).filter((comment)=>parseInt(comment.batteryId)===parseInt(action.id))
        
        }
        case types.POST_COMMENT:
        return{
          ...state,
          comments:[...state.comments, action.payload],
        }

        case types.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (e) => e.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
