import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createField } from '../../../api/fieldApi/FieldApi';
import { fieldSchema } from '../../../validation/FieldValidation';

const AddFieldToStep = ({ step, onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const queryClient = useQueryClient();
  
  const createMutation = useMutation({
    mutationFn: createField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields', step.id] });
      reset();
      onClose();
    },
    onError: (error) => {
      console.error('Error creating field:', error);
    }
  });
  
  const onSubmit = (data) => {
    createMutation.mutate({ ...data, stepId: step.id });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            افزودن فیلد به مرحله {step.name}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
            disabled={createMutation.isPending}
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نام فیلد (Label)</label>
            <input
              {...register('label', fieldSchema.label)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={createMutation.isPending}
            />
            {errors.label && (
              <p className="mt-1 text-sm text-red-600">{errors.label.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
            <input
              {...register('placeholder', fieldSchema.placeholder)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={createMutation.isPending}
            />
            {errors.placeholder && (
              <p className="mt-1 text-sm text-red-600">{errors.placeholder.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نوع فیلد</label>
            <select
              {...register('fieldType', fieldSchema.fieldType)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={createMutation.isPending}
            >
              <option value="text">متنی</option>
              <option value="number">عددی</option>
              <option value="email">ایمیل</option>
              <option value="date">تاریخ</option>
              <option value="checkbox">چک باکس</option>
              <option value="select">انتخابگر</option>
            </select>
            {errors.fieldType && (
              <p className="mt-1 text-sm text-red-600">{errors.fieldType.message}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-2 space-x-reverse pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors disabled:bg-gray-200 disabled:cursor-not-allowed"
              disabled={createMutation.isPending}
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? 'در حال ایجاد...' : 'ایجاد فیلد'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export {AddFieldToStep} 