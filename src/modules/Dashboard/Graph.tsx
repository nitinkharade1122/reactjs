import { useTranslation } from 'react-i18next';
import Chart from 'react-apexcharts';
import { Box, Grid, useTheme } from '@mui/material';
import { Card, Typography } from '../../shared/components/index';
import { ApexOptions } from 'apexcharts';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDomainSpecProjectsData } from '../Dashboard/services/dashboards.service';

const Graph = () => {
    //Constants
    const theme = useTheme();
    const { t } = useTranslation(['english']);
    const dispatch = useDispatch<any>();

    //Redux
    const { domainSpecProjectsData, isDataRefresh } = useSelector(
        (state: any) => state?.dashboardData
    );

    //useEffects
    useEffect(() => {
        dispatch(getDomainSpecProjectsData(isDataRefresh));
    }, [isDataRefresh]);

    //Chart options
    const chartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            height: 195,
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            colors: ['#A2D2FF']
        },
        yaxis: {
            labels: {
                show: true,
                align: 'right',
                style: {
                    colors: theme.palette.text.primary,
                }
            }
        },
        xaxis: {
            min: 0,
            max: 100,
            tickAmount: 4,
            labels: {
                style: {
                    colors: theme.palette.text.primary,
                }
            }
        },
        grid: {
            padding: {
                top: -25,
                bottom: 0
            },
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: false
                }
            }
        },
        series: domainSpecProjectsData?.series || []
    };

    //HTML
    return (
        <Card style={{ height: 245 }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
            >
                <Grid item xs={12}>
                    <Box sx={{ p: 2 }} className="flex-basic-space-between">
                        <Typography variant="h4">
                            {t('dashboard.domain_specific_projects.domain_specific_projects')}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Chart
                        options={chartOptions}
                        series={chartOptions.series}
                        type={chartOptions.chart.type}
                        height={chartOptions.chart.height}
                    />
                </Grid>
            </Grid>
        </Card>
    );
};

export default Graph;
