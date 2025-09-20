import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {FieldsTable} from '../../components/FeildsPart/fieldTable/FieldTable'

const StepFields = () => {
  const { stepId } = useParams()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Field Mangement</h1>
        <Link
          to="/"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          بازگشت به مراحل
        </Link>
      </div>
      <FieldsTable stepId={stepId} />
    </div>
  );
};

export {StepFields} 