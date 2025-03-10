import React, { useState } from 'react'
import schema from './moduleSchema.json'

const DynamicForm = () => {
    const [formData, setFormData] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value,
        });
      };

      const printDataFields = (fields) => {
        return fields.map((field, index) => {
          if (field.type === 'section') {
            return (
              <div key={index}>
                <h3 className="text-xl font-semibold">{field.label}</h3>
                {printDataFields(field.fields)} 
              </div>
            );
          }
    
          return (
            <div key={index} className="mb-4">
            <label className="block font-medium">{field.label}</label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <input
                type="checkbox"
                name={field.name}
                checked={formData[field.name] || false}
                onChange={handleInputChange}
                className="mt-2"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            )}
          </div>
          );
        });
      };

      const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
      };
      return (
        <>
      <h1 className="text-3xl font-bold mb-6">Dynamic Form</h1>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {printDataFields(schema.fields)}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </>
       
      );
}

export default DynamicForm