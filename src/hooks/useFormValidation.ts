import { useState, useCallback, useMemo } from "react";
import { UserFormData } from "../types";

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
}

interface FormErrors {
  [key: string]: string;
}

const defaultValidationRules: ValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    required: true,
    pattern: /^[\d\s\-+()]+$/,
  },
  website: {
    required: true,
    pattern: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
  },
  "address.street": {
    required: true,
    minLength: 3,
  },
  "address.suite": {
    required: true,
  },
  "address.city": {
    required: true,
    minLength: 2,
  },
  "address.zipcode": {
    required: true,
    pattern: /^\d{5}(-\d{4})?$/,
  },
  "company.name": {
    required: true,
    minLength: 2,
  },
  "company.catchPhrase": {
    required: true,
    minLength: 5,
  },
  "company.bs": {
    required: true,
    minLength: 5,
  },
};

export const useFormValidation = (
  initialValues: UserFormData,
  customRules?: ValidationRules
) => {
  const [values, setValues] = useState<UserFormData>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validationRules = useMemo(
    () => ({ ...defaultValidationRules, ...customRules }),
    [customRules]
  );

  const validateField = useCallback(
    (name: string, value: string): string | null => {
      const rule = validationRules[name];
      if (!rule) return null;

      if (rule.required && !value.trim()) {
        return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      }

      if (rule.minLength && value.length < rule.minLength) {
        return `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } must be at least ${rule.minLength} characters`;
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        return `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } must be no more than ${rule.maxLength} characters`;
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        return `Please enter a valid ${name}`;
      }

      if (rule.custom) {
        return rule.custom(value);
      }

      return null;
    },
    [validationRules]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(values).forEach((key) => {
      if (key === "address" || key === "company") {
        const nestedObj = values[key as keyof UserFormData] as any;
        Object.keys(nestedObj).forEach((nestedKey) => {
          const fieldName = `${key}.${nestedKey}`;
          const error = validateField(fieldName, nestedObj[nestedKey]);
          if (error) {
            newErrors[fieldName] = error;
            isValid = false;
          }
        });
      } else {
        const error = validateField(
          key,
          values[key as keyof UserFormData] as string
        );
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setValues((prev) => {
        const newValues = { ...prev };

        if (name.includes(".")) {
          const [parent, child] = name.split(".");
          newValues[parent as keyof UserFormData] = {
            ...(newValues[parent as keyof UserFormData] as any),
            [child]: value,
          };
        } else {
          newValues[name as keyof UserFormData] = value as any;
        }

        return newValues;
      });

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      const error = validateField(name, e.target.value);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [validateField]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFieldValue = useCallback((name: string, value: string) => {
    setValues((prev) => {
      const newValues = { ...prev };

      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        newValues[parent as keyof UserFormData] = {
          ...(newValues[parent as keyof UserFormData] as any),
          [child]: value,
        };
      } else {
        newValues[name as keyof UserFormData] = value as any;
      }

      return newValues;
    });
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setFieldValue,
    setValues,
    isValid: Object.keys(errors).length === 0,
  };
};
