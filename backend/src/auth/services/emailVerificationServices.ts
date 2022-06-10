import sgMail from '../../config/sendgrid.config';
import { emailTemplate } from '../../shared/templates/emailVericationTemplate';

export const emailVerificationService = async (to: string) => {
  try {
    const response = await sgMail.send({
      to,
      from: 'soporte.vocaccion@gmail.com',
      subject: 'Verificación de correo electrónico',
      text: 'Verifica tu correo electrónico',
      html: await emailTemplate(to),
    });
  } catch(error: any) {
    console.log(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
}