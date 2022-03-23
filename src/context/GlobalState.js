import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
import { getUserRolesFromToken, getProfileDataFromToken } from '../services/authentication';
// Global contect , used in filter in portal insight
const initialState = {
    login_type: '',
    user_role: '',
    isAdmin: '',
    is_authenticated: false,
    profile_data: {
        user_name: '',
        email: ''
    },
    portal_insights_data: {
        start_date_filter: '',
        end_date_filter: ''
    },
    selected_entity_data:{
        folderStructure_id:'',
        folderStructureS3:'',
        team_name:'',
        application_id:'',
        application_code:'',
        team_code:'',
        valueChain_name:'',
        team_id:''
    }
};

//The global context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        if (state.login_type === '') {
            if (localStorage.getItem("accessToken")) {
                //determine login type on page refresh
                setIsAuthenticated(true);
                setLoginType('LOCAL');
                       

                if (state.user_role === "") {
                    //set user roles
                    fetchUserRoles(localStorage.getItem("accessToken"));
                }

                if(state.profile_data.user_name === '' || state.profile_data.email === ''){
                    let profile_data = getProfileDataFromToken(localStorage.getItem("accessToken"));
                    setProfileData({user_name: profile_data.user_name, email: profile_data.email});
                    console.log("setProfileData::",profile_data);
                }
            }
        }
        // eslint-disable-next-line
    }, [])

    const fetchUserRoles = async (token) => {
        let role = getUserRolesFromToken(token);
        setUserRoles(role);
  
        if(role === 'support'){
          setIsAdmin(true)
        } else{
          setIsAdmin(false);
        }
      }

    //Actions
    const setLoginType = (loginType) => {
        dispatch({
            type: 'SET_LOGIN_TYPE',
            payload: loginType
        })
    }

    const setUserRoles = (userRole) => {
        dispatch({
            type: 'SET_USER_ROLES',
            payload: userRole
        })
    }

    const setIsAdmin = (isAdmin) => {
        dispatch({
            type: 'SET_IS_ADMIN',
            payload: isAdmin
        })
    }

    const setIsAuthenticated = (isAuthenticated) => {
        dispatch({
            type: 'SET_IS_AUTHENTICATED',
            payload: isAuthenticated
        })
    }

    const setProfileData = (profileData) => {
        dispatch({
            type: 'SET_PROFILE_DATA',
            payload: profileData
        })
    }

    const setPortalInsightsData = (portalInsightsData) => {
        dispatch({
            type: 'SET_PORTAL_INSIGHTS_DATA',
            payload: portalInsightsData
        })
    }

    const setSelectedEntity = (selectedEntityData) => {
        dispatch({
            type: 'SET_SELECTED_ENTITY',
            payload: selectedEntityData
        })
    }
    return (
        <GlobalContext.Provider value={{
            setLoginType,
            setUserRoles,
            setIsAdmin,
            setIsAuthenticated,
            setProfileData,
            setPortalInsightsData,
            setSelectedEntity,
            user_role: state.user_role,
            isAdmin: state.isAdmin,
            login_type: state.login_type,
            is_authenticated: state.is_authenticated,
            profile_data: state.profile_data,
            portal_insights_data: state.portal_insights_data,
            selected_entity_data: state.selected_entity_data
        }}>
            {children}
        </GlobalContext.Provider>
    );
}