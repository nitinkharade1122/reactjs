import { useTranslation } from 'react-i18next';
import Chart from 'react-apexcharts';
import { Box, Grid, useTheme } from '@mui/material';
import { Card, Typography } from '../../shared/components/index';
import type { ApexOptions } from 'apexcharts';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCustomerSatisfactionDetails } from '../Dashboard/services/dashboards.service';

const CustomerSatisfaction = () => {
    //Constants
    const theme = useTheme();
    const { t } = useTranslation(['english']);
    const dispatch = useDispatch<any>();

    //Redux
    const { customerSatisfactionData, isDataRefresh } = useSelector(
        (state: any) => state?.dashboardData
    );

    //useEffects
    useEffect(() => {
        dispatch(getCustomerSatisfactionDetails(isDataRefresh));
    }, [isDataRefresh]);

    //Chart Options
    const chartOptions: ApexOptions = {
        series: customerSatisfactionData?.series,
        labels: customerSatisfactionData?.labels,
        chart: {
            height: 220,
            type: 'donut',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },

        dataLabels: {
            enabled: false
        },
        colors: customerSatisfactionData?.colors,
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'left',
            markers: {
                strokeWidth: 0,
            },
            labels: {
                colors: [...theme.palette.text.primary]
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: false,
                        name: {
                            fontSize: '10px',
                            color: theme.palette.text.primary,
                        },
                        value: {
                            show: false,
                            fontSize: '20px',
                            color: theme.palette.text.primary,
                        },
                        total: {
                            show: false,
                            label: `60%`,
                            formatter: () => 'Positive'
                        }
                    }
                }
            }
        }
    };

    //HTML
    return (
        <Card style={{ height: 245 }}>
            <Grid container direction="row" justifyContent="center" alignItems="stretch">
                <Grid item xs={12}>
                    <Box sx={{ p: 2 }} className="flex-basic-space-between">
                        <Typography variant="h4">
                            {t('dashboard.customer_satisfaction.customer_satisfaction')}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    {chartOptions?.series ? (
                        <Chart
                            options={chartOptions}
                            series={chartOptions?.series || []}
                            type={chartOptions?.chart?.type}
                            height={chartOptions?.chart?.height}
                        />
                    ) : (
                        <Typography variant="body1">Loading...</Typography>
                    )}
                </Grid>
            </Grid>
        </Card>
    );

};

export default CustomerSatisfaction;
