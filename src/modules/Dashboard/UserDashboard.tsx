import { Box, Grid } from '@mui/material'
import { Card, Tables } from '../../shared/components'
import TotalEmployees from './TotalEmployees';
import RegionWiseCustomer from './RegionWiseCustomer';
import CompanySkills from './CompanySkills';
import CustomerSatisfaction from './CustomerSatisfaction';
import Graph from './Graph';


const UserDashboard = () => {
    const columns = [
        { field: "projectName", headerName: "PROJECT NAME", flex: 1 },
        { field: "projectManager", headerName: "PROJECT MANAGER", flex: 1 },
        { field: "startDate", headerName: "START DATE", flex: 1 },
        { field: "endDate", headerName: "END DATE", flex: 1 },
        { field: "teamSize", headerName: "TEAM SIZE", flex: 1 },
        { field: "projectDomain", headerName: "PROJECT DOMAIN", flex: 1 },
    ];
    const rows = [
        {
            id: 1,
            projectName: "Arena9",
            projectManager: "Nick Jonas",
            startDate: "20/10/2022",
            endDate: "30/10/2023",
            teamSize: 12,
            projectDomain: "Healthcare",
        },
        {
            id: 2,
            projectName: "Comcast",
            projectManager: "Zane Pineda",
            startDate: "20/10/2019",
            endDate: "31/12/2023",
            teamSize: 20,
            projectDomain: "Fintech",
        },
        {
            id: 3,
            projectName: "Signify",
            projectManager: "Jessica Pearson",
            startDate: "20/10/2019",
            endDate: "30/05/2022",
            teamSize: 7,
            projectDomain: "Fintech",
        },
        {
            id: 4,
            projectName: "CX-One",
            projectManager: "Sheldon Mullins",
            startDate: "20/10/2020",
            endDate: "30/10/2023",
            teamSize: 15,
            projectDomain: "CRM",
        },
        {
            id: 5,
            projectName: "PM-Gamification",
            projectManager: "Jocelyn Pennington",
            startDate: "15/03/2021",
            endDate: "30/04/2023",
            teamSize: 18,
            projectDomain: "PM",
        },
        {
            id: 6,
            projectName: "Ionics",
            projectManager: "Teagan Perez",
            startDate: "05/04/2017",
            endDate: "-",
            teamSize: 12,
            projectDomain: "Healthcare",
        },
        {
            id: 7,
            projectName: "Great8",
            projectManager: "Mike Ross",
            startDate: "01/10/2022",
            endDate: "-",
            teamSize: 10,
            projectDomain: "Edutech",
        },
    ];

    return (
        <>
            <Box>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={3}

                    >
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <TotalEmployees />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                            <CompanySkills />
                        </Grid>
                    </Grid>
                    <Grid
                        sx={{ my: 1 }}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={3}
                    >
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Graph />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <CustomerSatisfaction />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <RegionWiseCustomer />
                        </Grid>
                    </Grid>
                    <Grid
                        sx={{ my: 1 }}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={3}
                    >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Tables rows={rows} columns={columns} checkboxSelection={false} />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}

export default UserDashboard
