import axios, { AxiosResponse } from 'axios';

interface Request {
  email: string;
}

interface MailValidationResponse {
  valid: boolean;
  did_you_mean?: string;
}

class ValidateEmailService {
  private mailValidationApi;

  constructor() {
    this.mailValidationApi = axios.create({
      baseURL: 'https://apilayer.net/api',
    });
  }

  public async execute({ email }: Request): Promise<MailValidationResponse> {
    const response: AxiosResponse = await this.mailValidationApi.get('/check', {
      params: {
        access_key: process.env.MAIL_VALIDATION_ACCESS_KEY,
        email,
      },
    });

    const { did_you_mean, mx_found, format_valid } = response.data;

    return {
      valid: mx_found && format_valid,
      did_you_mean,
    };
  }
}

export default ValidateEmailService;
