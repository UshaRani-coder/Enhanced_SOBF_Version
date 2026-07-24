import React from 'react';

const RenderInputField = ({
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  options = [],
  error,
  disabled = false,
}) => {
  const inputClass = `w-full px-4 py-2 border rounded-lg focus:outline-none ${
    error ? 'border-red-500' : 'border-gray-300'
  }`;

  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-2">
        {label}
      </label>

      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={inputClass}
          disabled={disabled}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={3}
          placeholder={placeholder}
          className={inputClass}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass}
          min={type === 'number' ? 18 : undefined}
          max={type === 'number' ? 100 : undefined}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default RenderInputField;