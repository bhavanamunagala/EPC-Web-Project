import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import knowledgeBaseCategory from "./views/pages/knowledge-base/Category";
import knowledgeBaseQuestion from "./views/pages/knowledge-base/Questions";
import { ContextLayout } from "./utility/context/Layout";
import { hasRight } from "./constant/commonDS";

// Route-based code splitting
const analyticsDashboard = lazy(() =>
  import("./views/dashboard/analytics/AnalyticsDashboard")
);
const ecommerceDashboard = lazy(() =>
  import("./views/dashboard/ecommerce/EcommerceDashboard")
);
const email = lazy(() => import("./views/apps/email/Email"));
const chat = lazy(() => import("./views/apps/chat/Chat"));
const todo = lazy(() => import("./views/apps/todo/Todo"));
const calendar = lazy(() => import("./views/apps/calendar/Calendar"));
const shop = lazy(() => import("./views/apps/ecommerce/shop/Shop"));
const wishlist = lazy(() => import("./views/apps/ecommerce/wishlist/Wishlist"));
const checkout = lazy(() => import("./views/apps/ecommerce/cart/Cart"));
const productDetail = lazy(() =>
  import("./views/apps/ecommerce/detail/Detail")
);
const grid = lazy(() => import("./views/ui-elements/grid/Grid"));
const typography = lazy(() =>
  import("./views/ui-elements/typography/Typography")
);
const textutilities = lazy(() =>
  import("./views/ui-elements/text-utilities/TextUtilities")
);
const syntaxhighlighter = lazy(() =>
  import("./views/ui-elements/syntax-highlighter/SyntaxHighlighter")
);
const colors = lazy(() => import("./views/ui-elements/colors/Colors"));
const reactfeather = lazy(() =>
  import("./views/ui-elements/icons/FeatherIcons")
);
const basicCards = lazy(() => import("./views/ui-elements/cards/basic/Cards"));
const statisticsCards = lazy(() =>
  import("./views/ui-elements/cards/statistics/StatisticsCards")
);
const analyticsCards = lazy(() =>
  import("./views/ui-elements/cards/analytics/Analytics")
);
const actionCards = lazy(() =>
  import("./views/ui-elements/cards/actions/CardActions")
);
const Alerts = lazy(() => import("./components/reactstrap/alerts/Alerts"));
const Buttons = lazy(() => import("./components/reactstrap/buttons/Buttons"));
const Breadcrumbs = lazy(() =>
  import("./components/reactstrap/breadcrumbs/Breadcrumbs")
);
const Carousel = lazy(() =>
  import("./components/reactstrap/carousel/Carousel")
);
const Collapse = lazy(() =>
  import("./components/reactstrap/collapse/Collapse")
);
const Dropdowns = lazy(() =>
  import("./components/reactstrap/dropdowns/Dropdown")
);
const ListGroup = lazy(() =>
  import("./components/reactstrap/listGroup/ListGroup")
);
const Modals = lazy(() => import("./components/reactstrap/modal/Modal"));
const Pagination = lazy(() =>
  import("./components/reactstrap/pagination/Pagination")
);
const NavComponent = lazy(() =>
  import("./components/reactstrap/navComponent/NavComponent")
);
const Navbar = lazy(() => import("./components/reactstrap/navbar/Navbar"));
const Tabs = lazy(() => import("./components/reactstrap/tabs/Tabs"));
const TabPills = lazy(() =>
  import("./components/reactstrap/tabPills/TabPills")
);
const Tooltips = lazy(() =>
  import("./components/reactstrap/tooltips/Tooltips")
);
const Popovers = lazy(() =>
  import("./components/reactstrap/popovers/Popovers")
);
const Badge = lazy(() => import("./components/reactstrap/badge/Badge"));
const BadgePill = lazy(() =>
  import("./components/reactstrap/badgePills/BadgePill")
);
const Progress = lazy(() =>
  import("./components/reactstrap/progress/Progress")
);
const Media = lazy(() => import("./components/reactstrap/media/MediaObject"));
const Spinners = lazy(() =>
  import("./components/reactstrap/spinners/Spinners")
);
const Toasts = lazy(() => import("./components/reactstrap/toasts/Toasts"));
const avatar = lazy(() => import("./components/@vuexy/avatar/Avatar"));
const AutoComplete = lazy(() =>
  import("./components/@vuexy/autoComplete/AutoComplete")
);
const chips = lazy(() => import("./components/@vuexy/chips/Chips"));
const divider = lazy(() => import("./components/@vuexy/divider/Divider"));
const vuexyWizard = lazy(() => import("./components/@vuexy/wizard/Wizard"));
const listView = lazy(() => import("./views/ui-elements/data-list/ListView"));

