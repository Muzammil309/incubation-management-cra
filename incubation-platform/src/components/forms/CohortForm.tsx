import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../../services/supabase';
import Button from '../ui/Button';
import Input from '../ui/Input';
import LoadingSpinner from '../ui/LoadingSpinner';

interface CohortFormProps {
  cohort?: any;
  organizationId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CohortForm: React.FC<CohortFormProps> = ({
  cohort,
  organizationId,
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: cohort?.name || '',
    description: cohort?.description || '',
    start_date: cohort?.start_date || '',
    end_date: cohort?.end_date || '',
    max_startups: cohort?.max_startups || 10,
    status: cohort?.status || 'planning'
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: any) => db.createCohort({ ...data, organization_id: organizationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cohorts'] });
      onSuccess?.();
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => db.updateCohort(cohort.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cohorts'] });
      onSuccess?.();
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cohort) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;
  const error = createMutation.error || updateMutation.error;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-600">
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Cohort Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="planning">Planning</option>
            <option value="recruiting">Recruiting</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <Input
          label="Start Date"
          name="start_date"
          type="date"
          value={formData.start_date}
          onChange={handleChange}
          required
        />

        <Input
          label="End Date"
          name="end_date"
          type="date"
          value={formData.end_date}
          onChange={handleChange}
          required
        />

        <Input
          label="Maximum Startups"
          name="max_startups"
          type="number"
          min="1"
          max="50"
          value={formData.max_startups}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the cohort program..."
        />
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              {cohort ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            cohort ? 'Update Cohort' : 'Create Cohort'
          )}
        </Button>
      </div>
    </form>
  );
};

export default CohortForm;
