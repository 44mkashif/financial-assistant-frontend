export interface W2Form {
  employee_address: string;
  employee_name: string;
  employee_ssn: string;
  employer_address: string;
  employer_ein: string;
  employer_name: string;
  employer_state_id: string;
  federal_income_tax: number;
  file_name: string;
  medicare_tax: number;
  medicare_wages: number;
  social_security_tax: number;
  social_security_wages: number;
  state_income_tax: number;
  state_wages_and_tips: number;
  uploaded_on: string;
  gpt_assistant_id: string;
  gpt_thread_id: string;
  w2_form_id: number;
}

export interface W2FormListResponse {
  data: W2Form[];
  message: string;
}
