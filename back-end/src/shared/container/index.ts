import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ICoursesRepository from '@modules/course/repositories/ICoursesRepository';
import CoursesRepository from '@modules/course/infra/typeorm/repositories/CoursesRepository';

import IFriendsRepository from '@modules/friends/repositories/IFriendsRepository';
import FriendsRepository from '@modules/friends/infra/typeorm/repositories/FriendsRepository';

import EtherealMailProvider from './providers/MailProvider/implementations/EtherealMailProvider';
import IMailProvider from './providers/MailProvider/models/IMailProvider';

import HandlebarsMailTemplateProvider from './providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './providers/MailTemplateProvider/models/IMailTemplateProvider';

import IStorageProvider from './providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './providers/StorageProvider/implementations/DiskStorageProvider';


container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<ICoursesRepository>(
  'CoursesRepository',
  CoursesRepository,
);

container.registerSingleton<IFriendsRepository>(
  'FriendsRepository',
  FriendsRepository,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);