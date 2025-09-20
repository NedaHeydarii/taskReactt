import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSteps, deleteStep } from '../../api/tapApi/StepApi'
import {StepForm} from '../../components/TabsPart/tabsForm/stepForm'
import { Link } from 'react-router-dom'
import {AddFieldToStep} from '../../components/TabsPart/addFeildToTab/AddFieldToStep'

const StepsManagement = () => {
  const queryClient = useQueryClient()
  const [selectedStep, setSelectedStep] = useState(null)
  
  const { 
    data: steps = [], 
    isLoading, 
    error, 
    isError 
  } = useQuery({
    queryKey: ['steps'],
    queryFn: getSteps
  })
  
  const deleteMutation = useMutation({
    mutationFn: deleteStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
    }
  })

  const handleDelete = (id) => {
    if (window.confirm('do you want to delete? ')) {
      deleteMutation.mutate(id);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">error! </strong>
        <span className="block sm:inline">{error.message}</span>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800"> step Management</h1>
      
      <StepForm />
      
      <div className="mt-8 overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                stepName: 
              </th>
              
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {steps.length === 0 ? (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                  هیچ مرحله‌ای ایجاد نشده است.
                </td>
              </tr>
            ) : (
              steps.map((step) => (
                <tr key={step.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{step.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleDelete(step.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition-colors"
                        disabled={deleteMutation.isPending}
                      >
                        {deleteMutation.isPending ? 'در حال حذف...' : 'حذف مرحله'}
                      </button>
                      <StepForm step={step} />
                      <button 
                        onClick={() => setSelectedStep(step)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition-colors"
                      >
                        افزودن فیلد
                      </button>
                      <Link
                        to={`/step/${step.id}/fields`}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm transition-colors inline-block text-center"
                      >
                        مشاهده فیلدها
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedStep && (
        <AddFieldToStep 
          step={selectedStep} 
          onClose={() => setSelectedStep(null)} 
        />
      )}
    </div>
  );
};

export {StepsManagement} ;