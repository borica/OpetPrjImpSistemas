import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import EtherealMailProvider from './providers/MailProvider/implementations/EtherealMailProvider';
import IMailProvider from './providers/MailProvider/models/IMailProvider';

import HandlebarsMailTemplateProvider from './providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './providers/MailTemplateProvider/models/IMailTemplateProvider';


container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
  );
  
  container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProvider),
  );