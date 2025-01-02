import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, useTheme } from '@mui/material';
import { Typography } from '../../shared/components/index';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ApexCharts from 'react-apexcharts';
import { getCompanySkillsData, getSkillSpecificEmpData } from '../Dashboard/services/dashboards.service';
import { EmployeesDetails } from '../Dashboard/models/DashboardDetails';
// import EmployeesSkillDetails from './EmployeesSkillDetails';
import { titleCase } from 'src/shared/utils/utils';
import { color, style } from '@mui/system';

const CompanySkills = () => {
    // Constants
    const theme = useTheme();
    const { t } = useTranslation(['english']);
    const dispatch = useDispatch<any>();

    // Redux
    const { companySkillsDetails, employeesDetailsBySkill, isDataRefresh } =
        useSelector((state: any) => state.dashboardData);

    // State
    const [skilledEmpDetails, setSkilledEmpDetails] = useState<EmployeesDetails[]>([]);
    const [showSkillEmpDetailsDialog, setShowSkillEmpDetailsDialog] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState('');

    // Use Effects
    useEffect(() => {
        dispatch(getCompanySkillsData(isDataRefresh));
    }, [isDataRefresh]);

    useEffect(() => {
        if (employeesDetailsBySkill && employeesDetailsBySkill?.length) {
            setSkilledEmpDetails(employeesDetailsBySkill);
        }
    }, [employeesDetailsBySkill]);

    useEffect(() => {
        if (skilledEmpDetails && skilledEmpDetails?.length) {
            setShowSkillEmpDetailsDialog(true);
        }
    }, [skilledEmpDetails]);

    // Convert data to ApexCharts format
    const chartData = {
        series: [
            {
                name: t('dashboard.company_skills.employees'),
                data: companySkillsDetails.map(skill => ({
                    x: skill.name,
                    y: skill.employees
                })),
            },
            {
                name: t('dashboard.company_skills.available'),
                data: companySkillsDetails.map(skill => ({
                    x: skill.name,
                    y: skill.available
                }))
            },
            {
                name: t('dashboard.company_skills.unavailable'),
                data: companySkillsDetails.map(skill => ({
                    x: skill.name,
                    y: skill.unavailable

                }))
            },
            {
                name: t('dashboard.company_skills.projects'),
                data: companySkillsDetails.map(skill => ({
                    x: skill.name,
                    y: skill.projects
                }))
            },

        ],
        options: {
            chart: {
                type: 'line',
                height: 168,
                toolbar: {
                    show: false  // This hides the toolbar, including the download button
                }
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            xaxis: {
                categories: companySkillsDetails.map(skill => skill.name),
                labels: {
                    style: {
                        colors: theme.palette.text.primary
                    }
                },
            },
            yaxis: {
                title: {
                    text: 'Count',
                    style: {
                        color: theme.palette.text.primary
                    },
                },
                labels: {
                    style: {
                        colors: theme.palette.text.primary
                    }
                },
            },
            fill: {
                opacity: 0.8
            },
            colors: ['#4DC3A7', '#FF9A8B', '#C5A9E2', '#F9E79F'],
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                labels: {
                    colors: theme.palette.text.primary
                }
            },
            tooltip: {
                shared: true,
                intersect: false
            }

        }
    };

    return (
        <>
            <Card>
                <Grid container direction="row" justifyContent="center" alignItems="stretch">
                    <Grid item xs={12}>
                        <Box sx={{ px: 2, py: 2 }}>
                            <Typography variant="h4">
                                {t('dashboard.company_skills.company_skills')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ p: 2, maxHeight: 400 }}>
                            <ApexCharts
                                options={chartData.options as any}
                                series={chartData.series}
                                type="line"
                                height={168}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};

export default CompanySkills;
