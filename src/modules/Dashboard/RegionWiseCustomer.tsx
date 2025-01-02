import { useEffect, useState } from 'react';
import { Card, Typography } from '../../shared/components/index';
import { Box, Grid, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { csv } from 'd3-fetch';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import geoUrl from '../Dashboard/apis/latest.json';
import { useSelector } from 'react-redux';

const RegionWiseCustomer = () => {
    //Constants
    const { t } = useTranslation(['english']);

    //State
    const [data, setData] = useState([]);

    //Redux
    const { isDataRefresh } = useSelector((state: any) => state?.dashboardData);

    //useEffects
    useEffect(() => {
        csv(isDataRefresh ? './mapData2.csv' : './mapData.csv').then((data) => {
            setData(data);
        });
    }, [isDataRefresh]);

    return (
        <Card style={{ height: 245, paddingLeft: 0, paddingRight: 15 }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
            >
                <Grid item xs={12}>
                    <Box sx={{ p: 2 }} className="flex-basic-space-between">
                        <Typography variant="h4">
                            {t('dashboard.region_wise_customers.region_wise_customers')}
                        </Typography>
                        <Typography variant="h4">
                            {isDataRefresh ? '95+' : '85+'}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <ComposableMap height={500}>
                        {data.length > 0 && (
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        const d = data.find((s) => s.ISO3 === geo.id);
                                        return (
                                            <Tooltip title={geo.id} arrow key={geo.rsmKey}>
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    fill={d ? d.color : '#9f9999'}
                                                    stroke="#9f9999"
                                                />
                                            </Tooltip>
                                        );
                                    })
                                }
                            </Geographies>
                        )}
                    </ComposableMap>
                </Grid>
            </Grid>
        </Card>
    );
};

export default RegionWiseCustomer;
