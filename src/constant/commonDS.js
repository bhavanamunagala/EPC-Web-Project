export const status = {
  REQUEST: 0,
  SUCCESS: 1,
  ERROR: 2,
};

export const apiResponsestatus = {
  SUCCESS: 1,
  FAILED: 0,
  AUTHFAILED: -1,
};

export const configurations = {
  ApiUrl: "http://122.170.10.70:8888/api",
};

export const getHeaders = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

export function hasRight(menuCode) {
  let Access = localStorage.getItem("userRole")
    ? JSON.parse(localStorage.getItem("userRole"))
    : [];
  let right = {};
  Access.map(
    (data, i) =>
      data?.SubMenus.length > 0 &&
      data?.SubMenus.map((d, index) => {
        if (d.FuncCode === menuCode) {
          right["AllowApproval"] = d.AllowApproval;
          right["AllowView"] = d.AllowView;
          right["AllowUpdate"] = d.AllowUpdate;
          right["AllowDelete"] = d.AllowDelete;
          right["AllowInsert"] = d.AllowInsert;
        }
        return null;
      })
  );
  return right;
}

export function Comparision(otherArray, compareKey) {
  console.log("otherArray", otherArray);
  return function (current) {
    return (
      otherArray.filter(function (other) {
        return other[compareKey] === current[compareKey];
      }).length === 0
    );
  };
}

