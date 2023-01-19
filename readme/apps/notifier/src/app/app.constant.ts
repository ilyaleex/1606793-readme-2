export const NOTIFIER_SERVICE_ENV_PATH = 'environments/.notifier.env';

export enum EnvValidationMessage {
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
  RMQHostRequired = 'RabbitMQ host is required',
  RMQUserRequired = 'RabbitMQ user is required',
  RMQPasswordRequired = 'RabbitMQ password is required',
  RMQSubscriberQueue = 'RabbitMQ Subscribers Queue is required',
  MailServerHostRequired =  'SMTP Server is required',
  MailServerUserNameRequired = 'SMTP Server user name is required',
  MailServerPasswordRequired = 'SMTP Server password is required',
  MailServerDefaultFromRequired = 'Default value for mail from field is required',
  MailServerPortRequired = 'SMTP Server port is required'
}
