import { FormElementsType } from '@form-builder/validation/types';

export interface PaginatedResponseType {
  total: number;
}

export type FormType = {
  _id: string;
  isActive: boolean;
  name: string;
  elements: FormElementsType[];
  user: string;
  createdAt: string;
  updatedAt: string;
};

export type FormElementsType = {
  id: string;
  label: string;
  type: string;
  required: boolean;
  options?: { label: string; value: string }[];
};