import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createField, updateField } from '../../../api/fieldApi/FieldApi';
import { fieldSchema } from '../../../validation/FieldValidation';

const FieldForm = ({ stepId, field }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: field || { label: '', placeholder: '', fieldType: 'text' }
  })
  
  const queryClient = useQueryClient();
  
  const createMutation = useMutation({
    mutationFn: createField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields', stepId] });
  
    },
    onError: (error) => {
      console.error('Error creating field:', error);
    }
  })
  
  const updateMutation = useMutation({
    mutationFn: updateField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields', stepId] });
    },
    onError: (error) => {
      console.error('Error updating field:', error);
    }
  })
  
  const onSubmit = (data) => {
    if (field) {
      updateMutation.mutate({ ...data, id: field.id, stepId });
    } else {
      createMutation.mutate({ ...data, stepId });
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <div className="mb-6 p-4  rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        {field ? 'edite فیلد' : 'createNewFeild  '}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">label</label>
          <input
            {...register('label', fieldSchema.label)}
            className="  text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={isPending}
          />
          {errors.label && (
            <p className="mt-1 text-sm text-red-600">{errors.label.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-black mb-1">Placeholder</label>
          <input
            {...register('placeholder', fieldSchema.placeholder)}
            className=" text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={isPending}
          />
          {errors.placeholder && (
            <p className="mt-1 text-sm text-red-600">{errors.placeholder.message}</p>
          )}
        </div>
        
        <div>
          <label className="   block text-sm font-medium text-black mb-1">fieldType </label>
          <select
            {...register('fieldType', fieldSchema.fieldType)}
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={isPending}
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
        
        <div className="flex items-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {field ? 
              (updateMutation.isPending ? 'در حال ویرایش...' : 'ویرایش') : 
              (createMutation.isPending ? 'در حال ایجاد...' : 'ایجاد')
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export {FieldForm} 