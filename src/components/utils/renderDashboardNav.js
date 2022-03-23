export const renderDashboardNav = (isAdmin) => {
    let routes;

    if(isAdmin){
        routes = [
            {
                'id': 1,
                'routeEndpoint': '/dashboard',
                'title': '',
                'icon': 'icon-recharge'
            },
            // {
            //     'id': 2,
            //     'routeEndpoint': '/application',
            //     'title': 'Application',
            //     'icon': 'icon-software-apps'
            // },
            // {
            //     'id': 3,
            //     'routeEndpoint': '/platform',
            //     'title': 'Platform',
            //     'icon': 'icon-server'
            // },
            // {
            //     'id': 4,
            //     'routeEndpoint': '/usersAndGroups',
            //     'title': 'Users & Groups',
            //     'icon': 'icon-unlimited-users'
            // },
            // {
            //     'id': 5,
            //     'routeEndpoint': '/reporting',
            //     'title': 'Reporting',
            //     'icon': 'icon-note'
            // },
            // {
            //     'id': 6,
            //     'routeEndpoint': '/approvalConsole',
            //     'title': 'Approval Console',
            //     'icon': 'icon-leave-it-with-us'
            // },
        ]
    } else {
        routes = [
            {
                // 'id': 2,
                // 'routeEndpoint': '/reporting',
                // 'title': 'Reporting',
                'icon': 'icon-note'
            },
        ]
    }

    return routes;
}