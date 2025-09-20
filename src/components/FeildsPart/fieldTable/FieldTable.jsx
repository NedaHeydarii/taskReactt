import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFields, deleteField } from '../../../api/fieldApi/FieldApi'
import {FieldForm} from '../fieldForm/FieldForm'

const FieldsTable = ({ stepId }) => {
  const queryClient = useQueryClient();
  
  const { 
    data: fields = [], 
    isLoading, 
    error, 
    isError 
  } = useQuery({
    queryKey: ['fields', stepId],
    queryFn: () => getFields(stepId)
  })
  
  const deleteMutation = useMutation({
    mutationFn: deleteField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields', stepId] });
    },
    onError: (error) => {
      console.error('Error deleting field:', error);
    }
  })

  const handleDelete = (id) => {
    if (window.confirm('do you want to delete?')) {
      deleteMutation.mutate(id);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
        <strong className="font-bold">خطا! </strong>
        <span className="block sm:inline">{error.message}</span>
      </div>
    );
  }

  return (
    <div>
      <FieldForm stepId={stepId} />
      
      <div className="mt-8 overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider">
                لیبل
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider">
                Placeholder
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider">
                نوع فیلد
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fields.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  هیچ فیلدی برای این مرحله ایجاد نشده است.
                </td>
              </tr>
            ) : (
              fields.map((field) => (
                <tr key={field.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{field.label}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{field.placeholder}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{field.fieldType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2 space-x-reverse">
                      <button
                        onClick={() => handleDelete(field.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
                        disabled={deleteMutation.isPending}
                      >
                        {deleteMutation.isPending ? 'حذف...' : 'حذف'}
                      </button>
                      <FieldForm stepId={stepId} field={field} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export {FieldsTable} 