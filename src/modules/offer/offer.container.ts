import { Container } from 'inversify';
import {types} from '@typegoose/typegoose';
import { AppComponent } from '../../types/app-component.enum.js';
import OfferService from './offer.service.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { OfferServiceInterface } from './offer-service.interface.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferServiceInterface>(AppComponent.OfferServiceInterface).to(OfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(AppComponent.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
