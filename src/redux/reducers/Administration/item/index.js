const initialState = {
  data: [],
  params: null,
  ItemGroupList: [],
  itemList: [],
};

const ItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ITEM_DATA":
      return {
        ...state,
        data: action.data,
        error: action.error,
        params: action.params,
        successMsg: action.successMsg,
        itemList: action.data,
      };

    case "GET_ITEM_GROUP_DATA":
      return {
        ...state,
        ItemGroupList: action.data,
        error: action.error,
        params: action.params,
      };

    case "ADD_ITEM_DATA":
      return {
        ...state,
        error: action.error,
        random: action.random,
        successMsg: action.successMsg,
      };

    default:
      return state;
  }
};

export default ItemReducer;