export const apiEndPoints = {
  loginUser: configurations.ApiUrl + "/User/LoginUser",
  getUserRights: configurations.ApiUrl + "/GetUserRights",
  getCountryList: configurations.ApiUrl + "/Country/CountryList",
  createCountry: configurations.ApiUrl + "/Country/CreateOrUpdateCountry",
  deleteCountry: configurations.ApiUrl + "/Country/DeleteCountry",
  createCity: configurations.ApiUrl + "/City/CreateOrUpdateCity",
  getCityList: configurations.ApiUrl + "/City/CityList",
  deleteCity: configurations.ApiUrl + "/City/DeleteCity",
  getStateList: configurations.ApiUrl + "/State/StateList",
  deleteState: configurations.ApiUrl + "/State/DeleteState",
  createState: configurations.ApiUrl + "/State/CreateOrUpdateState",
  getDefaultRights: configurations.ApiUrl + "/User/GetDefaultRights",
  createRole: configurations.ApiUrl + "/User/CreateOrUpdateRole",
  deleteRole: configurations.ApiUrl + "/User/DeleteRole",
  getRoles: configurations.ApiUrl + "/User/Rolelist",

  getCardList: configurations.ApiUrl + "/Card/CardList",
  addCard: configurations.ApiUrl + "/Card/CreateOrUpdateCard",
  deleteCard: configurations.ApiUrl + "/Card/DeleteCard",
  getDistrictList: configurations.ApiUrl + "/District/DistrictList",
  createDistrict: configurations.ApiUrl + "/District/CreateOrUpdateDistrict",
  deleteDistrict: configurations.ApiUrl + "/District/DeleteDistrict",
  getItemList: configurations.ApiUrl + "/Item/ItemList",
  deleteItem: configurations.ApiUrl + "/Item/DeleteItem",
  addItem: configurations.ApiUrl + "/Item/CreateOrUpdateItem",
  getLocationList: configurations.ApiUrl + "/Location/LocationtList",
  deleteLocation: configurations.ApiUrl + "/Location/DeleteLocation",
  addLocation: configurations.ApiUrl + "/Location/CreateOrUpdateLocation",
  getItemGroup: configurations.ApiUrl + "/Item/AddItemDropDown",
  getProjectList: configurations.ApiUrl + "/Project/ProjectList",
  getDesignationList: configurations.ApiUrl + "/Designation/DesignationList",
  deleteDesignation: configurations.ApiUrl + "/Designation/DeleteDesignation",
  addDesignation:
    configurations.ApiUrl + "/Designation/CreateOrUpdateDesignation",
  getProjectMetaData: configurations.ApiUrl + "/Project/AddProjectDropDown",
  deleteProject: configurations.ApiUrl + "/Project/DeleteProject",
  addProject: configurations.ApiUrl + "/Project/CreateOrUpdateProject",
  getUserList: configurations.ApiUrl + "/User/GetAllUsers",
  addUser: configurations.ApiUrl + "/User/CreateOrUpdateUser",
  deleteUser: configurations.ApiUrl + "/User/DeleteUser",
  getVehicleList: configurations.ApiUrl + "/Vehicle/VehicleList",
  deleteVehicle: configurations.ApiUrl + "/Vehicle/DeleteVehicle",
  addVehicle: configurations.ApiUrl + "/Vehicle/CreateOrUpdateVehicle",
  getRoomList: configurations.ApiUrl + "/Room/RoomList",
  deleteRoom: configurations.ApiUrl + "/Room/DeleteRoom",
  addRoom: configurations.ApiUrl + "/Room/CreateOrUpdateRoom",

  getUserMetaList: configurations.ApiUrl + "/User/AddUserDropDown",
  getVehicleMetaList: configurations.ApiUrl + "/Vehicle/AddVehicleDropDown",
  getRoomMetaList: configurations.ApiUrl + "/Room/AddRoomDropDown",
  loginUserDropDown: configurations.ApiUrl + "/User/LoginUserDropDown",
  getEmployeeList: configurations.ApiUrl + "/User/GetAllEmployee",
  addEmployee: configurations.ApiUrl + "/User/CreateOrUpdateEmployee",
  getGroupRights: configurations.ApiUrl + "/GetAllRightsByRoleId",
  getPurchaseIndentList: configurations.ApiUrl + "/Indent/IndentList",
  getPurchaseIndentDropDown:
    configurations.ApiUrl + "/Indent/AddIndentDropDown",
  getPurchaseIndentById: configurations.ApiUrl + "/Indent/GetIndentMasterByID",
  addPurchaseIndent: configurations.ApiUrl + "/Indent/CreateOrUpdateIndent",
  deletePurchaseIndent: configurations.ApiUrl + "/Indent/DeleteIndent",
  getPurchaseOrderList: configurations.ApiUrl + "/PO/POList",
  getPurchaseOrderDropDown: configurations.ApiUrl + "/PO/AddPODropDown",
  getPurchaseOrderById: configurations.ApiUrl + "/PO/GetPOMasterByID",
  addPurchaseOrder: configurations.ApiUrl + "/PO/CreateOrUpdatePO",
  addPOAttchment:
    configurations.ApiUrl + "/PO/InsertUpdateOrDeleteAttachmentForPO",
  getPOAttchment: configurations.ApiUrl + "/PO/GetAllAttachmentByPOID",
  deletePurchaseOrder: configurations.ApiUrl + "/PO/DeletePO",
  getGRNList: configurations.ApiUrl + "/GRN/GRNList",
  getGRNDropDown: configurations.ApiUrl + "/GRN/AddGRNDropDown",
  getGRNById: configurations.ApiUrl + "/GRN/GetGRNByID",
  addGRN: configurations.ApiUrl + "/GRN/CreateOrUpdateGRN",
  deleteGRN: configurations.ApiUrl + "/GRN/DeleteGRN",
  getPurchaseBillList: configurations.ApiUrl + "/PV/PVList",
  getPurchaseBillDropDown: configurations.ApiUrl + "/PV/AddPVDropDown",
  getPurchaseBillById: configurations.ApiUrl + "/PV/GetPVMasterByID",
  addPurchaseBill: configurations.ApiUrl + "/PV/CreateOrUpdatePV",
  deletePurchaseBill: configurations.ApiUrl + "/PV/DeletePV",

  // Supplier :: start
  getSupplierList: configurations.ApiUrl + "/Supplier/SupplierList",
  getSupplierItemList: configurations.ApiUrl + "/Supplier/SupplierItemList",
  getSupplierMetaList:
    configurations.ApiUrl + "/Supplier/AddSupplierMasterDropDown",
  getSupplierById: configurations.ApiUrl + "/Supplier/GetSupplierMasterByID",
  addSupplier: configurations.ApiUrl + "/Supplier/CreateOrUpdateSupplier",
  deleteSupplier: configurations.ApiUrl + "/Supplier/DeleteSupplier",
  // Supplier :: end

  // Diesel :: start
  getDieselPurchaseList: configurations.ApiUrl + "/Diesel/DieselPurchaseList",
  getDieselPurchaseDropDown:
    configurations.ApiUrl + "/Diesel/AddDieselPurchaseDropDown",
  getDieselPurchaseById:
    configurations.ApiUrl + "/Diesel/GetDieselPurchaseByID",
  addDieselPurchase:
    configurations.ApiUrl + "/Diesel/CreateOrUpdateDieselPurchase",
  deleteDieselPurchase: configurations.ApiUrl + "/Diesel/DeleteDieselPurchase",

  getDieselIssueList: configurations.ApiUrl + "/Diesel/DieselIssueList",
  getDieselIssueDropDown:
    configurations.ApiUrl + "/Diesel/AddDieselIssueDropDown",
  getDieselIssueById: configurations.ApiUrl + "/Diesel/GetDieselIssueByID",
  addDieselIssue: configurations.ApiUrl + "/Diesel/CreateOrUpdateDieselIssue",
  deleteDieselIssue: configurations.ApiUrl + "/Diesel/DeleteDieselIssue",
  // Diesel :: end

  // Trip :: start
  getTripList: configurations.ApiUrl + "/Trip/TripMasterList",
  getTripDropDown: configurations.ApiUrl + "/Trip/AddTripMasterDropDown",
  getTripById: configurations.ApiUrl + "/Trip/GetTripMasterByID",
  addTrip: configurations.ApiUrl + "/Trip/CreateOrUpdateTripMaster",
  deleteTrip: configurations.ApiUrl + "/Trip/DeleteTripMaster",
  getTripAttchment: configurations.ApiUrl + "/Trip/GetAllAttachmentByTripID",
  addTripAttchment:
    configurations.ApiUrl + "/Trip/InsertUpdateOrDeleteAttachmentForTrip",
  // Trip :: end

  // Account  :: start
  getInsuranceList: configurations.ApiUrl + "/Insurance/InsuranceList",
  getInsuranceDropDown:
    configurations.ApiUrl + "/Insurance/AddInsuranceDropDown",
  getInsuranceById: configurations.ApiUrl + "/Insurance/GetInsuranceByID",
  addInsurance: configurations.ApiUrl + "/Insurance/CreateOrUpdateInsurance",
  deleteInsurance: configurations.ApiUrl + "/Insurance/DeleteInsurance",


  
  

  //Earning Master
  getEarningMasterList: configurations.ApiUrl + "/EarningMaster/EarningMasterList",
  getEarningMasterDropDown:
    configurations.ApiUrl + "/EarningMaster/AddEarningMasterDropDown",
    getEarningMasterById: configurations.ApiUrl + "/EarningMaster/GetEarningMasterByID",
    addEarningMaster: configurations.ApiUrl + "/EarningMaster/CreateOrUpdateEarningMaster",
    deleteEarningMaster: configurations.ApiUrl + "/EarningMaster/DeleteEarningMaster",

//Earning Master End


//Deduction Master
getDeductionMasterList: configurations.ApiUrl + "/DeductionMaster/DeductionMasterList",
getDeductionMasterDropDown:
  configurations.ApiUrl + "/DeductionMaster/AddDeductionMasterDropDown",
  getDeductionMasterById: configurations.ApiUrl + "/DeductionMaster/GetDeductionMasterByID",
  addDeductionMaster: configurations.ApiUrl + "/DeductionMaster/CreateOrUpdateDeductionMaster",
  deleteDeductionMaster: configurations.ApiUrl + "/DeductionMaster/DeleteDeductionMaster",

//Deduction Master End




//Salary Information start
getEmpSalaryInfoList: configurations.ApiUrl + "/EmpSalaryInfo/EmpSalaryInfoList",
getEmpSalaryInfoDropDown:
  configurations.ApiUrl + "/EmpSalaryInfo/AddEmpSalaryInfoDropDown",
  getEmpSalaryInfoById: configurations.ApiUrl + "/EmpSalaryInfo/GetEmpSalaryInfoByID",
  addEmpSalaryInfo: configurations.ApiUrl + "/EmpSalaryInfo/CreateOrUpdateEmpSalaryInfo",
  deleteEmpSalaryInfo: configurations.ApiUrl + "/EmpSalaryInfo/DeleteEmpSalaryInfo",

//Salary Information End

//Pay Slip Master start
getPaySlipMasterList: configurations.ApiUrl + "/PaySlipMaster/PaySlipMasterList",
getPaySlipMasterDropDown:
  configurations.ApiUrl + "/PaySlipMaster/AddPaySlipMasterDropDown",
  getPaySlipMasterById: configurations.ApiUrl + "/PaySlipMaster/GetPaySlipMasterByID",
  addPaySlipMaster: configurations.ApiUrl + "/PaySlipMaster/CreateOrUpdatePaySlipMaster",
  deletePaySlipMaster: configurations.ApiUrl + "/PaySlipMaster/DeletePaySlipMaster",

//Pay Slip Master End





//Project  Wise Attendance start
getProjectAttendanceMasterList: configurations.ApiUrl + "/ProjectAttendanceMaster/ProjectAttendanceMasterList",
getProjectAttendanceMasterDropDown:
  configurations.ApiUrl + "/ProjectAttendanceMaster/AddProjectAttendanceMasterDropDown",
  getProjectAttendanceMasterById: configurations.ApiUrl + "/ProjectAttendanceMaster/GetProjectAttendanceMasterByID",
  addProjectAttendanceMaster: configurations.ApiUrl + "/ProjectAttendanceMaster/CreateOrUpdateProjectAttendanceMaster",
  deleteProjectAttendanceMaster: configurations.ApiUrl + "/ProjectAttendanceMaster/DeleteProjectAttendanceMaster",

//Project Wise Attendance End



//Project  Wise Employee Binding start
getProjectEmpMasterList: configurations.ApiUrl + "/ProjectEmpMaster/ProjectEmpMasterList",
getProjectEmpMasterDropDown:
  configurations.ApiUrl + "/ProjectEmpMaster/AddProjectEmpMasterDropDown",
  getProjectEmpMasterById: configurations.ApiUrl + "/ProjectEmpMaster/GetProjectEmpMasterByID",
  addProjectEmpMaster: configurations.ApiUrl + "/ProjectEmpMaster/CreateOrUpdateProjectEmpMaster",
  deleteProjectEmpMaster: configurations.ApiUrl + "/ProjectEmpMaster/DeleteProjectEmpMaster",

//Project Wise Employee Binding End


//Employee Transfer start
getEmployeeTransferList: configurations.ApiUrl + "/EmployeeTransfer/EmployeeTransferList",
getEmployeeTransferDropDown:
  configurations.ApiUrl + "/EmployeeTransfer/AddEmployeeTransferDropDown",
  getEmployeeTransferById: configurations.ApiUrl + "/EmployeeTransfer/GetEmployeeTransferByID",
  addEmployeeTransfer: configurations.ApiUrl + "/EmployeeTransfer/CreateOrUpdateEmployeeTransfer",
  deleteEmployeeTransfer: configurations.ApiUrl + "/EmployeeTransfer/DeleteEmployeeTransfer",

//Employee Transfer End




//Holiday Master start
getHolidayMasterList: configurations.ApiUrl + "/HolidayMaster/HolidayMasterList",
getHolidayMasterDropDown:
  configurations.ApiUrl + "/HolidayMaster/AddHolidayMasterDropDown",
  getHolidayMasterById: configurations.ApiUrl + "/HolidayMaster/GetHolidayMasterByID",
  addHolidayMaster: configurations.ApiUrl + "/HolidayMaster/CreateOrUpdateHolidayMaster",
  deleteHolidayMaster: configurations.ApiUrl + "/HolidayMaster/DeleteHolidayMaster",

//Holiday Master End






//Leave Master start
getLeaveMasterList: configurations.ApiUrl + "/LeaveMaster/LeaveMasterList",
getLeaveMasterDropDown:
  configurations.ApiUrl + "/LeaveMaster/AddLeaveMasterDropDown",
  getLeaveMasterById: configurations.ApiUrl + "/LeaveMaster/GetLeaveMasterByID",
  addLeaveMaster: configurations.ApiUrl + "/LeaveMaster/CreateOrUpdateLeaveMaster",
  deleteLeaveMaster: configurations.ApiUrl + "/LeaveMaster/DeleteLeaveMaster",

//Leave Master End





//Leave Opening Master start
getLeaveOpeningMasterList: configurations.ApiUrl + "/LeaveOpeningMaster/LeaveOpeningMasterList",
getLeaveOpeningMasterDropDown:
  configurations.ApiUrl + "/LeaveOpeningMaster/AddLeaveOpeningMasterDropDown",
  getLeaveOpeningMasterById: configurations.ApiUrl + "/LeaveOpeningMaster/GetLeaveOpeningMasterByID",
  addLeaveOpeningMaster: configurations.ApiUrl + "/LeaveOpeningMaster/CreateOrUpdateLeaveOpeningMaster",
  deleteLeaveOpeningMaster: configurations.ApiUrl + "/LeaveOpeningMaster/DeleteLeaveOpeningMaster",

//Leave Opening Master End



//Leave Application start
getLeaveApplicationList: configurations.ApiUrl + "/LeaveApplication/LeaveApplicationList",
getLeaveApplicationDropDown:
  configurations.ApiUrl + "/LeaveApplication/AddLeaveApplicationDropDown",
  getLeaveApplicationById: configurations.ApiUrl + "/LeaveApplication/GetLeaveApplicationByID",
  addLeaveApplication: configurations.ApiUrl + "/LeaveApplication/CreateOrUpdateLeaveApplication",
  deleteLeaveApplication: configurations.ApiUrl + "/LeaveApplication/DeleteLeaveApplication",

//Leave Application End




  getInsuranceAttachment:
    configurations.ApiUrl + "/Insurance/GetAllAttachmentByInsuranceID",
  addInsuranceAttachment:
    configurations.ApiUrl +
    "/Insurance/InsertUpdateOrDeleteAttachmentForInsurance",

  getCashReceiptList: configurations.ApiUrl + "/CashReceipt/CashReceiptList",
  getCashReceiptDropDown:
    configurations.ApiUrl + "/CashReceipt/AddCashReceiptDropDown",
  getCashReceiptById: configurations.ApiUrl + "/CashReceipt/GetCashReceiptByID",
  addCashReceipt:
    configurations.ApiUrl + "/CashReceipt/CreateOrUpdateCashReceipt",
  deleteCashReceipt: configurations.ApiUrl + "/CashReceipt/DeleteCashReceipt",
  getCashReceiptAttachment:
    configurations.ApiUrl + "/CashReceipt/GetAllAttachmentByCashReceiptID",
  addCashReceiptAttchment:
    configurations.ApiUrl +
    "/CashReceipt/InsertUpdateOrDeleteAttachmentForCashReceipt",

  getCardReceiptList: configurations.ApiUrl + "/CardReceipt/CardReceiptList",
  getCardReceiptDropDown:
    configurations.ApiUrl + "/CardReceipt/AddCardReceiptDropDown",
  getCardReceiptById: configurations.ApiUrl + "/CardReceipt/GetCardReceiptByID",
  addCardReceipt:
    configurations.ApiUrl + "/CardReceipt/CreateOrUpdateCardReceipt",
  deleteCardReceipt: configurations.ApiUrl + "/CardReceipt/DeleteCardReceipt",
  getCardReceiptAttachment:
    configurations.ApiUrl + "/CashReceipt/GetAllAttachmentByCashReceiptID",
  addCardReceiptAttchment:
    configurations.ApiUrl +
    "/CashReceipt/InsertUpdateOrDeleteAttachmentForCashReceipt",

  getCashPaymentList: configurations.ApiUrl + "/CashPayment/CashPaymentList",
  getCashPaymentDropDown:
    configurations.ApiUrl + "/CashPayment/AddCashPaymentDropDown",
  getCashPaymentById: configurations.ApiUrl + "/CashPayment/GetCashPaymentByID",
  addCashPayment:
    configurations.ApiUrl + "/CashPayment/CreateOrUpdateCashPayment",
  deleteCashPayment: configurations.ApiUrl + "/CashPayment/DeleteCashPayment",
  getCashPaymentAttachment:
    configurations.ApiUrl + "/CashPayment/GetAllAttachmentByCashPaymentID",
  addCashPaymentAttchment:
    configurations.ApiUrl +
    "/CashPayment/InsertUpdateOrDeleteAttachmentForCashPayment",

  getCardPaymentList: configurations.ApiUrl + "/CardPayment/CardPaymentList",
  getCardPaymentDropDown:
    configurations.ApiUrl + "/CardPayment/AddCardPaymentDropDown",
  getCardPaymentById: configurations.ApiUrl + "/CardPayment/GetCardPaymentByID",
  addCardPayment:
    configurations.ApiUrl + "/CardPayment/CreateOrUpdateCardPayment",
  deleteCardPayment: configurations.ApiUrl + "/CardPayment/DeleteCardPayment",
  getCardPaymentAttachment:
    configurations.ApiUrl + "/CardPayment/GetAllAttachmentByCardPaymentID",
  addCardPaymentAttchment:
    configurations.ApiUrl +
    "/CardPayment/InsertUpdateOrDeleteAttachmentForCardPayment",

  getPaymentToContractorList:
    configurations.ApiUrl + "/PaymentToContractor/PaymentToContractorList",
  getPaymentToContractorDropDown:
    configurations.ApiUrl +
    "/PaymentToContractor/AddPaymentToContractorDropDown",
  getPaymentToContractorById:
    configurations.ApiUrl + "/PaymentToContractor/GetPaymentToContractorByID",
  addPaymentToContractor:
    configurations.ApiUrl +
    "/PaymentToContractor/CreateOrUpdatePaymentToContractor",
  deletePaymentToContractor:
    configurations.ApiUrl + "/PaymentToContractor/DeletePaymentToContractor",
  getPaymentToContractorAttachment:
    configurations.ApiUrl +
    "/PaymentToContractor/GetAllAttachmentByPaymentToContractorID",
  addPaymentToContractorAttchment:
    configurations.ApiUrl +
    "/PaymentToContractor/InsertUpdateOrDeleteAttachmentForPaymentToContractor",

  getLeagalPaymentList:
    configurations.ApiUrl + "/LeagalPayment/LeagalPaymentList",
  getLeagalPaymentDropDown:
    configurations.ApiUrl + "/LeagalPayment/AddLeagalPaymentDropDown",
  getLeagalPaymentById:
    configurations.ApiUrl + "/LeagalPayment/GetLeagalPaymentByID",
  addLeagalPayment:
    configurations.ApiUrl + "/LeagalPayment/CreateOrUpdateLeagalPayment",
  deleteLeagalPayment:
    configurations.ApiUrl + "/LeagalPayment/DeleteLeagalPayment",
  getLeagalPaymentAttachment:
    configurations.ApiUrl + "/LeagalPayment/GetAllAttachmentByLeagalPaymentID",
  addLeagalPaymentAttchment:
    configurations.ApiUrl +
    "/LeagalPayment/InsertUpdateOrDeleteAttachmentForLeagalPayment",

  getAccountMasterList: configurations.ApiUrl + "/Account/AccountList",
  getAccountMasterDropDown:
    configurations.ApiUrl + "/Account/AddAccountDropDown",
  getAccountMasterById: configurations.ApiUrl + "/Account/GetAccountByID",
  addAccountMaster: configurations.ApiUrl + "/Account/CreateOrUpdateAccount",
  deleteAccountMaster: configurations.ApiUrl + "/Account/DeleteAccount",

  getRentPaymentList: configurations.ApiUrl + "/RentPayment/RentPaymentList",
  getRentPaymentDropDown:
    configurations.ApiUrl + "/RentPayment/AddRentPaymentDropDown",
  getRentPaymentById: configurations.ApiUrl + "/RentPayment/GetRentPaymentByID",
  addRentPayment:
    configurations.ApiUrl + "/RentPayment/CreateOrUpdateRentPayment",
  deleteRentPayment: configurations.ApiUrl + "/RentPayment/DeleteRentPayment",
  getRentPaymentAttachment:
    configurations.ApiUrl + "/RentPayment/GetAllAttachmentByRentPaymentID",
  addRentPaymentAttchment:
    configurations.ApiUrl +
    "/RentPayment/InsertUpdateOrDeleteAttachmentForRentPayment",
  // Account  :: end

  // Contractor  :: start
  getWorkOrderList: configurations.ApiUrl + "/WorkOrder/WorkOrderList",
  getWorkOrderDropDown:
    configurations.ApiUrl + "/WorkOrder/AddWorkOrderDropDown",
  getWorkOrderById: configurations.ApiUrl + "/WorkOrder/GetWorkOrderByID",
  addWorkOrder: configurations.ApiUrl + "/WorkOrder/CreateOrUpdateWorkOrder",
  deleteWorkOrder: configurations.ApiUrl + "/WorkOrder/DeleteWorkOrder",
  getWorkOrderAttachment:
    configurations.ApiUrl + "/WorkOrder/GetAllAttachmentByWorkOrderID",
  addWorkOrderAttchment:
    configurations.ApiUrl +
    "/WorkOrder/InsertUpdateOrDeleteAttachmentForWorkOrder",

  getContractorBillList:
    configurations.ApiUrl + "/ContractorBill/ContractorBillList",
  getContractorBillDropDown:
    configurations.ApiUrl + "/ContractorBill/AddContractorBillDropDown",
  getContractorBillById:
    configurations.ApiUrl + "/ContractorBill/GetContractorBillByID",
  addContractorBill:
    configurations.ApiUrl + "/ContractorBill/CreateOrUpdateContractorBill",
  deleteContractorBill:
    configurations.ApiUrl + "/ContractorBill/DeleteContractorBill",
  getContractorBillAttachment:
    configurations.ApiUrl +
    "/ContractorBill/GetAllAttachmentByContractorBillID",
  addContractorBillAttchment:
    configurations.ApiUrl +
    "/ContractorBill/InsertUpdateOrDeleteAttachmentForContractorBill",

  getContractorAdvancedSettlementList:
    configurations.ApiUrl +
    "/ContractorAdvanceSettlement/ContractorAdvanceSettlementList",
  getContractorAdvancedSettlementDropDown:
    configurations.ApiUrl +
    "/ContractorAdvanceSettlement/AddContractorAdvanceSettlementDropDown",
  getContractorAdvancedSettlementById:
    configurations.ApiUrl +
    "/ContractorAdvanceSettlement/GetContractorAdvanceSettlementByID",
  addContractorAdvancedSettlement:
    configurations.ApiUrl +
    "/ContractorAdvanceSettlement/CreateOrUpdateContractorAdvanceSettlement",
  deleteContractorAdvancedSettlement:
    configurations.ApiUrl +
    "/ContractorAdvanceSettlement/DeleteContractorAdvanceSettlement",

  getContractorPaymentRequestList:
    configurations.ApiUrl +
    "/ContractorPaymentRequest/ContractorPaymentRequestList",
  getContractorPaymentRequestDropDown:
    configurations.ApiUrl +
    "/ContractorPaymentRequest/AddContractorPaymentRequestDropDown",
  getContractorPaymentRequestById:
    configurations.ApiUrl +
    "/ContractorPaymentRequest/GetContractorPaymentRequestByID",
  addContractorPaymentRequest:
    configurations.ApiUrl +
    "/ContractorPaymentRequest/CreateOrUpdateContractorPaymentRequest",
  deleteContractorPaymentRequest:
    configurations.ApiUrl +
    "/ContractorPaymentRequest/DeleteContractorPaymentRequest",

  // Contractor  :: end
};
