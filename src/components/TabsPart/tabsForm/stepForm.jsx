import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createStep, updateStep } from '../../../api/tapApi/StepApi'
import { stepSchema } from '../../../validation/StepValidation'

const StepForm = ({ step }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: step || { name: '' }
  });
  
  const queryClient = useQueryClient();
  
  const createMutation = useMutation({
    mutationFn: createStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
      reset();
    },
    onError: (error) => {
      console.error('Error creating step:', error);
    }
  });
  
  const updateMutation = useMutation({
    mutationFn: updateStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
    },
    onError: (error) => {
      console.error('Error updating step:', error);
    }
  })
  
  const onSubmit = (data) => {
    if (step) {
      updateMutation.mutate({ ...data, id: step.id });
    } else {
      createMutation.mutate(data);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        {step ? ' editeStep' : '  create New Step'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-end gap-4">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">stepName: </label>
          <input
            {...register('name', stepSchema.name)}
            className=" text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={isPending}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {step ? 
            (updateMutation.isPending ? 'در حال ویرایش...' : 'ویرایش') : 
            (createMutation.isPending ? 'در حال ایجاد...' : 'ایجاد')
          }
        </button>
      </form>
    </div>
  );
};

export {StepForm} 