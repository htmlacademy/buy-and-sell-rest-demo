import { Container } from 'inversify';
import { UserServiceInterface } from './user-service.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import UserService from './user.service.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserServiceInterface>(AppComponent.UserServiceInterface).to(UserService).inSingletonScope();

  return userContainer;
}
