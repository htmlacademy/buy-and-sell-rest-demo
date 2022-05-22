import {OfferServiceInterface} from './offer-service.interface.js';
import {inject, injectable} from 'inversify';
import CreateOfferDto from './dto/create-offer.dto.js';
import {DocumentType, ModelType} from '@typegoose/typegoose/lib/types.js';
import {OfferEntity} from './offer.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import {DEFAULT_OFFER_COUNT} from './offer.constant.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private  readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId', 'categories'])
      .exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .populate(['userId', 'categories'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId', 'categories'])
      .exec();
  }

  public async findByCategoryId(categoryId: string, count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find({categories: categoryId}, {}, {limit})
      .populate(['userId', 'categories'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
