import { FC } from 'react';
import PropTypes from 'prop-types';
import { Grid2 as Grid, SvgIconProps } from '@mui/material';

interface PageHeaderProps {
  children?: React.ReactNode[];
  heading?: string;
  subHeading?: string;
  icon?: React.ReactElement<SvgIconProps>;
  breadcrumbs?: any[];
  value?: string;
}

export const PageHeader: FC<PageHeaderProps> = ({
  heading = '',
  subHeading = '',
  children,
  icon,
  value,
  breadcrumbs = [],
  ...rest
}) => {
  return (
    <Grid size={{ xs: 12, sm: 12, md: 'auto' }}>
      <Grid 
      container
      display='flex'
      justifyContent="space-between"
      alignItems="center"
      rowSpacing={3}
      columnSpacing={2}
      sx={{
        pb : 2
      }}
      >
        {children.map((item, index) => {
          return(
            <Grid key={`header${index}`} size={{md:'auto'}} >
              {item}
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  );
};

PageHeader.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};
