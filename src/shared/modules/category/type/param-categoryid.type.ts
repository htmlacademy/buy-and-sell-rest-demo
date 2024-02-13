import { ParamsDictionary } from 'express-serve-static-core';

export type ParamCategoryId = {
  categoryId: string;
} | ParamsDictionary;
