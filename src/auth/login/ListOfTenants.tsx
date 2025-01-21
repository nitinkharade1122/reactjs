import { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, Button, Card } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import axiosInstance from 'src/core/interceptors/axios-instance';
import { getTenantAPI } from 'src/modules/Dashboard/apis/userTenantRoleAPI';
import { useDispatch } from 'react-redux';
import { setSelectedTenantId } from 'src/store/reducer/userReducer';
import { USER, USER_DASHBOARD } from 'src/shared/constants/routes';
import { Role } from 'src/shared/constants/constants';

const ListOfTenants = () => {
    const [tenants, setTenants] = useState([]);
    const [tenantList, setTenantList] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const decodedToken = location.state?.decodedToken;
    const dispatch = useDispatch();

    // Fetch tenant data when the component mounts
    const fetchTenants = async () => {
        const data = await getTenantAPI();
        setTenantList(data);
    };
    useEffect(() => {
        fetchTenants();

        // If decodedToken changes, update tenants
        if (decodedToken) {
            setTenants(decodedToken.tenantRoles);
        }
    }, [decodedToken]);

    const getRolesForTenant = (tenantId: number) => {
        const tenant = decodedToken.tenantRoles.find(role => role.tenantId === tenantId);
        return tenant ? tenant.roles : [];
    };
    const handleTenantSelect = (tenantId: number) => {

        axiosInstance.defaults.headers['currentTenantId'] = tenantId;
        dispatch(setSelectedTenantId(tenantId));
        const roles = getRolesForTenant(tenantId);
        if (roles.includes(Role.Admin)) {
            navigate(USER);
        } else if (roles.includes(Role.User)) {
            navigate(USER_DASHBOARD);
        } else {
            console.error('No valid role found for the selected tenant');
        }
    };

    const mapTenantIdsToNames = () => {
        return tenants.map(tenant => {
            const tenantInfo = tenantList.find(t => t.id === tenant.tenantId);
            return {
                tenantId: tenant.tenantId,
                tenantName: tenantInfo ? tenantInfo.tenant : tenant.tenantId,
                roles: getRolesForTenant(tenant.tenantId)
            };
        });
    };

    return (
        <Box display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh">
            <Card sx={{ p: 3 }}>
                {tenants.length > 0 ? (
                    <>
                        <Typography variant="h4">Select Your Tenant</Typography>
                        <List>
                            {mapTenantIdsToNames().map(({ tenantId, tenantName }) => (
                                <ListItem key={tenantId}>
                                    <Button onClick={() => handleTenantSelect(tenantId)}>
                                        {tenantName}
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </>
                ) : (
                    <Typography variant="h6">No tenants available.</Typography>
                )}
            </Card>
        </Box>
    );
};

export default ListOfTenants;