import axios from "axios";
import { getHeaders, apiEndPoints } from "../../../../constant/commonDS";

export const getCard = (params) => {
  return async (dispatch) => {
    await axios.post(apiEndPoints.getCardList, params, getHeaders).then(
      (response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "GET_CARD_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          dispatch({
            type: "GET_CARD_DATA",
            data: response.data.Data,
            totalPages: response.data.totalPages,
            params,
          });
        }
      },
      (error) => {}
    );
  };
};

export const addCard = (obj) => {
  return (dispatch, getState) => {
    let params = getState().card.params;
    axios
      .post(apiEndPoints.addCard, obj, getHeaders)

      .then((response) => {
        if (response.data.Status !== 1 && response.data.ErrorMessage) {
          dispatch({
            type: "ADD_CARD_DATA",
            error: response.data.ErrorMessage,
          });
        } else {
          let successMsg = obj.CardNo + " added Successfully";
          if (obj.IDNumber) {
            successMsg = obj.CardNo + " updated Successfully";
          }
          dispatch({
            type: "ADD_CARD_DATA",
            obj,
            successMsg,
            random: Math.random(),
          });
          dispatch(getCard(params));
        }
      });
  };
};

export const deleteCard = (obj) => {
  return (dispatch, getState) => {
    let params = getState().card.params;
    let CardNo = obj.CardNo;
    delete obj.CardNo;
    axios.post(apiEndPoints.deleteCard, obj, getHeaders).then((response) => {
      if (response.data.Status !== 1 && response.data.ErrorMessage) {
        dispatch({
          type: "DELETE_CARD_DATA",
          error: response.data.ErrorMessage,
        });
      } else {
        let successMsg = CardNo + " deleted Successfully";
        dispatch({
          type: "DELETE_CARD_DATA",
          obj,
          successMsg,
          random: Math.random(),
        });
        dispatch(getCard(params));
      }
    });
  };
};
