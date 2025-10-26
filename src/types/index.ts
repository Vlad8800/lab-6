export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
}

export interface FormTouched {
  firstName?: boolean;
  lastName?: boolean;
  email?: boolean;
  phone?: boolean;
  birthDate?: boolean;
}