const thumbView = lazy(() => import("./views/ui-elements/data-list/ThumbView"));
const select = lazy(() => import("./views/forms/form-elements/select/Select"));
const switchComponent = lazy(() =>
  import("./views/forms/form-elements/switch/Switch")
);
const checkbox = lazy(() =>
  import("./views/forms/form-elements/checkboxes/Checkboxes")
);
const radio = lazy(() => import("./views/forms/form-elements/radio/Radio"));
const input = lazy(() => import("./views/forms/form-elements/input/Input"));
const group = lazy(() =>
  import("./views/forms/form-elements/input-groups/InputGoups")
);
const numberInput = lazy(() =>
  import("./views/forms/form-elements/number-input/NumberInput")
);
const textarea = lazy(() =>
  import("./views/forms/form-elements/textarea/Textarea")
);
const pickers = lazy(() =>
  import("./views/forms/form-elements/datepicker/Pickers")
);
const inputMask = lazy(() =>
  import("./views/forms/form-elements/input-mask/InputMask")
);
const layout = lazy(() => import("./views/forms/form-layouts/FormLayouts"));
const formik = lazy(() => import("./views/forms/formik/Formik"));
const tables = lazy(() => import("./views/tables/reactstrap/Tables"));
const ReactTables = lazy(() =>
  import("./views/tables/react-tables/ReactTables")
);
const Aggrid = lazy(() => import("./views/tables/aggrid/Aggrid"));
const DataTable = lazy(() => import("./views/tables/data-tables/DataTables"));
const profile = lazy(() => import("./views/pages/profile/Profile"));
const faq = lazy(() => import("./views/pages/faq/FAQ"));
const knowledgeBase = lazy(() =>
  import("./views/pages/knowledge-base/KnowledgeBase")
);
const search = lazy(() => import("./views/pages/search/Search"));
const accountSettings = lazy(() =>
  import("./views/pages/account-settings/AccountSettings")
);
const invoice = lazy(() => import("./views/pages/invoice/Invoice"));
const comingSoon = lazy(() => import("./views/pages/misc/ComingSoon"));
const error404 = lazy(() => import("./views/pages/misc/error/404"));
const error500 = lazy(() => import("./views/pages/misc/error/500"));
const authorized = lazy(() => import("./views/pages/misc/NotAuthorized"));
const maintenance = lazy(() => import("./views/pages/misc/Maintenance"));
const apex = lazy(() => import("./views/charts/apex/ApexCharts"));
const chartjs = lazy(() => import("./views/charts/chart-js/ChartJS"));
const extreme = lazy(() => import("./views/charts/recharts/Recharts"));
const leafletMaps = lazy(() => import("./views/maps/Maps"));
const toastr = lazy(() => import("./extensions/toastify/Toastify"));
const sweetAlert = lazy(() => import("./extensions/sweet-alert/SweetAlert"));
const rcSlider = lazy(() => import("./extensions/rc-slider/Slider"));
const uploader = lazy(() => import("./extensions/dropzone/Dropzone"));
const editor = lazy(() => import("./extensions/editor/Editor"));
const drop = lazy(() => import("./extensions/drag-and-drop/DragAndDrop"));
const tour = lazy(() => import("./extensions/tour/Tour"));
const clipboard = lazy(() =>
  import("./extensions/copy-to-clipboard/CopyToClipboard")
);
const menu = lazy(() => import("./extensions/contexify/Contexify"));
const swiper = lazy(() => import("./extensions/swiper/Swiper"));
const i18n = lazy(() => import("./extensions/i18n/I18n"));
const reactPaginate = lazy(() => import("./extensions/pagination/Pagination"));
const tree = lazy(() => import("./extensions/treeview/TreeView"));
const Import = lazy(() => import("./extensions/import-export/Import"));
const Export = lazy(() => import("./extensions/import-export/Export"));
const ExportSelected = lazy(() =>
  import("./extensions/import-export/ExportSelected")
);
const userList = lazy(() => import("./views/apps/user/list/List"));
const userEdit = lazy(() => import("./views/apps/user/edit/Edit"));
const userView = lazy(() => import("./views/apps/user/view/View"));
const Login = lazy(() => import("./views/pages/authentication/login/Login"));
const forgotPassword = lazy(() =>
  import("./views/pages/authentication/ForgotPassword")
);
const lockScreen = lazy(() =>
  import("./views/pages/authentication/LockScreen")
);
const resetPassword = lazy(() =>
  import("./views/pages/authentication/ResetPassword")
);
// const register = lazy(() =>
//   import("./views/pages/authentication/register/Register")
// )
const accessControl = lazy(() =>
  import("./extensions/access-control/AccessControl")
);

//Custom menus paths
const countryView = lazy(() =>
  import("./views/modules/Administration/Country/country")
);

const stateView = lazy(() =>
  import("./views/modules/Administration//State/state")
);

const districtView = lazy(() =>
  import("./views/modules/Administration/District/district")
);

const cityView = lazy(() => import("./views/modules/Administration/City/city"));

const roleView = lazy(() => import("./views/modules/Administration/Role/role"));
const addRoleView = lazy(() =>
  import("./views/modules/Administration/Role/addRole")
);

const locationView = lazy(() =>
  import("./views/modules/Administration/Location/location")
);

const designationView = lazy(() =>
  import("./views/modules/Administration/Designation/designation")
);

const cardView = lazy(() => import("./views/modules/Administration/Card/card"));

const supplierView = lazy(() =>
  import("./views/modules/Administration/Supplier/supplier")
);
const supplierNewView = lazy(() =>
  import("./views/modules/Administration/Supplier/supplierNew")
);

const itemView = lazy(() => import("./views/modules/Administration/Item/item"));
const itemNewView = lazy(() =>
  import("./views/modules/Administration/Item/itemNew")
);

const vehicleView = lazy(() =>
  import("./views/modules/Administration/Vehicle/vehicle")
);
const vehicleNewView = lazy(() =>
  import("./views/modules/Administration/Vehicle/vehicleNew")
);

const employeeView = lazy(() =>
  import("./views/modules/Administration/Employee/employee")
);
const employeeNewView = lazy(() =>
  import("./views/modules/Administration/Employee/employeeNew")
);

const userDataView = lazy(() =>
  import("./views/modules/Administration/User/user")
);
const userNewDataView = lazy(() =>
  import("./views/modules/Administration/User/userNew")
);

const roomView = lazy(() => import("./views/modules/Administration/Room/room"));
const roomNewView = lazy(() =>
  import("./views/modules/Administration/Room/roomNew")
);

const projectView = lazy(() =>
  import("./views/modules/Administration/Project/project")
);
const projectNewView = lazy(() =>
  import("./views/modules/Administration/Project/projectNew")
);

// custom Components
const PurchaseIndent = lazy(() =>
  import("./views/modules/Purchase/PurchaseIndent")
);
const PurchaseIndentNew = lazy(() =>
  import("./views/modules/Purchase/PurchaseIndent/PurchaseIndentNew")
);
const PurchaseOrder = lazy(() =>
  import("./views/modules/Purchase/PurchaseOrder")
);
const PurchaseOrderNew = lazy(() =>
  import("./views/modules/Purchase/PurchaseOrder/PurchaseOrderNew")
);
const GRN = lazy(() => import("./views/modules/Purchase/GRN"));
const GRNNew = lazy(() => import("./views/modules/Purchase/GRN/GRNNew"));

