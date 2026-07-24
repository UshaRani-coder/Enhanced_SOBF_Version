import React from 'react';

import RenderInputField from '@/components/Volunteer/RenderInputField';
import { states, cities } from '@/components/Volunteer/statesAndCities';

const VolunteerFields = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Become a Volunteer
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <RenderInputField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          error={errors.name}
        />

        <RenderInputField
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email address"
          error={errors.email}
        />

        <RenderInputField
          name="mobile"
          label="Mobile"
          type="tel"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Your phone number"
          error={errors.mobile}
        />

        <RenderInputField
          name="occupation"
          label="Occupation"
          value={formData.occupation}
          onChange={handleChange}
          placeholder="Your profession"
          error={errors.occupation}
        />

        <RenderInputField
          name="gender"
          label="Gender"
          type="select"
          value={formData.gender}
          onChange={handleChange}
          options={['Select Gender', 'Male', 'Female', 'Other']}
          error={errors.gender}
        />

        <RenderInputField
          name="age"
          label="Age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          placeholder="Your age"
          error={errors.age}
        />

        <RenderInputField
          name="state"
          label="State"
          type="select"
          value={formData.state}
          onChange={handleChange}
          options={states}
          error={errors.state}
        />

        {formData.state === 'Other' && (
          <RenderInputField
            name="customState"
            label="State"
            value={formData.customState}
            onChange={handleChange}
            placeholder="Enter your state"
            error={errors.customState}
          />
        )}

        {formData.state === 'Other' ? (
          <RenderInputField
            name="customCity"
            label="City"
            value={formData.customCity}
            onChange={handleChange}
            placeholder="Enter your city"
            error={errors.customCity}
          />
        ) : (
          <RenderInputField
            name="city"
            label="City"
            type="select"
            value={formData.city}
            onChange={handleChange}
            options={
              formData.state ? cities[formData.state] : ['Select City']
            }
            disabled={!formData.state}
            error={errors.city}
          />
        )}
      </div>

      <RenderInputField
        name="message"
        label="Message"
        type="textarea"
        value={formData.message}
        onChange={handleChange}
        placeholder="Any additional information"
      />

      <RenderInputField
        name="purpose"
        label="Purpose of joining"
        type="textarea"
        value={formData.purpose}
        onChange={handleChange}
        placeholder="Why do you want to volunteer with us?"
      />

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            bg-gradient-to-r from-yellow-500 to-yellow-700
            text-white font-bold
            py-3 px-8
            rounded-full
            shadow-xl
            hover:shadow-yellow-500/30
            transition-all duration-300
            flex items-center gap-2
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-yellow-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>

              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  );
};

export default VolunteerFields;