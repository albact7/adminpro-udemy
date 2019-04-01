import { Injectable } from '@angular/core';



@Injectable()
export abstract class CRUDService {
  /**
   * Returns a list of all of the current user's todos.
   */
  abstract getAll(desde?: number);
  abstract update(item:any);
  abstract create(item:any);
  abstract delete(item:any);
  abstract getById(id:string);
}