// Set Layout and Component Using App Route
const RouteConfig = ({ component: Component, fullLayout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <ContextLayout.Consumer>
            {(context) => {
              let LayoutTag =
                fullLayout === true
                  ? context.fullLayout
                  : context.state.activeLayout === "horizontal"
                  ? context.horizontalLayout
                  : context.VerticalLayout;
              return (
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              );
            }}
          </ContextLayout.Consumer>
        );
      }}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    let COUNTRYMSTAccess = hasRight("COUNTRYMST"),
      STATEMSTAccess = hasRight("STATEMST"),
      DISTMSTAccess = hasRight("DISTMST"),
      CITYMSTAccess = hasRight("CITYMST"),
      DSGAccess = hasRight("DSG"),
      ROLEAccess = hasRight("ROLE"),
      USEAccess = hasRight("USE"),
      EMPMSTAccess = hasRight("EMPMST"),
      PRJAccess = hasRight("PRJ"),
      LOCAccess = hasRight("LOC"),
      ROOMAccess = hasRight("ROOM"),
      ITEMAccess = hasRight("ITEM"),
      CARDAccess = hasRight("CARD"),
      VHMAccess = hasRight("VHM"),
      SUPAccess = hasRight("SUP"),
      PUR_DSLAccess = hasRight("PUR_DSL"),
      ISS_DSLAccess = hasRight("ISS_DSL"),
      INDAccess = hasRight("IND"),
      PUR_ORDAccess = hasRight("PUR_ORD"),
      GRNAccess = hasRight("GRN"),
      PUR_BILLAccess = hasRight("PUR_BILL"),
      TPAccess = hasRight("TP"),
      ACC_INSAccess = hasRight("ACC_INS"),
      ACC_CSRAccess = hasRight("ACC_CSR"),
      ACC_CRRAccess = hasRight("ACC_CRR"),
      ACC_CSPAccess = hasRight("ACC_CSP"),
      ACC_CRPAccess = hasRight("ACC_CRP"),
      ACC_PTCAccess = hasRight("ACC_PTC"),
      ACC_LPAccess = hasRight("ACC_LP"),
      ACC_MAccess = hasRight("ACC_M"),
      ACC_RPAccess = hasRight("ACC_RP"),
      CON_WOAccess = hasRight("CON_WO"),
      CON_BILLAccess = hasRight("CON_BILL"),
      CON_PRAccess = hasRight("CON_PR"),
      CON_ASAccess = hasRight("CON_AS"),
      HR_EMAccess = hasRight("HR_EM"),
      HR_DMAccess = hasRight("HR_DM"),
      HR_SLAccess = hasRight("HR_SL"),
      HR_PMAccess = hasRight("HR_PM"),
      HR_APAccess = hasRight("HR_AP"),
      HR_PWAAccess = hasRight("HR_PWA"),
      HR_EPBAccess = hasRight("HR_EPB"),
      HR_ETAccess = hasRight("HR_ET"),
      HR_HMAccess = hasRight("HR_HM"),
      HR_LMAccess = hasRight("HR_LM"),
      HR_LOAccess = hasRight("HR_LO"),
      HR_LAAccess = hasRight("HR_LA"),
      HR_LAPAccess = hasRight("HR_LAP");

    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={analyticsDashboard} />
          <AppRoute
            path="/ecommerce-dashboard"
            component={ecommerceDashboard}
          />
          <AppRoute
            path="/email"
            exact
            component={() => <Redirect to="/email/inbox" />}
          />
          <AppRoute path="/email/:filter" component={email} />
          <AppRoute path="/chat" component={chat} />
          <AppRoute
            path="/todo"
            exact
            component={() => <Redirect to="/todo/all" />}
          />
          <AppRoute path="/todo/:filter" component={todo} />
          <AppRoute path="/calendar" component={calendar} />
          <AppRoute path="/ecommerce/shop" component={shop} />
          <AppRoute path="/ecommerce/wishlist" component={wishlist} />
          <AppRoute
            path="/ecommerce/product-detail"
            component={productDetail}
          />
          <AppRoute
            path="/ecommerce/checkout"
            component={checkout}
            permission="admin"
          />
          <AppRoute path="/data-list/list-view" component={listView} />
          <AppRoute path="/data-list/thumb-view" component={thumbView} />
          <AppRoute path="/ui-element/grid" component={grid} />
          <AppRoute path="/ui-element/typography" component={typography} />
          <AppRoute
            path="/ui-element/textutilities"
            component={textutilities}
          />
          <AppRoute
            path="/ui-element/syntaxhighlighter"
            component={syntaxhighlighter}
          />
          <AppRoute path="/colors/colors" component={colors} />
          <AppRoute path="/icons/reactfeather" component={reactfeather} />
          <AppRoute path="/cards/basic" component={basicCards} />
          <AppRoute path="/cards/statistics" component={statisticsCards} />
          <AppRoute path="/cards/analytics" component={analyticsCards} />
          <AppRoute path="/cards/action" component={actionCards} />
          <AppRoute path="/components/alerts" component={Alerts} />
          <AppRoute path="/components/buttons" component={Buttons} />
          <AppRoute path="/components/breadcrumbs" component={Breadcrumbs} />
          <AppRoute path="/components/carousel" component={Carousel} />
          <AppRoute path="/components/collapse" component={Collapse} />
          <AppRoute path="/components/dropdowns" component={Dropdowns} />
          <AppRoute path="/components/list-group" component={ListGroup} />
          <AppRoute path="/components/modals" component={Modals} />
          <AppRoute path="/components/pagination" component={Pagination} />
          <AppRoute path="/components/nav-component" component={NavComponent} />
          <AppRoute path="/components/navbar" component={Navbar} />
          <AppRoute path="/components/tabs-component" component={Tabs} />
          <AppRoute path="/components/pills-component" component={TabPills} />
          <AppRoute path="/components/tooltips" component={Tooltips} />
          <AppRoute path="/components/popovers" component={Popovers} />
          <AppRoute path="/components/badges" component={Badge} />
          <AppRoute path="/components/pill-badges" component={BadgePill} />
          <AppRoute path="/components/progress" component={Progress} />
          <AppRoute path="/components/media-objects" component={Media} />
          <AppRoute path="/components/spinners" component={Spinners} />
          <AppRoute path="/components/toasts" component={Toasts} />
          <AppRoute
            path="/extra-components/auto-complete"
            component={AutoComplete}
          />
          <AppRoute path="/extra-components/avatar" component={avatar} />
          <AppRoute path="/extra-components/chips" component={chips} />
          <AppRoute path="/extra-components/divider" component={divider} />
          <AppRoute path="/forms/wizard" component={vuexyWizard} />
          <AppRoute path="/forms/elements/select" component={select} />
          <AppRoute path="/forms/elements/switch" component={switchComponent} />
          <AppRoute path="/forms/elements/checkbox" component={checkbox} />
          <AppRoute path="/forms/elements/radio" component={radio} />
          <AppRoute path="/forms/elements/input" component={input} />
          <AppRoute path="/forms/elements/input-group" component={group} />
          <AppRoute
            path="/forms/elements/number-input"
            component={numberInput}
          />
          <AppRoute path="/forms/elements/textarea" component={textarea} />
          <AppRoute path="/forms/elements/pickers" component={pickers} />
          <AppRoute path="/forms/elements/input-mask" component={inputMask} />
          <AppRoute path="/forms/layout/form-layout" component={layout} />
          <AppRoute path="/forms/formik" component={formik} />
          <AppRoute path="/tables/reactstrap" component={tables} />
          <AppRoute path="/tables/react-tables" component={ReactTables} />
          <AppRoute path="/tables/agGrid" component={Aggrid} />
          <AppRoute path="/tables/data-tables" component={DataTable} />
          <AppRoute path="/pages/profile" component={profile} />
          <AppRoute path="/pages/faq" component={faq} />
          <AppRoute
            path="/pages/knowledge-base"
            component={knowledgeBase}
            exact
          />
          <AppRoute
            path="/pages/knowledge-base/category"
            component={knowledgeBaseCategory}
            exact
          />
          <AppRoute
            path="/pages/knowledge-base/category/questions"
            component={knowledgeBaseQuestion}
          />
          <AppRoute path="/pages/search" component={search} />
          <AppRoute
            path="/pages/account-settings"
            component={accountSettings}
          />
          <AppRoute path="/pages/invoice" component={invoice} />
          <AppRoute
            path="/misc/coming-soon"
            component={comingSoon}
            fullLayout
          />
          <AppRoute path="/misc/error/404" component={error404} fullLayout />
          <AppRoute path="/login" component={Login} fullLayout />
          <AppRoute
            path="/pages/forgot-password"
            component={forgotPassword}
            fullLayout
          />
          <AppRoute
            path="/pages/lock-screen"
            component={lockScreen}
            fullLayout
          />
          <AppRoute
            path="/pages/reset-password"
            component={resetPassword}
            fullLayout
          />
          <AppRoute path="/misc/error/500" component={error500} fullLayout />
          <AppRoute
            path="/misc/not-authorized"
            component={authorized}
            fullLayout
          />
          <AppRoute
            path="/misc/maintenance"
            component={maintenance}
            fullLayout
          />
          <AppRoute path="/app/user/list" component={userList} />
          <AppRoute path="/app/user/edit" component={userEdit} />
          <AppRoute path="/app/user/view" component={userView} />
          <AppRoute path="/charts/apex" component={apex} />
          <AppRoute path="/charts/chartjs" component={chartjs} />
          <AppRoute path="/charts/recharts" component={extreme} />
          <AppRoute path="/maps/leaflet" component={leafletMaps} />
          <AppRoute path="/extensions/sweet-alert" component={sweetAlert} />
          <AppRoute path="/extensions/toastr" component={toastr} />
          <AppRoute path="/extensions/slider" component={rcSlider} />
          <AppRoute path="/extensions/file-uploader" component={uploader} />
          <AppRoute path="/extensions/wysiwyg-editor" component={editor} />
          <AppRoute path="/extensions/drag-and-drop" component={drop} />
          <AppRoute path="/extensions/tour" component={tour} />
          <AppRoute path="/extensions/clipboard" component={clipboard} />
          <AppRoute path="/extensions/context-menu" component={menu} />
          <AppRoute path="/extensions/swiper" component={swiper} />
          <AppRoute
            path="/extensions/access-control"
            component={accessControl}
          />
          <AppRoute path="/extensions/i18n" component={i18n} />
          <AppRoute path="/extensions/tree" component={tree} />
          <AppRoute path="/extensions/import" component={Import} />
          <AppRoute path="/extensions/export" component={Export} />
          <AppRoute
            path="/extensions/export-selected"
            component={ExportSelected}
          />
          <AppRoute path="/extensions/pagination" component={reactPaginate} />

          {/* custom Routes */}

          {/* Administration :: Start */}

          {COUNTRYMSTAccess.AllowView ? (
            <AppRoute
              path="/Administrator/CountryMaster"
              component={countryView}
            />
          ) : (
            ""
          )}

          {STATEMSTAccess.AllowView ? (
            <AppRoute path="/Administrator/StateMaster" component={stateView} />
          ) : (
            ""
          )}

          {DISTMSTAccess.AllowView ? (
            <AppRoute
              path="/Administrator/DistrictMaster"
              component={districtView}
            />
          ) : (
            ""
          )}

          {CITYMSTAccess.AllowView ? (
            <AppRoute path="/Administrator/CityMaster" component={cityView} />
          ) : (
            ""
          )}

          {DSGAccess.AllowView ? (
            <AppRoute
              path="/Administrator/DesignationMaster"
              component={designationView}
            />
          ) : (
            ""
          )}

          {ROLEAccess.AllowView ? (
            <AppRoute
              path="/Administrator/RoleMaster"
              component={roleView}
              exact
            />
          ) : (
            ""
          )}
          {ROLEAccess.AllowInsert ? (
            <AppRoute
              path="/Administrator/RoleMaster/new"
              component={addRoleView}
              exact
            />
          ) : (
            ""
          )}
          {ROLEAccess.AllowUpdate ? (
            <AppRoute
              path="/Administrator/RoleMaster/edit/:id"
              component={addRoleView}
              exact
            />
          ) : (
            ""
          )}

          {USEAccess.AllowView ? (
            <AppRoute
              path="/Administrator/UserMaster"
              component={userDataView}
              exact
            />
          ) : (
            ""
          )}
          {USEAccess.AllowInsert ? (
            <AppRoute
              path="/Administrator/UserMaster/new"
              component={userNewDataView}
              exact
            />
          ) : (
            ""
          )}
          {USEAccess.AllowUpdate ? (
            <AppRoute
              path="/Administrator/UserMaster/edit/:id"
              component={userNewDataView}
              exact
            />
          ) : (
            ""
          )}

          {EMPMSTAccess.AllowView ? (
            <AppRoute
              path="/Administrator/EmployeeMaster"
              component={employeeView}
              exact
            />
          ) : (
            ""
          )}
          {EMPMSTAccess.AllowInsert ? (
            <AppRoute
              path="/Administrator/EmployeeMaster/new"
              component={employeeNewView}
              exact
            />
          ) : (
            ""
          )}
          {EMPMSTAccess.AllowUpdate ? (
            <AppRoute
              path="/Administrator/EmployeeMaster/edit/:id"
              component={employeeNewView}
              exact
            />
          ) : (
            ""
          )}

          {PRJAccess.AllowView ? (
            <AppRoute
              path="/Administrator/ProjectMaster"
              component={projectView}
              exact
            />
          ) : (
            ""
          )}
          {PRJAccess.AllowInsert ? (
            <AppRoute
              path="/Administrator/ProjectMaster/new"
              component={projectNewView}
              exact
            />
          ) : (
            ""
          )}
          {PRJAccess.AllowUpdate ? (
            <AppRoute
              path="/Administrator/ProjectMaster/edit/:id"
              component={projectNewView}
              exact
            />
          ) : (
            ""
          )}

          {LOCAccess.AllowView ? (
            <AppRoute
              path="/Administrator/LocationMaster"
              component={locationView}
            />
          ) : (
            ""
          )}
          {ROOMAccess.AllowView ? (
            <AppRoute
              path="/Administrator/RoomMaster"
              component={roomView}
              exact
            />
          ) : (
            ""
          )}
          {ROOMAccess.AllowInsert ? (
            <AppRoute
              path="/Administrator/RoomMaster/new"
              component={roomNewView}
              exact
            />
          ) : (
            ""
          )}
          {ROOMAccess.AllowUpdate ? (
            <AppRoute
              path="/Administrator/RoomMaster/edit/:id"
              component={roomNewView}
              exact
            />
          ) : (
            ""
          )}

          {ITEMAccess.AllowView ? (
            <AppRoute
              path="/Administrator/ItemMaster"
              component={itemView}
              exact
            />
          ) : (
            ""
          )}
          {ITEMAccess.AllowInsert ? (
            <AppRoute
              path="/Administrator/ItemMaster/new"
              component={itemNewView}
              exact
            />
          ) : (
            ""
          )}
          {ITEMAccess.AllowUpdate ? (
            <AppRoute
              path="/Administrator/ItemMaster/edit/:id"
              component={itemNewView}
              exact
            />
          ) : (
            ""
          )}

          {CARDAccess.AllowView ? (
            <AppRoute path="/Administrator/CardMaster" component={cardView} />
          ) : (
            ""
          )}

          {VHMAccess.AllowView ? (
            <AppRoute
              path="/Administrator/VehicleMaster"
              component={vehicleView}
              exact
            />
          ) : (
            ""
          )}
          {VHMAccess.AllowInsert ? (
            <AppRoute
              path="/Administrator/VehicleMaster/new"
              component={vehicleNewView}
              exact
            />
          ) : (
            ""
          )}
          {VHMAccess.AllowUpdate ? (
            <AppRoute
              path="/Administrator/VehicleMaster/edit/:id"
              component={vehicleNewView}
              exact
            />
          ) : (
            ""
          )}

          {SUPAccess.AllowView ? (
            <AppRoute
              path="/Administrator/SupplierMaster"
              component={supplierView}
              exact
            />
          ) : (
            ""
          )}
          {SUPAccess.AllowInsert ? (
            <AppRoute
              path="/Administrator/SupplierMaster/new"
              component={supplierNewView}
              exact
            />
          ) : (
            ""
          )}
          {SUPAccess.AllowUpdate ? (
            <AppRoute
              path="/Administrator/SupplierMaster/edit/:id"
              component={supplierNewView}
              exact
            />
          ) : (
            ""
          )}

          {/* Administration :: Start */}

          {/* Purchase Module :: Start */}
          {INDAccess.AllowView ? (
            <AppRoute
              path="/Purchase/PurchaseIndent"
              component={PurchaseIndent}
              exact
            />
          ) : (
            ""
          )}
          {INDAccess.AllowInsert ? (
            <AppRoute
              path="/Purchase/PurchaseIndent/new"
              component={PurchaseIndentNew}
              exact
            />
          ) : (
            ""
          )}
          {INDAccess.AllowUpdate ? (
            <AppRoute
              path="/Purchase/PurchaseIndent/edit/:id"
              component={PurchaseIndentNew}
              exact
            />
          ) : (
            ""
          )}
          {PUR_ORDAccess.AllowView ? (
            <AppRoute
              path="/Purchase/PurchaseOrder"
              component={PurchaseOrder}
              exact
            />
          ) : (
            ""
          )}
          {PUR_ORDAccess.AllowInsert ? (
            <AppRoute
              path="/Purchase/PurchaseOrder/new"
              component={PurchaseOrderNew}
              exact
            />
          ) : (
            ""
          )}
          {PUR_ORDAccess.AllowUpdate ? (
            <AppRoute
              path="/Purchase/PurchaseOrder/edit/:id"
              component={PurchaseOrderNew}
              exact
            />
          ) : (
            ""
          )}
          <AppRoute
            path="/Purchase/PurchaseOrder/PrintPO"
            component={lazy(() =>
              import("./views/modules/Purchase/PurchaseOrder/PrintPO.js")
            )}
            exact
          />
          {GRNAccess.AllowView ? (
            <AppRoute path="/Purchase/GRN" component={GRN} exact />
          ) : (
            ""
          )}
          {GRNAccess.AllowInsert ? (
            <AppRoute path="/Purchase/GRN/new" component={GRNNew} exact />
          ) : (
            ""
          )}
          {GRNAccess.AllowUpdate ? (
            <AppRoute path="/Purchase/GRN/edit/:id" component={GRNNew} exact />
          ) : (
            ""
          )}

          {PUR_BILLAccess.AllowView ? (
            <AppRoute
              path="/Purchase/PurchaseBill"
              component={lazy(() =>
                import("./views/modules/Purchase/PurchaseBill")
              )}
              exact
            />
          ) : (
            ""
          )}
          {PUR_BILLAccess.AllowInsert ? (
            <AppRoute
              path="/Purchase/PurchaseBill/new"
              component={lazy(() =>
                import(
                  "./views/modules/Purchase/PurchaseBill/PurchaseBillNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {PUR_BILLAccess.AllowUpdate ? (
            <AppRoute
              path="/Purchase/PurchaseBill/edit/:id"
              component={lazy(() =>
                import(
                  "./views/modules/Purchase/PurchaseBill/PurchaseBillNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {/* Purchase Module :: End */}

          {/* Diesel Module :: Start */}
          {PUR_DSLAccess.AllowView ? (
            <AppRoute
              path="/Diesel/DieselPurchase"
              component={lazy(() =>
                import("./views/modules/Diesel/DieselPurchase/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {PUR_DSLAccess.AllowInsert ? (
            <AppRoute
              path="/Diesel/DieselPurchase/new"
              component={lazy(() =>
                import(
                  "./views/modules/Diesel/DieselPurchase/DieselPurchaseNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {PUR_DSLAccess.AllowUpdate ? (
            <AppRoute
              path="/Diesel/DieselPurchase/edit/:id"
              component={lazy(() =>
                import(
                  "./views/modules/Diesel/DieselPurchase/DieselPurchaseNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}

          {ISS_DSLAccess.AllowView ? (
            <AppRoute
              path="/Diesel/DieselIssue"
              component={lazy(() =>
                import("./views/modules/Diesel/DieselIssue/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ISS_DSLAccess.AllowInsert ? (
            <AppRoute
              path="/Diesel/DieselIssue/new"
              component={lazy(() =>
                import("./views/modules/Diesel/DieselIssue/DieselIssueNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ISS_DSLAccess.AllowUpdate ? (
            <AppRoute
              path="/Diesel/DieselIssue/edit/:id"
              component={lazy(() =>
                import("./views/modules/Diesel/DieselIssue/DieselIssueNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {/* Diesel Module :: End */}

          {TPAccess.AllowView ? (
            <AppRoute
              path="/Trip/TripMaster"
              component={lazy(() => import("./views/modules/TripMaster/"))}
              exact
            />
          ) : (
            ""
          )}
          {TPAccess.AllowInsert ? (
            <AppRoute
              path="/Trip/TripMaster/new"
              component={lazy(() =>
                import("./views/modules/TripMaster/TripMasterNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {TPAccess.AllowUpdate ? (
            <AppRoute
              path="/Trip/TripMaster/edit/:id"
              component={lazy(() =>
                import("./views/modules/TripMaster/TripMasterNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}

          {/* Account :: Start */}
          {ACC_INSAccess.AllowView ? (
            <AppRoute
              path="/Account/Insurance"
              component={lazy(() =>
                import("./views/modules/Account/Insurance/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_INSAccess.AllowInsert ? (
            <AppRoute
              path="/Account/Insurance/new"
              component={lazy(() =>
                import("./views/modules/Account/Insurance/InsuranceNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_INSAccess.AllowUpdate ? (
            <AppRoute
              path="/Account/Insurance/edit/:id"
              component={lazy(() =>
                import("./views/modules/Account/Insurance/InsuranceNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}

          {ACC_CSRAccess.AllowView ? (
            <AppRoute
              path="/Account/CashReceipt"
              component={lazy(() =>
                import("./views/modules/Account/CashReceipt/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_CSRAccess.AllowInsert ? (
            <AppRoute
              path="/Account/CashReceipt/new"
              component={lazy(() =>
                import("./views/modules/Account/CashReceipt/CashReceiptNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_CSRAccess.AllowUpdate ? (
            <AppRoute
              path="/Account/CashReceipt/edit/:id"
              component={lazy(() =>
                import("./views/modules/Account/CashReceipt/CashReceiptNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}

          {ACC_CRRAccess.AllowView ? (
            <AppRoute
              path="/Account/CardReceipt"
              component={lazy(() =>
                import("./views/modules/Account/CardReceipt/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_CRRAccess.AllowInsert ? (
            <AppRoute
              path="/Account/CardReceipt/new"
              component={lazy(() =>
                import("./views/modules/Account/CardReceipt/CardReceiptNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_CRRAccess.AllowUpdate ? (
            <AppRoute
              path="/Account/CardReceipt/edit/:id"
              component={lazy(() =>
                import("./views/modules/Account/CardReceipt/CardReceiptNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}

          {ACC_CSPAccess.AllowView ? (
            <AppRoute
              path="/Account/CashPayment"
              component={lazy(() =>
                import("./views/modules/Account/CashPayment/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_CSPAccess.AllowInsert ? (
            <AppRoute
              path="/Account/CashPayment/new"
              component={lazy(() =>
                import("./views/modules/Account/CashPayment/CashPaymentNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_CSPAccess.AllowUpdate ? (
            <AppRoute
              path="/Account/CashPayment/edit/:id"
              component={lazy(() =>
                import("./views/modules/Account/CashPayment/CashPaymentNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}

          {ACC_CRPAccess.AllowView ? (
            <AppRoute
              path="/Account/CardPayment"
              component={lazy(() =>
                import("./views/modules/Account/CardPayment/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_CRPAccess.AllowInsert ? (
            <AppRoute
              path="/Account/CardPayment/new"
              component={lazy(() =>
                import("./views/modules/Account/CardPayment/CardPaymentNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_CRPAccess.AllowUpdate ? (
            <AppRoute
              path="/Account/CardPayment/edit/:id"
              component={lazy(() =>
                import("./views/modules/Account/CardPayment/CardPaymentNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}

          {ACC_PTCAccess.AllowView ? (
            <AppRoute
              path="/Account/PaymentToContractor"
              component={lazy(() =>
                import("./views/modules/Account/PaymentToContractor/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_PTCAccess.AllowInsert ? (
            <AppRoute
              path="/Account/PaymentToContractor/new"
              component={lazy(() =>
                import(
                  "./views/modules/Account/PaymentToContractor/PaymentToContractorNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_PTCAccess.AllowUpdate ? (
            <AppRoute
              path="/Account/PaymentToContractor/edit/:id"
              component={lazy(() =>
                import(
                  "./views/modules/Account/PaymentToContractor/PaymentToContractorNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}

          {ACC_LPAccess.AllowView ? (
            <AppRoute
              path="/Account/LeagalPayment"
              component={lazy(() =>
                import("./views/modules/Account/LeagalPayment/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_LPAccess.AllowInsert ? (
            <AppRoute
              path="/Account/LeagalPayment/new"
              component={lazy(() =>
                import(
                  "./views/modules/Account/LeagalPayment/LeagalPaymentNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_LPAccess.AllowUpdate ? (
            <AppRoute
              path="/Account/LeagalPayment/edit/:id"
              component={lazy(() =>
                import(
                  "./views/modules/Account/LeagalPayment/LeagalPaymentNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}

          {ACC_MAccess.AllowView ? (
            <AppRoute
              path="/Account/AccountMaster"
              component={lazy(() =>
                import("./views/modules/Account/AccountMaster/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_MAccess.AllowInsert ? (
            <AppRoute
              path="/Account/AccountMaster/new"
              component={lazy(() =>
                import(
                  "./views/modules/Account/AccountMaster/AccountMasterNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_MAccess.AllowUpdate ? (
            <AppRoute
              path="/Account/AccountMaster/edit/:id"
              component={lazy(() =>
                import(
                  "./views/modules/Account/AccountMaster/AccountMasterNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}

          {ACC_RPAccess.AllowView ? (
            <AppRoute
              path="/Account/RentPayament"
              component={lazy(() =>
                import("./views/modules/Account/RentPayment/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_RPAccess.AllowInsert ? (
            <AppRoute
              path="/Account/RentPayament/new"
              component={lazy(() =>
                import("./views/modules/Account/RentPayment/RentPaymentNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {ACC_RPAccess.AllowUpdate ? (
            <AppRoute
              path="/Account/RentPayament/edit/:id"
              component={lazy(() =>
                import("./views/modules/Account/RentPayment/RentPaymentNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}

          {/* Account :: End */}

          {/* Contractor :: Start */}

          {CON_WOAccess.AllowView ? (
            <AppRoute
              path="/Contractor/WorkOrder"
              component={lazy(() =>
                import("./views/modules/Contractor/WorkOrder")
              )}
              exact
            />
          ) : (
            ""
          )}
          {CON_WOAccess.AllowInsert ? (
            <AppRoute
              path="/Contractor/WorkOrder/new"
              component={lazy(() =>
                import("./views/modules/Contractor/WorkOrder/WorkOrderNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {CON_WOAccess.AllowUpdate ? (
            <AppRoute
              path="/Contractor/WorkOrder/edit/:id"
              component={lazy(() =>
                import("./views/modules/Contractor/WorkOrder/WorkOrderNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}

          {CON_BILLAccess.AllowView ? (
            <AppRoute
              path="/Contractor/ContractorBill"
              component={lazy(() =>
                import("./views/modules/Contractor/ContractorBill")
              )}
              exact
            />
          ) : (
            ""
          )}
          {CON_BILLAccess.AllowInsert ? (
            <AppRoute
              path="/Contractor/ContractorBill/new"
              component={lazy(() =>
                import(
                  "./views/modules/Contractor/ContractorBill/ContractorBillNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {CON_BILLAccess.AllowUpdate ? (
            <AppRoute
              path="/Contractor/ContractorBill/edit/:id"
              component={lazy(() =>
                import(
                  "./views/modules/Contractor/ContractorBill/ContractorBillNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}

          {CON_PRAccess.AllowView ? (
            <AppRoute
              path="/Contractor/ContractorPaymentRequest"
              component={lazy(() =>
                import("./views/modules/Contractor/ContractorPaymentRequest")
              )}
              exact
            />
          ) : (
            ""
          )}
          {CON_PRAccess.AllowInsert ? (
            <AppRoute
              path="/Contractor/ContractorPaymentRequest/new"
              component={lazy(() =>
                import(
                  "./views/modules/Contractor/ContractorPaymentRequest/ContractorPaymentRequestNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {CON_PRAccess.AllowUpdate ? (
            <AppRoute
              path="/Contractor/ContractorPaymentRequest/edit/:id"
              component={lazy(() =>
                import(
                  "./views/modules/Contractor/ContractorPaymentRequest/ContractorPaymentRequestNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}

          {CON_ASAccess.AllowView ? (
            <AppRoute
              path="/Contractor/ContractorAdvanceSettlement"
              component={lazy(() =>
                import(
                  "./views/modules/Contractor/ContractorAdvancedSettlement/"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {CON_ASAccess.AllowInsert ? (
            <AppRoute
              path="/Contractor/ContractorAdvanceSettlement/new"
              component={lazy(() =>
                import(
                  "./views/modules/Contractor/ContractorAdvancedSettlement/ContractorAdvancedSettlementNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {CON_ASAccess.AllowUpdate ? (
            <AppRoute
              path="/Contractor/ContractorAdvanceSettlement/edit/:id"
              component={lazy(() =>
                import(
                  "./views/modules/Contractor/ContractorAdvancedSettlement/ContractorAdvancedSettlementNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}

          {/* Contractor :: End */}

          {/* HR :: Start */}
          {HR_EMAccess.AllowView ? (
            <AppRoute
              path="/HR/EarningMaster"
              component={lazy(() =>
                import("./views/modules/HR/EarningMaster/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_EMAccess.AllowInsert ? (
            <AppRoute
              path="/HR/EarningMaster/new"
              component={lazy(() =>
                import("./views/modules/HR/EarningMaster/EarningMasterNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_EMAccess.AllowUpdate ? (
            <AppRoute
              path="/HR/EarningMaster/edit/:id"
              component={lazy(() =>
                import("./views/modules/HR/EarningMaster/EarningMasterNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}

          {HR_DMAccess.AllowView ? (
            <AppRoute
              path="/HR/DeductionMaster"
              component={lazy(() =>
                import("./views/modules/HR/DeductionMaster/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_DMAccess.AllowInsert ? (
            <AppRoute
              path="/HR/DeductionMaster/new"
              component={lazy(() =>
                import(
                  "./views/modules/HR/DeductionMaster/DeductionMasterNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_DMAccess.AllowUpdate ? (
            <AppRoute
              path="/HR/DeductionMaster/edit/:id"
              component={lazy(() =>
                import(
                  "./views/modules/HR/DeductionMaster/DeductionMasterNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}

          {HR_SLAccess.AllowView ? (
            <AppRoute
              path="/HR/SalaryInformation"
              component={lazy(() =>
                import("./views/modules/HR/SalaryInformation/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_SLAccess.AllowInsert ? (
            <AppRoute
              path="/HR/SalaryInformation/new"
              component={lazy(() =>
                import(
                  "./views/modules/HR/SalaryInformation/SalaryInformationNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_SLAccess.AllowUpdate ? (
            <AppRoute
              path="/HR/SalaryInformation/edit/:id"
              component={lazy(() =>
                import(
                  "./views/modules/HR/SalaryInformation/SalaryInformationNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}

          {HR_PMAccess.AllowView ? (
            <AppRoute
              path="/HR/PayslipMonth"
              component={lazy(() => import("./views/modules/HR/PayslipMonth/"))}
              exact
            />
          ) : (
            ""
          )}
          {HR_PMAccess.AllowInsert ? (
            <AppRoute
              path="/HR/PayslipMonth/new"
              component={lazy(() =>
                import("./views/modules/HR/PayslipMonth/PayslipMonthNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_PMAccess.AllowUpdate ? (
            <AppRoute
              path="/HR/PayslipMonth/edit/:id"
              component={lazy(() =>
                import("./views/modules/HR/PayslipMonth/PayslipMonthNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}

          {HR_APAccess.AllowView ? (
            <AppRoute
              path="/HR/AutoPayslip"
              component={lazy(() => import("./views/modules/HR/AutoPayslip/"))}
              exact
            />
          ) : (
            ""
          )}
          {HR_APAccess.AllowInsert ? (
            <AppRoute
              path="/HR/AutoPayslip/new"
              component={lazy(() =>
                import("./views/modules/HR/AutoPayslip/AutoPayslipNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_APAccess.AllowUpdate ? (
            <AppRoute
              path="/HR/AutoPayslip/edit/:id"
              component={lazy(() =>
                import("./views/modules/HR/AutoPayslip/AutoPayslipNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}

          {HR_PWAAccess.AllowView ? (
            <AppRoute
              path="/HR/ProjectWiseAttendance"
              component={lazy(() =>
                import("./views/modules/HR/ProjectWiseAttendance/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_PWAAccess.AllowInsert ? (
            <AppRoute
              path="/HR/ProjectWiseAttendance/new"
              component={lazy(() =>
                import(
                  "./views/modules/HR/ProjectWiseAttendance/ProjectWiseAttendanceNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_PWAAccess.AllowUpdate ? (
            <AppRoute
              path="/HR/ProjectWiseAttendance/edit/:id"
              component={lazy(() =>
                import(
                  "./views/modules/HR/ProjectWiseAttendance/ProjectWiseAttendanceNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}

          {HR_EPBAccess.AllowView ? (
            <AppRoute
              path="/HR/EmployeeAndProjectBinding"
              component={lazy(() =>
                import("./views/modules/HR/EmployeeAndProjectBinding/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_EPBAccess.AllowInsert ? (
            <AppRoute
              path="/HR/EmployeeAndProjectBinding/new"
              component={lazy(() =>
                import(
                  "./views/modules/HR/EmployeeAndProjectBinding/EmployeeAndProjectBindingNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_EPBAccess.AllowUpdate ? (
            <AppRoute
              path="/HR/EmployeeAndProjectBinding/edit/:id"
              component={lazy(() =>
                import(
                  "./views/modules/HR/EmployeeAndProjectBinding/EmployeeAndProjectBindingNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}

          {HR_ETAccess.AllowView ? (
            <AppRoute
              path="/HR/EmployeeTransfer"
              component={lazy(() =>
                import("./views/modules/HR/EmployeeTransfer/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_ETAccess.AllowInsert ? (
            <AppRoute
              path="/HR/EmployeeTransfer/new"
              component={lazy(() =>
                import(
                  "./views/modules/HR/EmployeeTransfer/EmployeeTransferNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_ETAccess.AllowUpdate ? (
            <AppRoute
              path="/HR/EmployeeTransfer/edit/:id"
              component={lazy(() =>
                import(
                  "./views/modules/HR/EmployeeTransfer/EmployeeTransferNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          



{/*


{HR_LMAccess.AllowView ? (
            <AppRoute
              path="/HR/HolidayMaster"
              component={lazy(() => import("./views/modules/HR/HolidayMaster"))}
              exact
            />
          ) : (
            ""
          )}
          {HR_LMAccess.AllowInsert ? (
            <AppRoute
              path="/HR/HolidayMaster/new"
              component={lazy(() =>
                import("./views/modules/HR/HolidayMaster/HolidayMasterNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_LMAccess.AllowUpdate ? (
            <AppRoute
              path="/HR/HolidayMaster/edit/:id"
              component={lazy(() =>
                import("./views/modules/HR/HolidayMaster/HolidayMasterNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}

*/}

          
          {HR_LMAccess.AllowView ? (
            <AppRoute
              path="/HR/LeaveMaster"
              component={lazy(() => import("./views/modules/HR/LeaveMaster/"))}
              exact
            />
          ) : (
            ""
          )}
          {HR_LMAccess.AllowInsert ? (
            <AppRoute
              path="/HR/LeaveMaster/new"
              component={lazy(() =>
                import("./views/modules/HR/LeaveMaster/LeaveMasterNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_LMAccess.AllowUpdate ? (
            <AppRoute
              path="/HR/LeaveMaster/edit/:id"
              component={lazy(() =>
                import("./views/modules/HR/LeaveMaster/LeaveMasterNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}




          {HR_LMAccess.AllowView ? (
            <AppRoute
              path="/HR/LeaveMaster"
              component={lazy(() => import("./views/modules/HR/LeaveMaster/"))}
              exact
            />
          ) : (
            ""
          )}
          {HR_LMAccess.AllowInsert ? (
            <AppRoute
              path="/HR/LeaveMaster/new"
              component={lazy(() =>
                import("./views/modules/HR/LeaveMaster/LeaveMasterNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_LMAccess.AllowUpdate ? (
            <AppRoute
              path="/HR/LeaveMaster/edit/:id"
              component={lazy(() =>
                import("./views/modules/HR/LeaveMaster/LeaveMasterNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}

          {HR_LOAccess.AllowView ? (
            <AppRoute
              path="/HR/LeaveOpening"
              component={lazy(() => import("./views/modules/HR/LeaveOpening/"))}
              exact
            />
          ) : (
            ""
          )}
          {HR_LOAccess.AllowInsert ? (
            <AppRoute
              path="/HR/LeaveOpening/new"
              component={lazy(() =>
                import("./views/modules/HR/LeaveOpening/LeaveOpeningNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_LOAccess.AllowUpdate ? (
            <AppRoute
              path="/HR/LeaveOpening/edit/:id"
              component={lazy(() =>
                import("./views/modules/HR/LeaveOpening/LeaveOpeningNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}

          {HR_LAAccess.AllowView ? (
            <AppRoute
              path="/HR/LeaveApplication"
              component={lazy(() =>
                import("./views/modules/HR/LeaveApplication/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_LAAccess.AllowInsert ? (
            <AppRoute
              path="/HR/LeaveApplication/new"
              component={lazy(() =>
                import(
                  "./views/modules/HR/LeaveApplication/LeaveApplicationNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_LAAccess.AllowUpdate ? (
            <AppRoute
              path="/HR/LeaveApplication/edit/:id"
              component={lazy(() =>
                import(
                  "./views/modules/HR/LeaveApplication/LeaveApplicationNew.js"
                )
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_LAPAccess.AllowView ? (
            <AppRoute
              path="/HR/LeaveApproval"
              component={lazy(() =>
                import("./views/modules/HR/LeaveApproval/")
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_LAPAccess.AllowInsert ? (
            <AppRoute
              path="/HR/LeaveApproval/new"
              component={lazy(() =>
                import("./views/modules/HR/LeaveApproval/LeaveApprovalNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {HR_LAPAccess.AllowUpdate ? (
            <AppRoute
              path="/HR/LeaveApproval/edit/:id"
              component={lazy(() =>
                import("./views/modules/HR/LeaveApproval/LeaveApprovalNew.js")
              )}
              exact
            />
          ) : (
            ""
          )}
          {/* HR :: End */}

          <AppRoute component={error404} fullLayout />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
