import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { ResponseMessage } from '../../../shared/infrastructure/constants/response.enum';
import { TribeRepository } from '../../domain/models/gateways/tribe.repository';
import { TribeEntityInterface } from '../../domain/models/tribe.entity';
import { TribeData } from './data/tribe.data';

export class TribeAdapter implements TribeRepository {
  constructor(
    @InjectRepository(TribeData)
    private readonly tribeData: Repository<TribeData>,
  ) {}

  public findTribeById(id: number): Observable<TribeEntityInterface> {
    return from(this.tribeData.findOneBy({ id })).pipe(
      map((tribe) => {
        if (!tribe) {
          throw new NotFoundException(ResponseMessage.TRIBE_NOT_REGISTERED);
        }
        return tribe;
      }),
    );
  }
}
