import { cn } from '@/lib/utils';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Eye, EyeOff, Calendar } from 'lucide-react';
import { ErrorMessage } from 'formik';
import { CommonFormProps } from '../types';
import { useRef } from 'react';

const FormField = ({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  withToggle = false,
  show = false,
  onToggle,
  withDatePicker = false,
  onDatePick
}: CommonFormProps): JSX.Element => {
  const stringValue = typeof value === 'boolean' ? String(value) : value || '';

  const dateInputRef = useRef<HTMLInputElement>(null);
  const handleCalendarClick = () => {
    dateInputRef.current?.showPicker?.();
    dateInputRef.current?.click();
  };

  return (
    <div className="relative grow shrink sm:basis-1/3">
      <label htmlFor={name} className="mb-1 font-medium text-sm">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        type={withToggle ? (show ? 'text' : 'password') : withDatePicker ? 'text' : type}
        placeholder={placeholder}
        value={stringValue}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={withToggle ? 'new-password' : 'off'}
        readOnly={withDatePicker}
        aria-label={label}
        className={cn(
          '!text-sm !placeholder:text-sm',
          error && touched
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-300 focus:border-black',
          (withToggle || withDatePicker) && 'pr-10'
        )}
      />

      {withToggle && onToggle && (
        <Button
          type="button"
          onClick={onToggle}
          aria-label={`${label} visibility switch`}
          className="absolute bottom-0 right-0 hover:cursor-pointer"
        >
          {show ? <Eye /> : <EyeOff />}
        </Button>
      )}

      {withDatePicker && (
        <input
          ref={dateInputRef}
          type="date"
          className="sr-only"
          value={stringValue}
          aria-label="Hidden date input"
          onChange={(e) => {
            onDatePick?.(e.target.value);
          }}
        />
      )}

      {withDatePicker && (
        <Button
          type="button"
          onClick={handleCalendarClick}
          aria-label="Open calendar"
          className="absolute bottom-0 right-0 hover:cursor-pointer "
        >
          <Calendar />
        </Button>
      )}

      {error && touched && (
        <div className="min-h-[1.25rem] text-xs text-red-600 absolute mt-1">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};

export default FormField;
