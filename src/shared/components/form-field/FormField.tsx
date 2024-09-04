import React, { useState } from 'react';
import { ErrorMessage, Field } from 'formik';

import { FormFieldType } from './service/formFieldInterface';
import { FIELD_TYPE, REGEX } from 'src/shared/constants/constants';
import {
  CheckBox,
  Radio,
  Select,
  TextField,
  Autocomplete,
  CheckboxGroup,
  RadioGroup,
  FormLabel,
  FormControl
} from '../index';
import {
  FormControlLabel,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Switch
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface FormFieldProps {
  fieldProps: FormFieldType;
}

export const FormField = ({ fieldProps }: FormFieldProps) => {
  //Constants
  const { t } = useTranslation(['english']);
  //state
  const [value, setValue] = useState(
    fieldProps?.type === FIELD_TYPE.MULTI_SELECT ? ([] as any[]) : ({} as any)
  );
  const [showPassword, setShowPassword] = useState(false);

  //methods
  const handleOnChange = (event, field, value?, form?) => {
    // Text only and number only validation checks
    if (
      (fieldProps?.type === FIELD_TYPE.TEXT &&
        !REGEX.TEXT_ONLY.test(event?.target?.value)) ||
      (fieldProps?.type === FIELD_TYPE.INTEGER_ONLY &&
        !REGEX.NUMBER_INTEGER.test(event?.target?.value)) ||
      (fieldProps?.type === FIELD_TYPE.ALPHA_NUMBERICS &&
        !REGEX.ALPHA_NUMBERICS.test(event?.target?.value))
    ) {
      return;
    }

    //Parent's on change function calls
    if (
      fieldProps?.type === FIELD_TYPE.AUTOCOMPLETE ||
      fieldProps?.type === FIELD_TYPE.SWITCH ||
      fieldProps?.type === FIELD_TYPE.MULTI_SELECT
    ) {
      setValue(value);
      form.setFieldValue(field?.name, value);
    }
    field.onChange(event);
    if (fieldProps?.handleFieldChange) {
      fieldProps?.handleFieldChange(event, field, value);
    }
  };

  const validateField = (
    value: string,
    fieldType: string,
    isRequired: boolean,
    fieldLabel: string
  ) => {
    if (!value && isRequired) {
      return t('validationErrMsg.required_err_msg', { fieldLabel });
    } else if (
      fieldProps?.errorMessages?.maxLenghtErrMsg &&
      value?.length > fieldProps?.validations?.maxLength
    ) {
      return fieldProps?.errorMessages?.maxLenghtErrMsg;
    } else if (
      fieldType === FIELD_TYPE.CHECKBOX_GROUP &&
      value?.length === 0 &&
      isRequired
    ) {
      return t('validationErrMsg.checkbox_group_err_msg');
    } else if (fieldProps?.validations?.email && !REGEX.EMAIL.test(value)) {
      return t('validationErrMsg.valid_email_err_msg');
    } else if (
      !REGEX.NUMBER_DECIMAL.test(value) &&
      fieldType === FIELD_TYPE.NUMBER_ONLY
    ) {
      return t('validationErrMsg.valid_number_err_msg');
    } else if (
      fieldType === FIELD_TYPE.INTEGER_ONLY &&
      !REGEX.NUMBER_INTEGER.test(value)
    ) {
      return t('validationErrMsg.valid_integer_err_msg');
    } else if (
      (fieldType === FIELD_TYPE.NUMBER_ONLY ||
        fieldType === FIELD_TYPE.INTEGER_ONLY) &&
      fieldProps?.validations?.minValue &&
      Number(value) < fieldProps?.validations?.minValue
    ) {
      return (
        fieldProps?.errorMessages?.minValueErrMsg ||
        t('validationErrMsg.min_value_err_msg', {
          fieldLabel,
          minValue: fieldProps?.validations?.minValue
        })
      );
    } else if (
      (fieldType === FIELD_TYPE.NUMBER_ONLY ||
        fieldType === FIELD_TYPE.INTEGER_ONLY) &&
      fieldProps?.validations?.maxValue &&
      Number(value) > fieldProps?.validations?.maxValue
    ) {
      return (
        fieldProps?.errorMessages?.maxValueErrMsg ||
        t('validationErrMsg.max_value_err_msg', {
          fieldLabel,
          maxValue: fieldProps?.validations?.maxValue
        })
      );
    } else if (
      fieldType === FIELD_TYPE.PASSWORD &&
      fieldProps?.validations?.password &&
      !REGEX.PASSWORD.test(value)
    ) {
      return (
        <List className="passwordRequirementList">
          <ListItem>
            At least one digit
            <code className="passwordRequirement">(0-9)</code>.
          </ListItem>
          <ListItem>
            No
            <code className="passwordRequirement">whitespace characters</code>.
          </ListItem>
          <ListItem>
            Minimum length of
            <code className="passwordRequirement">8 characters</code>.
          </ListItem>
          <ListItem>
            At least one uppercase letter
            <code className="passwordRequirement">(A-Z)</code>.
          </ListItem>
          <ListItem>
            At least one lowercase letter
            <code className="passwordRequirement">(a-z)</code>.
          </ListItem>
          <ListItem>
            At least one special character from the set
            <code className="passwordRequirement">
              !@#$%^&*()-_=+{};:,&lt;.&gt;
            </code>
            .
          </ListItem>
        </List>
      );
    } else if (
      fieldProps?.validations?.regex &&
      !new RegExp(fieldProps?.validations?.regex).test(value)
    ) {
      return (
        fieldProps?.errorMessages?.regexErrMsg ||
        t('validationErrMsg.valid_data_err_msg')
      );
    } else if (
      fieldProps?.validations?.uniqueDataValidation &&
      fieldProps?.uniqueDataKey &&
      value
    ) {
      const result = fieldProps?.uniqueData?.filter((item) =>
        item[fieldProps?.uniqueDataKey]?.includes(value)
      );
      if (result && Object.keys(result)?.length) {
        return t('validationErrMsg.unique_data_err_msg', {
          fieldLabel: fieldLabel.toLowerCase()
        });
      }
    } else if (value && fieldProps?.validations?.json) {
      try {
        JSON.parse(value);
      } catch (error) {
        return fieldProps?.errorMessages?.jsonErrMsg;
      }
    } else if (value && fieldProps?.type === FIELD_TYPE.REGEX) {
      try {
        new RegExp(value);
      } catch (error) {
        return t('validationErrMsg.valid_regex_err_msg');
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const renderFormField = (
    field: any,
    meta: any,
    fieldType: string,
    form: any
  ) => {
    switch (fieldType) {
      case FIELD_TYPE.TEXT:
      case FIELD_TYPE.ALPHA_NUMBERICS:
      case FIELD_TYPE.EMAIL:
      case FIELD_TYPE.REGEX:
      case FIELD_TYPE.PASSWORD:
      case FIELD_TYPE.NUMBER_ONLY:
      case FIELD_TYPE.TEXTAREA:
      case FIELD_TYPE.INTEGER_ONLY:
        return (
          <TextField
            {...field}
            fullWidth
            type={
              fieldProps?.type === FIELD_TYPE.PASSWORD && showPassword
                ? FIELD_TYPE.TEXT
                : fieldProps?.type
            }
            autoComplete="off"
            disabled={fieldProps?.isDisabled}
            label={fieldProps?.label}
            error={meta.touched && meta.error !== undefined}
            helperText={meta.touched && meta.error}
            slotProps={{
              input: {
                maxLength: !fieldProps?.errorMessages?.maxLenghtErrMsg
                  ? fieldProps?.validations?.maxLength
                  : {}
              },
              adornments: {
                end: fieldProps?.type === FIELD_TYPE.PASSWORD ? (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ) : {}
              }
            }}
            multiline={fieldProps?.type === FIELD_TYPE.TEXTAREA}
            rows={
              fieldProps?.type === FIELD_TYPE.TEXTAREA &&
              fieldProps?.textareaRows
                ? fieldProps?.textareaRows
                : undefined
            }
            onChange={(event) => handleOnChange(event, field)}
          />
        );

      case FIELD_TYPE.SELECT:
        return (
          <Select
            {...field}
            fullWidth
            label={`${fieldProps?.label}${
              fieldProps?.validations?.required ? ' *' : ''
            }`}
            disabled={fieldProps?.isDisabled}
            defaultValue={''}
            value={field?.value || ''}
            options={fieldProps?.options || []}
            itemValue={fieldProps?.itemValueKey}
            itemText={fieldProps?.itemLabelKey}
            error={meta.touched && meta.error !== undefined}
            helperText={meta.touched && meta.error}
            onChange={(event) => handleOnChange(event, field)}
          ></Select>
        );

      case FIELD_TYPE.RADIO:
        return (
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              {fieldProps?.label}
            </FormLabel>
            <RadioGroup
              {...field}
              name={fieldProps?.name}
              row={fieldProps?.isDirectionRow}
              value={field?.value}
              onChange={(event) => handleOnChange(event, field)}
            >
              {fieldProps?.options?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option[fieldProps?.itemValueKey]}
                  control={<Radio />}
                  label={option[fieldProps?.itemLabelKey]}
                  disabled={option?.isDisabled || false}
                />
              ))}
            </RadioGroup>
            <ErrorMessage
              name={fieldProps?.name}
              component={'div'}
              className="errorState"
            />
          </FormControl>
        );

      case FIELD_TYPE.CHECKBOX:
        return (
          <FormControlLabel
            {...field}
            control={
              <CheckBox
                checked={field.value}
                onChange={(event) => handleOnChange(event, field)}
              />
            }
            label={fieldProps?.label}
          />
        );

      case FIELD_TYPE.AUTOCOMPLETE:
        return (
          <Autocomplete
            {...field}
            value={value || ''}
            options={fieldProps?.options || []}
            disablePortal={true}
            getOptionLabel={(option) => option[fieldProps?.itemLabelKey] || ''}
            isOptionEqualToValue={(option, value) =>
              option[fieldProps?.itemValueKey] ===
              value[fieldProps?.itemValueKey]
            }
            onChange={(_event, value) =>
              handleOnChange(_event, field, value, form)
            }
            onSelect={() => form.setFieldTouched(field.name, true)}
            renderInput={(params) => (
              <TextField
                label={fieldProps?.label}
                variant="outlined"
                error={meta.touched && meta.error !== undefined}
                helperText={meta.touched && meta.error}
                {...params}
              />
            )}
          />
        );

      case FIELD_TYPE.CHECKBOX_GROUP:
        return (
          <CheckboxGroup
            options={fieldProps?.options}
            field={field}
            legendTitle={fieldProps?.label}
            itemValueKey={fieldProps?.itemValueKey}
            itemLabelKey={fieldProps?.itemLabelKey}
            directionRow={fieldProps?.isDirectionRow}
            helperText={meta?.touched && meta?.error}
          />
        );

      case FIELD_TYPE.SWITCH:
        return (
          <FormControlLabel
            {...field}
            control={
              <Switch
                checked={field.value}
                onChange={(event) => handleOnChange(event, field)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label={fieldProps?.label}
            labelPlacement="start"
          />
        );

      case FIELD_TYPE.MULTI_SELECT:
        return (
          <Autocomplete
            {...field}
            multiple
            value={field?.value || []}
            options={fieldProps?.options || []}
            getOptionLabel={(option) => option[fieldProps.itemLabelKey]}
            filterSelectedOptions
            isOptionEqualToValue={(option, value) =>
              option[fieldProps?.itemValueKey] ===
              value[fieldProps?.itemValueKey]
            }
            onChange={(_event, value) =>
              handleOnChange(_event, field, value, form)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={fieldProps?.label}
                variant="outlined"
                error={meta.touched && meta.error !== undefined}
                helperText={meta.touched && meta.error}
              />
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Field
        name={fieldProps?.name}
        type={
          fieldProps?.type === FIELD_TYPE.NUMBER_ONLY
            ? FIELD_TYPE.TEXT
            : fieldProps?.type
        }
        validate={(value: string) => {
          return validateField(
            value,
            fieldProps?.type,
            fieldProps?.validations?.required,
            fieldProps?.label
          );
        }}
      >
        {({ field, meta, form }) =>
          renderFormField(field, meta, fieldProps?.type, form)
        }
      </Field>
      {/* Can be used in future so keeping this as a commented code */}
      {/* <ErrorMessage
        name={fieldProps?.name}
        component={'div'}
        className="errorState"
      /> */}
    </>
  );
};

export default FormField;
