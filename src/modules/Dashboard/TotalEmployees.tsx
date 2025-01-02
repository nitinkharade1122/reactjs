import React, { useEffect } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import { Card, Typography } from '../../shared/components/index';
import { useTranslation } from 'react-i18next';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getTotalEmployeeChartData } from '../Dashboard/services/dashboards.service';

const TotalEmployees = () => {
    //constant
    const theme = useTheme();
    const { t } = useTranslation(['english']);
    const dispatch = useDispatch<any>();

    //Redux
    const { totalEmployeeData, isDataRefresh } = useSelector(
        (state: any) => state?.dashboardData
    );


    //useEffect
    useEffect(() => {
        dispatch(getTotalEmployeeChartData(isDataRefresh));
    }, [isDataRefresh]);

    //Chart Options
    const options: ApexOptions = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        stroke: {
            width: 2
        },
        colors: ['#B4A6FF'],
        markers: {
            size: 4,
            colors: ['#B4A6FF']
        },
        tooltip: {
            x: {
                show: false
            }
        },
        xaxis: {
            categories: totalEmployeeData?.years,
            type: 'category',
            axisBorder: {
                show: false
            },
            labels: {
                style: {
                    colors: theme.palette.text.primary
                }
            },


            axisTicks: {
                show: true
            }
        },
        yaxis: {
            tickAmount: 3,
            min: totalEmployeeData?.min,
            max: totalEmployeeData?.max,
            labels: {
                style: {
                    colors: theme.palette.text.primary
                }
            },
        },

    };


    return (
        <Card>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
            >
                <Grid item xs={12}>
                    <Box sx={{ p: 2 }} className="flex-basic-space-between">
                        <Box className="flex-basic-center">
                            <Typography variant="h4">
                                {t('dashboard.employees.total_employees')}
                            </Typography>
                            <Typography sx={{ ml: 2 }} variant="h3">
                                {totalEmployeeData?.total}
                            </Typography>
                        </Box>
                        <Box className="flex-basic-center">
                            <Box className="flex-basic-center">
                                <MaleIcon color="info" />
                                <Typography>{totalEmployeeData?.maleEmployees}</Typography>
                            </Box>
                            <Box sx={{ ml: 3 }} className="flex-basic-center">
                                <FemaleIcon color="error" />
                                <Typography>{totalEmployeeData?.femaleEmployees}</Typography>
                            </Box>
                            <Box sx={{ ml: 3 }} className="flex-basic-center">
                                <TransgenderIcon color="warning" />
                                <Typography>
                                    {totalEmployeeData?.transgenderEmployees}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Chart
                        height={180}
                        options={options}
                        series={totalEmployeeData?.series || []}
                        type="line"
                    />
                </Grid>
            </Grid>
        </Card>
    );
};

export default TotalEmployees;
