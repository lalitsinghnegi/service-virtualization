
import config from "./config";
const { uri } = config.api;

// Purpose : Keep all end points in one place to be used by service 

export const TEAM_DATA = `${uri}support/teamData`;
export const STUBS_DATA = `${uri}support/stubsData`;
export const USERCOUNT_DATA = `${uri}support/userCountData`;
export const GET_ALL_NAME_AND_ID = `${uri}support/user/getAllNameAndId`;
export const GET_EMPLOYEE_FOR_ID = `${uri}support/user/getEmployeeForId`;
export const GET_PROFILE_BY_EMAIL = `${uri}support/user/getProfileByEmail`;
export const SEND_ACTIVATION = `${uri}support/user/sendActivation`;

export const GETALL = `${uri}support/user/getUsers`;
export const DELETE_ONE = `${uri}support/user/deleteOne`;
export const CREATE_USER = `${uri}support/user/create`;
export const REGISTER = `${uri}user/register`;
export const CHANGEPASS = `${uri}user/changepass`;
export const SIGNIN = `${uri}signin`;
export const LOGOUT = `${uri}logout`;
export const ACTIVATE_USER = `${uri}user/active`;
export const PROGRAM_LIST =  `${uri}user/programList`;
export const TEAM_LIST_ByProgramId =  `${uri}user/teamListByProgramId`;
export const REQUEST_LIST = `${uri}support/registeration/list`;
export const NEW_REQUEST_LIST = `${uri}support/registeration/newrequest`;
export const CREATE_REQUEST = `${uri}support/registeration/create`;
export const PROCESS_REQUEST = `${uri}support/registeration/process`;
export const DASH_METRICS = `${uri}metrics/getdashboardMetrics`;
export const VC_REQUEST = `${uri}folder/getValueChain`;
export const APP_REQUEST = `${uri}folder/getApplication`;
export const FOLDERID_REQUEST = `${uri}folder/fetchFolderStructureId`;
export const PROGRAM_TEAM_REQUEST = `${uri}folder/getProgramAndTeamByUserId`;
export const FOLDER_REQUEST = `${uri}folder/getFolderStructureId`;
export const TESTMAIL_REQUEST = `${uri}testmail`;
export const API_GET_METRICS = `${uri}metrics/getAdminMetrics`;
export const GET_STUB_METRICS_APP = `${uri}metrics/getStubMetricsApp`;
export const GET_STUB_DTL_METRICS = `${uri}metrics/getStubDetialsMetrics`;
export const GET_USER_METRICS = `${uri}metrics/getUserMetrics`;