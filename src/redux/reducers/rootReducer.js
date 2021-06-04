import { combineReducers } from "redux";
import calenderReducer from "./calendar/";
import emailReducer from "./email/";
import chatReducer from "./chat/";
import todoReducer from "./todo/";
import customizer from "./customizer/";
import auth from "./auth/";
import navbar from "./navbar/Index";
import dataList from "./data-list/";
import roleReducer from "./Administration/role";
import SupplierReducer from "./Administration/supplier";
import CountryReducer from "./Administration/country";
import StateReducer from "./Administration/state";
import DistrictReducer from "./Administration/district";
import CityReducer from "./Administration/city";
import DesignationReducer from "./Administration/designation";
import UserReducer from "./Administration/user";
import EmployeeReducer from "./Administration/employee";
import ProjectReducer from "./Administration/project";
import LocationReducer from "./Administration/location";
import RoomReducer from "./Administration/room";
import CardReducer from "./Administration/card";
import ItemReducer from "./Administration/item";
import VehicleReducer from "./Administration/vehicle";
import PurchaseIndentReducer from "./Purchase/PurchaseIndent";
import PurchaseOrderReducer from "./Purchase/PurchaseOrder";
import GRNReducer from "./Purchase/GRN";
import PurchaseBillReducer from "./Purchase/PurchaseBill";
import DieselPurchaseReducer from "./Diesel/DieselPurchase";
import DieselIssueReducer from "./Diesel/DieselIssue";
import TripReducer from "./Trip/TripMaster";
import InsuranceReducer from "./Account/Insurance";
import AccountMasterReducer from "./Account/AccountMaster";
import CashReceiptReducer from "./Account/CashReceipt";
import CashPaymentReducer from "./Account/CashPayment";
import CardReceiptReducer from "./Account/CardReceipt";
import CardPaymentReducer from "./Account/CardPayment";
import LeagalPaymentReducer from "./Account/LeagalPayment";
import PaymentToContractorReducer from "./Account/PaymentToContractor";
import RentPaymentReducer from "./Account/RentPayment";
import ContractorBillReducer from "./Contractor/ContractorBill";
import ContractorPaymentRequestReducer from "./Contractor/ContractorPaymentRequest";
import WorkOrderReducer from "./Contractor/WorkOrder";
import EarningMasterReducer from "./HR/EarningMaster";
import DeductionMasterReducer from "./HR/DeductionMaster";
import EmpSalaryInfoReducer from "./HR/SalaryInformation";
import PaySlipMasterReducer from "./HR/PayslipMonth";
import ProjectAttendanceMasterReducer from "./HR/ProjectWiseAttendance";
import ProjectEmpMasterReducer from "./HR/EmployeeAndProjectBinding";
//import HolidayMasterReducer from "./HR/HolidayMaster";
import LeaveMasterReducer from "./HR/LeaveMaster";
import LeaveApprovalReducer from "./HR/LeaveApproval";
import EmployeeTransferReducer from "./HR/EmployeeTransfer";
import ContractorAdvancedSettlementReducer from "./Contractor/ContractorAdvancedSettlement";

const rootReducer = combineReducers({
  calendar: calenderReducer,
  emailApp: emailReducer,
  todoApp: todoReducer,
  chatApp: chatReducer,
  customizer: customizer,
  auth: auth,
  navbar: navbar,
  dataList: dataList,
  country: CountryReducer,
  state: StateReducer,
  district: DistrictReducer,
  city: CityReducer,
  designation: DesignationReducer,
  roles: roleReducer,
  user: UserReducer,
  employee: EmployeeReducer,
  project: ProjectReducer,
  location: LocationReducer,
  room: RoomReducer,
  card: CardReducer,
  item: ItemReducer,
  vehicle: VehicleReducer,
  supplier: SupplierReducer,
  purchaseIndent: PurchaseIndentReducer,
  purchaseOrder: PurchaseOrderReducer,
  grn: GRNReducer,
  purchaseBill: PurchaseBillReducer,
  dieselPurchase: DieselPurchaseReducer,
  dieselIssue: DieselIssueReducer,
  trip: TripReducer,

  // Account Module
  insurance: InsuranceReducer,
  accountMaster: AccountMasterReducer,
  cashReceipt: CashReceiptReducer,
  cashPayment: CashPaymentReducer,
  cardReceipt: CardReceiptReducer,
  cardPayment: CardPaymentReducer,
  leagalPayment: LeagalPaymentReducer,
  paymentToContractor: PaymentToContractorReducer,
  rentPayment: RentPaymentReducer,

  //Contractor Module
  contractorBill: ContractorBillReducer,
  contractorPaymentRequest: ContractorPaymentRequestReducer,
  workOrder: WorkOrderReducer,
  contractorAdvancedSettlement: ContractorAdvancedSettlementReducer,

  //HR Module
earningMaster: EarningMasterReducer,
deductionMaster: DeductionMasterReducer,
empSalaryInfo: EmpSalaryInfoReducer,
paySlipMaster: PaySlipMasterReducer,
projectAttendanceMaster: ProjectAttendanceMasterReducer,
projectEmpMaster: ProjectEmpMasterReducer,
employeeTransfer: EmployeeTransferReducer,
//holidayMaster: HolidayMasterReducer,

leaveMaster: LeaveMasterReducer,
leaveApproval:LeaveApprovalReducer,


});

export default rootReducer;
