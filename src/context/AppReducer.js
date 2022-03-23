export default (state, action) => {
    switch(action.type){
        case 'SET_LOGIN_TYPE':
            return {
                ...state,
                login_type: action.payload
            }
        case 'SET_USER_ROLES':
            return {
                ...state,
                user_roles: action.payload
            }
        case 'SET_IS_ADMIN':
            return {
                ...state,
                isAdmin: action.payload
            }
        case 'SET_IS_AUTHENTICATED':
            return {
                ...state,
                is_authenticated: action.payload
            }
        case 'SET_PROFILE_DATA':
            return {
                ...state,
                profile_data: action.payload
            }
        
        case 'SET_PORTAL_INSIGHTS_DATA':
            return {
                ...state,
                portal_insights_data: action.payload
            }
            case 'SET_SELECTED_ENTITY':
                return {
                    ...state,
                    selected_entity_data: action.payload
                }
    

        default:
            return state;
    }
}