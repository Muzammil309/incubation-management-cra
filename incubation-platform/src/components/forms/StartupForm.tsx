import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../../services/supabase';
import Button from '../ui/Button';
import Input from '../ui/Input';
import LoadingSpinner from '../ui/LoadingSpinner';

interface StartupFormProps {
  startup?: any;
  organizationId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const StartupForm: React.FC<StartupFormProps> = ({
  startup,
  organizationId,
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: startup?.name || '',
    description: startup?.description || '',
    industry: startup?.industry || '',
    stage: startup?.stage || 'idea',
    website: startup?.website || '',
    founded_date: startup?.founded_date || '',
    employee_count: startup?.employee_count || 1,
    funding_raised: startup?.funding_raised || 0
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: any) => db.createStartup({ ...data, organization_id: organizationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['startups'] });
      onSuccess?.();
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => db.updateStartup(startup.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['startups'] });
      onSuccess?.();
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startup) {
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
          label="Startup Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Industry</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="fintech">FinTech</option>
            <option value="ecommerce">E-commerce</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stage
          </label>
          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="idea">Idea</option>
            <option value="mvp">MVP</option>
            <option value="early_stage">Early Stage</option>
            <option value="growth">Growth</option>
            <option value="scale">Scale</option>
          </select>
        </div>

        <Input
          label="Website"
          name="website"
          type="url"
          value={formData.website}
          onChange={handleChange}
        />

        <Input
          label="Founded Date"
          name="founded_date"
          type="date"
          value={formData.founded_date}
          onChange={handleChange}
        />

        <Input
          label="Employee Count"
          name="employee_count"
          type="number"
          min="1"
          value={formData.employee_count}
          onChange={handleChange}
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
          placeholder="Describe the startup..."
        />
      </div>

      <Input
        label="Funding Raised ($)"
        name="funding_raised"
        type="number"
        min="0"
        value={formData.funding_raised}
        onChange={handleChange}
      />

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
              {startup ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            startup ? 'Update Startup' : 'Create Startup'
          )}
        </Button>
      </div>
    </form>
  );
};

export default StartupForm;
