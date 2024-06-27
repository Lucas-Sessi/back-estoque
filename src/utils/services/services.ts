import { HttpException, Injectable } from '@nestjs/common';
import moment from 'moment';

@Injectable()
export class ServicesUtils {
  public validateObjectConditions(conditions: object) {
    Object.keys(conditions).forEach((key) => {
      if (conditions[key].validate) {
        throw new HttpException(
          conditions[key].message,
          conditions[key].status,
        );
      }
    });
  }
}
